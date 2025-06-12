import { useChatStore } from '../lib/store'

export default function ModelSelector() {
  const model = useChatStore(s => s.model)
  const setModel = useChatStore(s => s.setModel)
  return (
    <div className='mb-4'>
      <label className='label'>Modell</label>
      <select
        className='select select-bordered w-full'
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        <option value='gpt-4-turbo'>GPT-4 Turbo</option>
        <option value='gpt-3.5-turbo'>GPT-3.5 Turbo</option>
      </select>
    </div>
  )
}