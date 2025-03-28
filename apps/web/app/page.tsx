import React from 'react';
import { Brain, Zap, Trophy, ArrowRight } from 'lucide-react';


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 circuit-pattern relative overflow-hidden">
      {/* Matrix-like Data Streams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute data-stream text-indigo-500/20 text-xs"
            style={{
              left: `${i * 10}%`,
              animationDelay: `${i * 0.3}s`,
              fontFamily: 'monospace'
            }}
          >
            {[...Array(20)].map((_, j) => (
              <div key={j}>
                {Math.random().toString(36).substring(2, 4)}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Circuit Grid Overlay */}
      <div className="absolute inset-0 circuit-grid opacity-20"></div>

      {/* Animated Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <path
          d="M0,100 Q25,25 100,100 T200,100 T300,100 T400,100"
          className="circuit-line"
          fill="none"
          stroke="rgba(99, 102, 241, 0.1)"
          strokeWidth="2"
        />
        <path
          d="M0,200 Q75,125 150,200 T300,200 T450,200"
          className="circuit-line"
          fill="none"
          stroke="rgba(167, 139, 250, 0.1)"
          strokeWidth="2"
        />
        {/* Additional circuit paths */}
        <path
          d="M50,0 C100,100 200,100 250,0"
          className="circuit-line"
          fill="none"
          stroke="rgba(99, 102, 241, 0.1)"
          strokeWidth="2"
          style={{ animationDelay: '1s' }}
        />
        <path
          d="M150,0 C200,100 300,100 350,0"
          className="circuit-line"
          fill="none"
          stroke="rgba(167, 139, 250, 0.1)"
          strokeWidth="2"
          style={{ animationDelay: '1.5s' }}
        />
      </svg>

 

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
            {/* Electric arcs */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-80">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 border-2 border-indigo-500/20 rounded-full"
                  style={{
                    transform: `scale(${1 + i * 0.1}) rotate(${i * 15}deg)`,
                    animation: `pulse-glow ${3 + i}s infinite`
                  }}
                ></div>
              ))}
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text relative">
              Decode Your Future
              <br />
              Master the Matrix
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the elite ranks of developers who are pushing the boundaries of code.
              Your journey to technical mastery begins here.
            </p>
            <button className="bg-indigo-500 text-white px-8 py-4 rounded-lg text-lg font-medium transition relative group inline-flex items-center space-x-2">
              <span className="relative z-10">Enter the Matrix</span>
              <ArrowRight className="w-5 h-5 relative z-10" />
              <div className="absolute inset-0 bg-indigo-400 opacity-0 group-hover:opacity-20 rounded-lg blur-xl transition"></div>
              {/* Electric connection lines */}
              <div className="absolute -left-8 top-1/2 h-px w-6 bg-gradient-to-r from-transparent to-indigo-500/50 transform -translate-y-1/2 circuit-line"></div>
              <div className="absolute -right-8 top-1/2 h-px w-6 bg-gradient-to-l from-transparent to-indigo-500/50 transform -translate-y-1/2 circuit-line"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-900/40 backdrop-blur-xl p-8 rounded-2xl border border-indigo-500/20 hover:border-indigo-500/40 transition group relative floating">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl blur-xl transition-all group-hover:bg-indigo-500/10"></div>
            {/* Circuit corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-500/30"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-500/30"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-500/30"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-500/30"></div>
            <Brain className="w-12 h-12 text-purple-400 mb-4 relative z-10" />
            <h3 className="text-xl font-semibold mb-3 text-gray-100 relative z-10">Neural Network</h3>
            <p className="text-gray-400 relative z-10">
              2000+ algorithmic challenges designed to rewire your coding neurons and
              enhance your problem-solving capabilities.
            </p>
          </div>
          <div className="bg-gray-900/40 backdrop-blur-xl p-8 rounded-2xl border border-indigo-500/20 hover:border-indigo-500/40 transition group relative floating" style={{ animationDelay: '2s' }}>
            <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl blur-xl transition-all group-hover:bg-indigo-500/10"></div>
            {/* Circuit corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-500/30"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-500/30"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-500/30"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-500/30"></div>
            <Zap className="w-12 h-12 text-indigo-400 mb-4 relative z-10" />
            <h3 className="text-xl font-semibold mb-3 text-gray-100 relative z-10">Quantum IDE</h3>
            <p className="text-gray-400 relative z-10">
              State-of-the-art coding environment with real-time compilation and
              advanced debugging capabilities.
            </p>
          </div>
          <div className="bg-gray-900/40 backdrop-blur-xl p-8 rounded-2xl border border-indigo-500/20 hover:border-indigo-500/40 transition group relative floating" style={{ animationDelay: '4s' }}>
            <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl blur-xl transition-all group-hover:bg-indigo-500/10"></div>
            {/* Circuit corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-500/30"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-500/30"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-500/30"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-500/30"></div>
            <Trophy className="w-12 h-12 text-yellow-400 mb-4 relative z-10" />
            <h3 className="text-xl font-semibold mb-3 text-gray-100 relative z-10">Battle Arena</h3>
            <p className="text-gray-400 relative z-10">
              Enter the arena of elite programmers. Compete in real-time battles
              and climb the global leaderboard.
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default App;