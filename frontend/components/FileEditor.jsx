import React, { useState } from 'react';
import Editor from "@monaco-editor/react";

const FileEditor = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");
  const handleEditorChange = (value, event) => {
    onChange("code", value);
    
  };
  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="50vh"
        width={`100%`}
        language={language || "C++"}
        value={code}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default FileEditor;
