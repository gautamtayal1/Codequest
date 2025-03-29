"use client"

import React, { useState } from 'react';
import { Search, Filter, Star, BarChart2, Clock, CheckCircle2, AlertCircle, Lock } from 'lucide-react';

interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance: number;
  solved: boolean;
  premium: boolean;
  category: string;
}

export default function Problems() {
  const [searchQuery, setSearchQuery] = useState('');

  const problems: Problem[] = [
    {
      id: 1,
      title: "Binary Matrix Encryption",
      difficulty: "Easy",
      acceptance: 76.5,
      solved: true,
      premium: false,
      category: "Arrays"
    },
    {
      id: 2,
      title: "Quantum State Optimizer",
      difficulty: "Hard",
      acceptance: 32.1,
      solved: false,
      premium: true,
      category: "Dynamic Programming"
    },
    {
      id: 3,
      title: "Neural Network Pathfinder",
      difficulty: "Medium",
      acceptance: 45.8,
      solved: false,
      premium: false,
      category: "Graphs"
    },
    {
      id: 4,
      title: "Cybernetic Array Rotation",
      difficulty: "Easy",
      acceptance: 82.3,
      solved: true,
      premium: false,
      category: "Arrays"
    },
    {
      id: 5,
      title: "Digital Signal Processor",
      difficulty: "Medium",
      acceptance: 51.2,
      solved: false,
      premium: false,
      category: "Bit Manipulation"
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'Hard':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 circuit-pattern pt-24 px-4 sm:px-6 lg:px-8 pb-5">
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

      <div className="max-w-7xl mx-auto">
        {/* Problems List */}
        <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-indigo-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-indigo-500/20">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Difficulty</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Acceptance</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Category</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem) => (
                  <tr
                    key={problem.id}
                    className="border-b border-indigo-500/10 hover:bg-indigo-500/5 transition cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      {problem.solved ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-gray-500" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-300 group-hover:text-indigo-400 transition">
                          {problem.title}
                        </span>
                        {problem.premium && (
                          <Lock className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <BarChart2 className="w-4 h-4 text-indigo-400" />
                        <span className="text-gray-300">{problem.acceptance}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{problem.category}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-indigo-500/20 relative group">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl blur-xl transition-all group-hover:bg-indigo-500/10"></div>
            <div className="relative z-10">
              <Star className="w-8 h-8 text-yellow-400 mb-2" />
              <h3 className="text-xl font-semibold text-gray-100">Points Earned</h3>
              <p className="text-3xl font-bold text-indigo-400 mt-2">2,450</p>
            </div>
          </div>
          <div className="bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-indigo-500/20 relative group">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl blur-xl transition-all group-hover:bg-indigo-500/10"></div>
            <div className="relative z-10">
              <CheckCircle2 className="w-8 h-8 text-green-400 mb-2" />
              <h3 className="text-xl font-semibold text-gray-100">Problems Solved</h3>
              <p className="text-3xl font-bold text-indigo-400 mt-2">42/150</p>
            </div>
          </div>
          <div className="bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-indigo-500/20 relative group">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl blur-xl transition-all group-hover:bg-indigo-500/10"></div>
            <div className="relative z-10">
              <Clock className="w-8 h-8 text-purple-400 mb-2" />
              <h3 className="text-xl font-semibold text-gray-100">Time Invested</h3>
              <p className="text-3xl font-bold text-indigo-400 mt-2">156h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}