import { useChatStore } from '../lib/store'
import ChatInput from './ChatInput'
import MessageBubble from './MessageBubble'
import { useRef, useEffect } from 'react'

export default function ChatWindow() {
  const { sessions, activeId } = useChatStore()
  const current = sessions.find(s => s.id === activeId) || sessions[0]
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [current?.messages])

  return (
    <div className='flex-1 flex flex-col p-4 overflow-y-auto bg-base-100'>
      <div className='flex flex-col gap-2'>
        {current.messages.map((msg, i) => (
          <MessageBubble key={i} {...msg} />
        ))}
        <div ref={endRef} />
      </div>
      <ChatInput />
    </div>
  )
}