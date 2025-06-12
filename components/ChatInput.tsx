import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { useChatStore } from '../lib/store'
import { fetchChat } from '../lib/api'

export default function ChatInput() {
  const [text, setText] = useState<string>('')
  const { addMessage, apiKey, model, sessions, activeId } = useChatStore()

  const current = sessions.find(s => s.id === activeId) || sessions[0]

  async function handleSend() {
    if (!text.trim()) return
    const userMessage = { role: 'user', content: text }
    addMessage(userMessage)
    setText('')

    try {
      const res = await fetchChat([...current.messages, userMessage], model, apiKey)
      addMessage({ role: 'assistant', content: res.choices[0].message.content })
    } catch (error) {
      console.error('Error sending message:', error)
      addMessage({ role: 'assistant', content: 'Ett fel uppstod vid kommunikation med API:et.' })
    }
  }

  return (
    <div className='mt-4'>
      <textarea
        className='textarea textarea-bordered w-full resize-none'
        rows={2}
        value={text}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
        onKeyDown={(e: KeyboardEvent) => e.key === 'Enter' && !e.shiftKey && handleSend()}
        placeholder='Skriv något...'
      />
    </div>
  )
}