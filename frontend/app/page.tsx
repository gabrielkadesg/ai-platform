'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold text-white">AI Platform</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="text-slate-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/register" className="btn-primary">
              Começar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-clip-text text-transparent">
          Seu Assistente de IA Profissional
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Chat em tempo real, múltiplos modelos de IA, upload de arquivos, memória persistente e muito mais.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/register" className="btn-primary text-lg px-8 py-3">
            Começar Gratuitamente
          </Link>
          <button className="btn-secondary text-lg px-8 py-3">
            Ver Demo
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Recursos Principais</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '💬',
              title: 'Chat em Tempo Real',
              description: 'Respostas instantâneas com streaming de dados',
            },
            {
              icon: '🤖',
              title: 'Múltiplos Modelos',
              description: 'GPT-4, Claude, Gemini e mais',
            },
            {
              icon: '📁',
              title: 'Upload de Arquivos',
              description: 'Analise PDF, DOCX, imagens e muito mais',
            },
            {
              icon: '💾',
              title: 'Memória Persistente',
              description: 'Seu contexto é sempre lembrado',
            },
            {
              icon: '📊',
              title: 'Projetos',
              description: 'Organize suas conversas',
            },
            {
              icon: '🔒',
              title: 'Segurança',
              description: 'Seus dados estão protegidos',
            },
          ].map((feature, i) => (
            <div key={i} className="card hover:border-primary-500 transition-colors">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16 rounded-2xl max-w-4xl mx-auto mb-20 mx-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Pronto para começar?</h2>
        <p className="text-lg text-white/90 mb-8">Crie sua conta gratuitamente e comece a usar IA agora</p>
        <Link href="/register" className="bg-white text-primary-600 font-bold py-3 px-8 rounded-lg hover:bg-slate-100 transition-colors inline-block">
          Criar Conta
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400">
          <p>&copy; 2024 AI Platform. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
