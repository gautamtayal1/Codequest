"use client"

import React, { useState } from 'react';
import { Play, CheckCircle2, Clock, ChevronDown, MessageSquare, Settings2, Share2 } from 'lucide-react';

interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

export default function ProblemSolving() {
  const [activeTab, setActiveTab] = useState<'description' | 'submissions' | 'solutions'>('description');
  
  const problem = {
    title: "Neural Network Synchronization",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    likes: 2456,
    dislikes: 124,
    description: `Given a neural network represented as a binary matrix of size n × n, synchronize all nodes to achieve optimal data flow. Each node can only communicate with its adjacent nodes (up, down, left, right).

A node can be synchronized if all its adjacent nodes have the same value. You can flip the value of any node (0 to 1 or 1 to 0) in one operation.

Return the minimum number of operations needed to synchronize all nodes.`,
    examples: [
      {
        input: `matrix = [
  [1,0,1],
  [0,0,1],
  [1,1,0]
]`,
        output: "2",
        explanation: "Flip matrix[0][1] and matrix[2][2] to synchronize all nodes."
      },
      {
        input: `matrix = [
  [0,0],
  [0,1]
]`,
        output: "1",
        explanation: "Flip matrix[1][1] to synchronize all nodes."
      }
    ],
    constraints: [
      "1 ≤ n ≤ 100",
      "matrix[i][j] is either 0 or 1",
      "The input matrix is always valid"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 pt-20">
      {/* Problem Header */}
      <div className="border-b border-indigo-500/20 bg-gray-900/40 backdrop-blur-sm">
        <div className="max-w-screen-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-100 mb-2">{problem.title}</h1>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-yellow-400 font-medium">{problem.difficulty}</span>
                <span className="text-gray-400">Time: {problem.timeComplexity}</span>
                <span className="text-gray-400">Space: {problem.spaceComplexity}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-indigo-400 transition">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-indigo-400 transition">
                <Settings2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 py-6 grid grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="space-y-6">
          {/* Tabs */}
          <div className="flex border-b border-indigo-500/20">
            <button
              className={`px-6 py-3 text-sm font-medium transition ${
                activeTab === 'description'
                  ? 'text-indigo-400 border-b-2 border-indigo-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium transition ${
                activeTab === 'submissions'
                  ? 'text-indigo-400 border-b-2 border-indigo-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('submissions')}
            >
              Submissions
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium transition ${
                activeTab === 'solutions'
                  ? 'text-indigo-400 border-b-2 border-indigo-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('solutions')}
            >
              Solutions
            </button>
          </div>

          {/* Description Content */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 p-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">{problem.description}</p>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-100 mb-4">Examples:</h3>
                {problem.examples.map((example, index) => (
                  <div key={index} className="mb-6 bg-gray-800/40 rounded-lg p-4 border border-indigo-500/10">
                    <div className="mb-2">
                      <span className="text-gray-400 font-mono">Input: </span>
                      <pre className="mt-1 text-gray-300 font-mono">{example.input}</pre>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-400 font-mono">Output: </span>
                      <pre className="mt-1 text-gray-300 font-mono">{example.output}</pre>
                    </div>
                    {example.explanation && (
                      <div>
                        <span className="text-gray-400 font-mono">Explanation: </span>
                        <span className="text-gray-300">{example.explanation}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-100 mb-4">Constraints:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index} className="text-gray-300 font-mono">{constraint}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor Container */}
        <div className="space-y-6">
          {/* Language Selector */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 p-2">
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-indigo-400 transition">
              <span>JavaScript</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Editor Container - Will be replaced with Monaco */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 h-[600px] relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              Monaco Editor will be integrated here
            </div>
          </div>

          {/* Control Panel */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
                  <Play className="w-4 h-4" />
                  <span>Run</span>
                </button>
                <button className="flex items-center space-x-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit</span>
                </button>
              </div>
              <div className="flex items-center space-x-4 text-gray-400">
                <Clock className="w-5 h-5" />
                <span>Time Limit: 3s</span>
              </div>
            </div>
          </div>

          {/* Console Output */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300 font-medium">Console Output</span>
            </div>
            <pre className="text-gray-300 font-mono text-sm">
              Your code output will appear here
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}