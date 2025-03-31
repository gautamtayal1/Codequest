import React from 'react';
import ProblemTab from '@/components/ProblemTab';
import prisma from '@repo/db/config';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import RightPanel from '@/components/RightPanel';

export default async function ProblemSolving({params}: {params: {id: string}}) {
  
  const problem = await prisma.problem.findUnique({
    where: {id: params.id},
    include: {
      defaultCode: true
      }
  })

  const defaultCode = problem?.defaultCode[0]?.code || '// Write your code here'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 pt-20">
      {/* Problem Header */}
      <div className="border-b border-indigo-500/20 bg-gray-900/40 backdrop-blur-sm">
        <div className="max-w-screen-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-100 mb-2">{problem?.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 py-6 grid grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="space-y-6">
          {/* Tabs */}
          <ProblemTab />

          {/* Description Content */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 text-white prose lg:prose-xl my-5 p-6">
            <div className="prose prose-invert prose-indigo prose-lg max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({node, ...props}) => <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#818cf8', marginBottom: '1rem'}} {...props} />,
                  h2: ({node, ...props}) => <h2 style={{fontSize: '2rem', fontWeight: 'semibold', color: '#a5b4fc', marginTop: '1.5rem', marginBottom: '0.75rem'}} {...props} />,
                  h3: ({node, ...props}) => <h3 style={{fontSize: '1.75rem', fontWeight: 'medium', color: '#c7d2fe', marginTop: '1rem', marginBottom: '0.5rem'}} {...props} />,
                  p: ({node, ...props}) => <p style={{fontSize: '1.125rem', color: '#d1d5db', marginBottom: '1rem'}} {...props} />,
                  ul: ({node, ...props}) => <ul style={{listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem', color: '#d1d5db', fontSize: '1.125rem'}} {...props} />,
                  ol: ({node, ...props}) => <ol style={{listStyleType: 'decimal', paddingLeft: '1.5rem', marginBottom: '1rem', color: '#d1d5db', fontSize: '1.125rem'}} {...props} />,
                  li: ({node, ...props}) => <li style={{marginBottom: '0.25rem', fontSize: '1.125rem'}} {...props} />,
                  code: ({node, ...props}) => {
                    const isInline = !props.className;
                    return isInline 
                      ? <code style={{backgroundColor: '#1f2937', padding: '0.125rem 0.25rem', borderRadius: '0.25rem', color: '#93c5fd', fontFamily: 'monospace', fontSize: '1rem'}} {...props} />
                      : <code style={{display: 'block', backgroundColor: 'rgba(31, 41, 55, 0.5)', padding: '1rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem', color: '#93c5fd', overflow: 'auto', margin: '1rem 0'}} {...props} />;
                  },
                  blockquote: ({node, ...props}) => <blockquote style={{borderLeftWidth: '4px', borderLeftColor: '#6366f1', paddingLeft: '1rem', fontStyle: 'italic', color: '#9ca3af', margin: '1rem 0', fontSize: '1.125rem'}} {...props} />,
                  a: ({node, ...props}) => <a style={{color: '#60a5fa', textDecoration: 'underline', fontSize: '1.125rem'}} {...props} />,
                  table: ({node, ...props}) => <table style={{borderCollapse: 'collapse', width: '100%', margin: '1rem 0', fontSize: '1.125rem'}} {...props} />,
                  th: ({node, ...props}) => <th style={{border: '1px solid rgba(99, 102, 241, 0.3)', padding: '0.5rem 1rem', textAlign: 'left', backgroundColor: 'rgba(79, 70, 229, 0.3)', fontSize: '1.125rem'}} {...props} />,
                  td: ({node, ...props}) => <td style={{border: '1px solid rgba(99, 102, 241, 0.2)', padding: '0.5rem 1rem', fontSize: '1.125rem'}} {...props} />
                }}
              >
                {problem?.description}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor Container */}
        <RightPanel problem={problem}/>
      </div>
    </div>
  );
}