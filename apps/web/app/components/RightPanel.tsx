"use client"

import { Problem } from "@prisma/client";
import { CheckCircle2, MessageSquare } from "lucide-react";
import MonacoEditor from "./MonacoEditor";
import { useRef, useState } from "react";
import axios from "axios";


export default function RightPanel({problem}: {problem: Problem}) {
  const [language, setLanguage] = useState("Javascript")
  const [status1, setStatus1] = useState("")
  const [status2, setStatus2] = useState("")

  console.log(problem)
  const editorRef = useRef<any>(null)

  const handleSubmit = () => {
    const code = editorRef.current?.getCode()
    console.log("Submitted Code:", code);
    submitRequest(code)
  }

  const submitRequest = async(code: string) => {
    try {
      console.log("submit req")
      const res = await axios.post(`/api/submissions/batch`, {
        code: code,
        languageId: language === "Javascript" ? "js" : "cpp",
        problemId: problem.id
      })
      const submission = res.data.submissions
      setStatus1("RUNNING")
      setStatus2("RUNNING")
      getStatus(submission.id)
    } catch (error) {
      console.error("Error submitting code:", error)
    }
  }

  const getStatus = (submissionId: string) => {
    const interval = setInterval(async() => {
      const response = await axios.post("/api/submissions/status", {
        submissionId: submissionId
      }, {
        withCredentials: true
      })
      const submission = response.data.submission 
      console.log(submission)

      if(submission.status !== "PENDING"){
        setStatus1(submission.testCases[0].status)
        setStatus2(submission.testCases[1].status)
        clearInterval(interval)
      }
    }, 1000);
  }

  const getDefaultCode = () => {
    return language === "Javascript" ? 
      problem.defaultCode.find((code: {languageId: number, code: string}) => code.languageId === 1)?.code : 
      problem.defaultCode.find((code: {languageId: number, code: string}) => code.languageId === 2)?.code
  }

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 p-2">
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-indigo-400 transition">
              
              <select name="Language" 
              onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="Javascript">Javascript</option>
                <option value="Cpp">C++</option>
              </select>
            </button>
                </div>

          {/* Editor Container - Will be replaced with Monaco */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 h-[600px] relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-500" >
            <MonacoEditor 
            ref={editorRef}
              defaultCode={getDefaultCode()}
              language={language === "Javascript" ? "javascript" : "cpp"} 
            />
            </div>
          </div>

          {/* Control Panel */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                onClick={handleSubmit}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit</span>
                </button>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-indigo-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Test Case 1</span>
                  {status1 && (
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${status1 === 'RUNNING' ? 'bg-yellow-500 animate-pulse' : status1 === 'FAIL' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                      <span className="text-gray-400 text-sm">{status1 === 'RUNNING' ? 'Running' : status1 === 'FAIL' ? 'Failed' : 'Accepted'}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg border border-indigo-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Test Case 2</span>
                  {status2 && (
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${status2 === 'RUNNING' ? 'bg-yellow-500 animate-pulse' : status2 === 'FAIL' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                      <span className="text-gray-400 text-sm">{status2 === 'RUNNING' ? 'Running' : status2 === 'FAIL' ? 'Failed' : 'Accepted'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            </pre>
          </div>
        </div>
  );
}
