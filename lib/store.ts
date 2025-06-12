import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatSession {
  id: string
  name: string
  messages: ChatMessage[]
}

interface State {
  apiKey: string
  model: string
  sessions: ChatSession[]
  activeId: string | null
  setApiKey: (key: string) => void
  setModel: (model: string) => void
  addMessage: (msg: ChatMessage) => void
  newSession: () => void
  switchSession: (id: string) => void
}

function createNewSession(): ChatSession {
  return {
    id: Date.now().toString(),
    name: 'New Chat',
    messages: [],
  }
}

export const useChatStore = create<State>()(persist((set, get) => ({
  apiKey: '',
  model: 'gpt-4-turbo',
  sessions: [createNewSession()],
  activeId: null,
  setApiKey: (apiKey) => set({ apiKey }),
  setModel: (model) => set({ model }),
  addMessage: (msg) => {
    const { sessions, activeId } = get();
    const id = activeId || sessions[0].id;
    const updated = sessions.map((s) =>
      s.id === id ? { ...s, messages: [...s.messages, msg] } : s
    );
    set({ sessions: updated, activeId: id });
  },
  newSession: () => {
    const session = createNewSession();
    set((s) => ({
      sessions: [...s.sessions, session],
      activeId: session.id
    }));
  },
  switchSession: (id) => set({ activeId: id })
}), { name: 'chat-storage' }));