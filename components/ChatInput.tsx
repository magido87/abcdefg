import { useState } from 'react'
import { useChatStore } from '../lib/store'
import { fetchChat } from '../lib/api'

export default function ChatInput() {
  const [text, setText] = useState('')
  const { addMessage, apiKey, model, sessions, activeId } = useChatStore()

  const current = sessions.find(s => s.id === activeId) || sessions[0]

  async function handleSend() {
    if (!text.trim()) return
    const userMessage = { role: 'user', content: text }
    addMessage(userMessage)
    setText('')

    const res = await fetchChat([...current.messages, userMessage], model, apiKey)
    addMessage({ role: 'assistant', content: res.choices[0].message.content })
  }

  return (
    <div className='mt-4'>
      <textarea
        className='textarea textarea-bordered w-full resize-none'
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
        placeholder='Skriv något...'
      />
    </div>
  )
}