import React from 'react';
import { Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="relative group">
      <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
        <code>{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 bg-white rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        title="Copy code"
      >
        <Copy className="w-4 h-4 text-gray-500 hover:text-purple-600" />
      </button>
    </div>
  );
}