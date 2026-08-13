'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useChatStore } from '@/store/chat'
import ChatWindow from '@/components/ChatWindow'

export default function DashboardPage() {
  const router = useRouter()
  const { conversations } = useChatStore()

  useEffect(() => {
    if (conversations.length > 0) {
      router.push(`/chat/${conversations[0].id}`)
    }
  }, [conversations, router])

  return <ChatWindow />
}
