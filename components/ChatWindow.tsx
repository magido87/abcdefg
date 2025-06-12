import { useChatStore } from '../lib/store'
import { useState } from 'react'
import ChatInput from './ChatInput'
import MessageBubble from './MessageBubble'
import { useRef, useEffect } from 'react'

export default function ChatWindow() {
  const { sessions, activeId } = useChatStore()
  const current = sessions.find(s => s.id === activeId) || sessions[0]
  const endRef = useRef(null)

  // Sökterm för filtrering
  const [search, setSearch] = useState('')

  // Filtrera bort meddelanden som ej matchar
  const filtered = current.messages.filter(msg =>
    msg.content.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [current?.messages])

  return (
    <div className='flex-1 flex flex-col p-4 overflow-y-auto bg-base-100'>
      {/* Sökfält */}
      <input
        type="text"
        placeholder="🔍 Sök i konversation..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="input input-bordered w-full mb-2"
      />

      <div className='flex flex-col gap-2'>
        {filtered.map((msg, i) => (
          <MessageBubble key={i} {...msg} />
        ))}
        <div ref={endRef} />
      </div>
      <ChatInput />
    </div>
  )
}