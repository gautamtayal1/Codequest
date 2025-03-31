"use client"

import React from "react"
import Editor from "@monaco-editor/react"

export default function MonacoEditor({
  defaultCode, language}: 
  {
  defaultCode: string, language: string
}) {

  return (
    <Editor
  height="99%"
  width="99%"
  language={language}
  theme='vs-dark'
  value={defaultCode}
  options={{
    fontSize: 16, 
    minimap: { enabled: false }, 
    lineNumbers: "on", 
    wordWrap: "on", 
    formatOnPaste: true, 
    formatOnType: true, 
    tabSize: 2, 
    insertSpaces: true, 
    automaticLayout: true, 
    scrollbar: {
      vertical: "visible",
      horizontal: "visible",
    },
    overviewRulerBorder: false, 
    smoothScrolling: true, 
    folding: true, 
    foldingHighlight: true, 
    contextmenu: true, 
    scrollBeyondLastLine: false, 
    cursorSmoothCaretAnimation: "on", 
    renderWhitespace: "selection", 
    showFoldingControls: "always", 
    quickSuggestions: true, 
    parameterHints: { enabled: true }, 
    suggestOnTriggerCharacters: true, 
    glyphMargin: true, 
    readOnly: false
  }}
/>

  )
}