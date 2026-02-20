import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SetupAssignedProps {
  workspace: string
  username: string
  setupPath: string
  onNewLogin: () => void
}

export default function SetupAssigned({ workspace, username, setupPath, onNewLogin }: SetupAssignedProps) {
  return (
    <div className="w-full animate-fade-in">
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg animate-pulse">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-white mb-3 text-balance">
            Setup Assigned!
          </h2>

          <p className="text-lg text-slate-300 font-light">
            Admin has assigned your role for <span className="font-semibold text-blue-400">{workspace}</span>
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-950/40 to-cyan-950/40 border border-emerald-700/50 rounded-xl p-6 space-y-4">
          <div className="text-left">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">Your Role</p>
            <p className="text-2xl font-bold text-emerald-300">{setupPath}</p>
          </div>

          <div className="w-px h-px bg-slate-700 mx-0 my-3"></div>

          <div className="text-left">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Username</p>
            <p className="text-slate-300">{username}</p>
          </div>
        </div>

        <div className="text-center space-y-1">
          <p className="text-sm text-slate-400">
            You are now ready to proceed with your assigned setup
          </p>
          <p className="text-xs text-slate-500">
            Follow the instructions for your role
          </p>
        </div>

        <Button
          onClick={onNewLogin}
          className="w-full py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
        >
          Proceed to Dashboard
        </Button>
      </div>
    </div>
  )
}