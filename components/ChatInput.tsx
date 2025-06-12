import { useState } from 'react'
import { useChatStore } from '../lib/store'
import { fetchChat } from '../lib/api'

interface FileWithPreview extends File { preview?: string }

export default function ChatInput() {
  const [text, setText] = useState('')
  const [file, setFile] = useState<FileWithPreview | null>(null)
  const [fileData, setFileData] = useState<string | null>(null)
  const { addMessage, apiKey, model, sessions, activeId } = useChatStore()

  const current = sessions.find(s => s.id === activeId) || sessions[0]

  async function handleSend() {
    // Avbryt om varken text eller fil finns
    if (!text.trim() && !fileData) return

    let userMessage
    if (fileData) {
      // Om fil, lägg in som markdown-link eller bild
      const name = file?.name || 'attachment'
      if (file?.type.startsWith('image/')) {
        userMessage = { role: 'user', content: `![${name}](${fileData})` }
      } else {
        userMessage = { role: 'user', content: `[${name}](${fileData})` }
      }
      // Nollställ fil
      setFile(null)
      setFileData(null)
    } else {
      userMessage = { role: 'user', content: text }
      setText('')
    }
    addMessage(userMessage)

    try {
      const res = await fetchChat([...current.messages, userMessage], model, apiKey)
      addMessage({ role: 'assistant', content: res.choices[0].message.content })
    } catch (error) {
      console.error('Error sending message:', error)
      addMessage({ role: 'assistant', content: 'Ett fel uppstod vid kommunikation med API:et.' })
    }
  }

  // Hantera filval
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    const reader = new FileReader()
    reader.onload = () => setFileData(reader.result as string)
    reader.readAsDataURL(f)
  }

  return (
    <div className='mt-4 flex flex-col gap-2'>
      <textarea
        className='textarea textarea-bordered w-full resize-none'
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
        placeholder='Skriv något...'
      />
      {/* Filuppladdning */}
      <input
        type="file"
        onChange={handleFileChange}
        className="file-input file-input-ghost w-full"
      />

      <button className='btn btn-primary mt-2' onClick={handleSend}>
        Skicka
      </button>
    </div>
  )
}