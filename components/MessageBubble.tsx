import ReactMarkdown from 'react-markdown'

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  return (
    <div className={`chat ${role === 'user' ? 'chat-end' : 'chat-start'}`}>
      <div className='chat-bubble whitespace-pre-wrap max-w-xl'>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  )
}