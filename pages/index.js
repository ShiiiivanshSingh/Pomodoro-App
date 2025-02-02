// Landing page component
const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">Welcome to ChatAI</h1>
        <p className="text-xl">Your intelligent conversation companion</p>
        
        <div className="space-y-4">
          <Link href="/chat" className="btn btn-primary">
            Start Chatting
          </Link>
          <Link href="/features" className="btn btn-outline">
            Explore Features
          </Link>
        </div>
      </div>
    </div>
  )
} 