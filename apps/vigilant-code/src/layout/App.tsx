  

import { useState } from 'react'
import WorkspaceEntry from '@/components/workspace-entry'
import Credentials from '@/components/credentials'
import Success from '@/components/success'
import WaitingSetup from '@/components/waiting-setup'
import SetupAssigned from '@/components/setup-assigned'

export default function Page() {
  const [step, setStep] = useState<'workspace' | 'credentials' | 'success' | 'waiting' | 'assigned'>('workspace')
  const [workspace, setWorkspace] = useState('')
  const [email, setEmail] = useState('')
  const [setupPath, setSetupPath] = useState('')

  const handleWorkspaceSubmit = (value: string) => {
    setWorkspace(value)
    setStep('credentials')
  }

  const handleBackClick = () => {
    setStep('workspace')
  }

  const handleLoginSuccess = (userEmail: string) => {
    setEmail(userEmail)
    setStep('success')
  }

  const handleProceedToWaiting = () => {
    setStep('waiting')
  }

  const handleSetupAssigned = (setup: string) => {
    setSetupPath(setup)
    setStep('assigned')
  }

  const handleNewLogin = () => {
    setWorkspace('')
    setEmail('')
    setSetupPath('')
    setStep('workspace')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 w-full max-w-md px-4 flex items-center justify-center">
        {/* Fade and slide transitions */}
        <div className={`w-full transition-all duration-700 ease-out absolute ${step === 'workspace' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
          <WorkspaceEntry onSubmit={handleWorkspaceSubmit} />
        </div>

        <div className={`w-full transition-all duration-700 ease-out absolute ${step === 'credentials' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
          <Credentials workspace={workspace} onBack={handleBackClick} onSuccess={handleLoginSuccess} />
        </div>

        <div className={`w-full transition-all duration-700 ease-out absolute ${step === 'success' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
          <Success workspace={workspace} email={email} onProceed={handleProceedToWaiting} />
        </div>

        <div className={`w-full transition-all duration-700 ease-out absolute ${step === 'waiting' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
          <WaitingSetup workspace={workspace} email={email} onSetupAssigned={handleSetupAssigned} />
        </div>

        <div className={`w-full transition-all duration-700 ease-out absolute ${step === 'assigned' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
          <SetupAssigned workspace={workspace} email={email} setupPath={setupPath} onNewLogin={handleNewLogin} />
        </div>
      </div>
    </div>
  )
}
