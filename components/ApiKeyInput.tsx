import { useEffect, useState } from 'react'
import { useChatStore } from '../lib/store'

export default function ApiKeyInput() {
  const [key, setKey] = useState('')
  const setApiKey = useChatStore((s) => s.setApiKey)

  useEffect(() => {
    const stored = localStorage.getItem('openai_key')
    if (stored) {
      setKey(stored)
      setApiKey(stored)
    }
  }, [])

  return (
    <div className='mb-4'>
      <label className='label'>API-nyckel</label>
      <input
        type='password'
        className='input input-bordered w-full'
        value={key}
        onChange={(e) => {
          setKey(e.target.value)
          setApiKey(e.target.value)
          localStorage.setItem('openai_key', e.target.value)
        }}
      />
    </div>
  )
}