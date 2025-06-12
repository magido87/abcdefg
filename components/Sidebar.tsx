import ApiKeyInput from './ApiKeyInput'
import ModelSelector from './ModelSelector'
import ThemeToggle from './ThemeToggle'
import SessionTabs from './SessionTabs'
import FileUploader from './FileUploader'

export default function Sidebar() {
  return (
    <div className='w-full md:w-1/4 p-4 bg-base-200 overflow-y-auto'>
      <ApiKeyInput />
      <ModelSelector />
      <ThemeToggle />
      <SessionTabs />
      <FileUploader />
    </div>
  )
}