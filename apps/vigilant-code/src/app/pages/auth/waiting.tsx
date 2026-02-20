import { Loader2, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

interface WaitingSetupProps {
  workspace: string
  username: string
}

export default function WaitingSetup({ workspace, username }: WaitingSetupProps) {
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '.' : prev + '.'))
    }, 600)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full animate-fade-in">
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-white mb-3 text-balance">
            Setup Assignment
          </h2>

          <p className="text-lg text-slate-300 font-light">
            Waiting for admin to assign your role{dots}
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 border border-slate-700/50 rounded-xl p-6 space-y-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm font-semibold text-blue-400 mb-1">Username</p>
              <p className="text-slate-300">{username}</p>
            </div>
          </div>

          <div className="w-px h-px bg-slate-700 mx-0 my-3"></div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm font-semibold text-cyan-400 mb-1">Workspace</p>
              <p className="text-slate-300">{workspace}</p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-slate-400">
            The admin will review your credentials and assign an appropriate setup path
          </p>
          <p className="text-xs text-slate-500">
            This typically takes a few seconds
          </p>
        </div>
      </div>
    </div>
  )
}