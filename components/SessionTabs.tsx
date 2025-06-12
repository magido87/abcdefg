import { useChatStore } from '../lib/store'

export default function SessionTabs() {
  const { sessions, activeId, newSession, switchSession } = useChatStore()

  return (
    <div className='mb-4'>
      <div className='flex gap-2 mb-2'>
        <button className='btn btn-sm btn-primary' onClick={newSession}>+ Ny konversation</button>
      </div>
      <div className='space-y-1'>
        {sessions.map(s => (
          <div key={s.id} className={`btn btn-sm w-full text-left ${s.id === activeId ? 'btn-active' : ''}`}
            onClick={() => switchSession(s.id)}>
            {s.name}
          </div>
        ))}
      </div>
    </div>
  )
}