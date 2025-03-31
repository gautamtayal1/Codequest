"use client"

import { useState } from "react";

export default function ProblemTab() {
  const [activeTab, setActiveTab] = useState<'description' | 'submissions' | 'solutions'>('description');
  return (
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
          </div>
  );
}