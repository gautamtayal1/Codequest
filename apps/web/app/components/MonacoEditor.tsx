"use client"

import React, { forwardRef, useImperativeHandle, useRef } from "react"
import Editor from "@monaco-editor/react"

interface MonacoEditorProps {
  defaultCode: string;
  language: string;
}

const MonacoEditor = forwardRef(({ defaultCode, language }: MonacoEditorProps, ref) => {
  const editorRef = useRef<any>(null)

  useImperativeHandle(ref, () => ({
    getCode: () => editorRef.current?.getValue() || '',
  }));

  return (
    <Editor
  height="99%"
  width="99%"
  language={language}
  theme='vs-dark'
  onMount={(editor) => (editorRef.current = editor)} 
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
})

MonacoEditor.displayName = 'MonacoEditor';

export default MonacoEditor;


