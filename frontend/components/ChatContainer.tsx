'use client'

import { useEffect } from 'react'
import { useChatStore } from '@/store/chat'
import { useParams } from 'next/navigation'
import api from '@/lib/api'

export default function ChatContainer() {
  const { currentConversation, setCurrentConversation } = useChatStore()
  const params = useParams()
  const conversationId = params?.id as string

  useEffect(() => {
    if (conversationId) {
      fetchConversation()
    }
  }, [conversationId])

  const fetchConversation = async () => {
    try {
      const response = await api.get(`/chat/conversations/${conversationId}`)
      setCurrentConversation(response.data)
    } catch (error) {
      console.error('Error fetching conversation:', error)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-950">
      {currentConversation ? (
        <>
          {/* Header */}
          <div className="border-b border-slate-800 p-4">
            <h1 className="text-lg font-semibold text-white">{currentConversation.title}</h1>
            <p className="text-sm text-slate-400">Modelo: {currentConversation.model}</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="text-center text-slate-400 py-8">
              Nenhuma mensagem ainda. Comece a conversar!
            </div>
          </div>

          {/* Composer */}
          <div className="border-t border-slate-800 p-4">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              className="input-base"
            />
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Nenhuma Conversa Selecionada</h2>
            <p className="text-slate-400">Selecione uma conversa na barra lateral ou crie uma nova</p>
          </div>
        </div>
      )}
    </div>
  )
}
