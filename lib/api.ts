interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function fetchChat(
  messages: ChatMessage[],
  model: string,
  apiKey: string
): Promise<ChatResponse> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages, model, apiKey }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch chat response');
  }

  return response.json();
} 