'use client'

import { useState, useEffect } from 'react'
import { useChatStore } from '@/store/chat'
import { useAuthStore } from '@/store/auth'
import api from '@/lib/api'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const { conversations, setConversations, currentConversation } = useChatStore()
  const { user, logout } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    try {
      setIsLoading(true)
      const response = await api.get('/chat/conversations')
      setConversations(response.data)
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const createNewConversation = async () => {
    try {
      const response = await api.post('/chat/conversations', {
        title: 'Nova Conversa',
        model: 'gpt-4-turbo',
      })
      setConversations([response.data, ...conversations])
    } catch (error) {
      console.error('Error creating conversation:', error)
    }
  }

  return (
    <div className={`bg-slate-900 border-r border-slate-800 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        {isOpen && <h2 className="font-bold text-white">AI Platform</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>

      {/* New Chat Button */}
      {isOpen && (
        <button
          onClick={createNewConversation}
          className="m-4 btn-primary w-full text-center"
        >
          + Nova Conversa
        </button>
      )}

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-slate-400 text-center">Carregando...</div>
        ) : conversations.length === 0 ? (
          <div className="p-4 text-slate-400 text-center">{isOpen ? 'Nenhuma conversa' : '—'}</div>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              className={`p-3 m-2 rounded-lg cursor-pointer transition-colors ${
                currentConversation?.id === conv.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              onClick={() => window.location.href = `/chat/${conv.id}`}
            >
              {isOpen ? (
                <p className="truncate text-sm">{conv.title}</p>
              ) : (
                <p className="text-xs text-center">•</p>
              )}
            </div>
          ))
        )}
      </div>

      {/* User Menu */}
      {isOpen && (
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{user?.name?.[0]?.toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout()
              window.location.href = '/login'
            }}
            className="w-full btn-secondary text-sm"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  )
}
