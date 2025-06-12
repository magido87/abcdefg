import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'

export default function Layout() {
  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <Sidebar />
      <ChatWindow />
    </div>
  )
}