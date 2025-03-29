"use client"

import React from 'react';
import { Calendar, Clock, Users, Trophy, ArrowRight, Zap } from 'lucide-react';

interface Contest {
  id: string;
  title: string;
  startTime: string;
  duration: string;
  participants: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Upcoming' | 'Live' | 'Ended';
}

const contests: Contest[] = [
  {
    id: '1',
    title: 'Neural Network Challenge',
    startTime: '2025-02-20T15:00:00Z',
    duration: '2 hours',
    participants: 1234,
    difficulty: 'Medium',
    status: 'Upcoming'
  },
  {
    id: '2',
    title: 'Quantum Computing Sprint',
    startTime: '2025-02-18T10:00:00Z',
    duration: '3 hours',
    participants: 856,
    difficulty: 'Hard',
    status: 'Live'
  },
  {
    id: '3',
    title: 'AI Algorithm Battle',
    startTime: '2025-02-15T20:00:00Z',
    duration: '1.5 hours',
    participants: 2431,
    difficulty: 'Easy',
    status: 'Ended'
  }
];

export default function Contests() {


  const getStatusColor = (status: Contest['status']) => {
    switch (status) {
      case 'Live':
        return 'text-green-400';
      case 'Upcoming':
        return 'text-yellow-400';
      case 'Ended':
        return 'text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty: Contest['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'Hard':
        return 'text-red-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 pt-20">
      {/* Header */}
      <div className="border-b border-indigo-500/20 bg-gray-900/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-4">
            Digital Combat Arena
          </h1>
          <p className="text-gray-300 max-w-2xl">
            Enter the arena and prove your worth. Compete against the brightest minds
            in real-time coding battles and climb the global leaderboard.
          </p>
        </div>
      </div>

      {/* Contest Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest) => (
            <div
              key={contest.id}
              className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 p-6 hover:border-indigo-500/40 transition group cursor-pointer"
            >
              {/* Status Indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className={`flex items-center space-x-2 ${getStatusColor(contest.status)}`}>
                  <Zap className="w-4 h-4" />
                  <span>{contest.status}</span>
                </span>
                <span className={`font-medium ${getDifficultyColor(contest.difficulty)}`}>
                  {contest.difficulty}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-100 mb-4 group-hover:text-indigo-400 transition">
                {contest.title}
              </h3>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(contest.startTime).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{contest.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{contest.participants} participants</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm">500 points</span>
                </div>
              </div>

              {/* Enter Button */}
              <button className="w-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 py-2 rounded-lg transition flex items-center justify-center space-x-2 group">
                <span>Enter Arena</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>

              {/* Circuit corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-500/30"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-500/30"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-500/30"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-500/30"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}