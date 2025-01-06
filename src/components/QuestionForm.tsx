import React, { useState } from 'react';
import { PlusCircle, Code, MessageSquare } from 'lucide-react';
import { saveQuestion } from '../utils/storage';
import { TagInput } from './TagInput';

interface QuestionFormProps {
  onSubmit?: () => void;
}

export function QuestionForm({ onSubmit }: QuestionFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const question = {
      id: Date.now().toString(),
      title,
      description,
      code: code || undefined,
      createdAt: new Date().toISOString(),
      answers: [],
      tags,
      votes: 0,
      solved: false
    };
    saveQuestion(question);
    setTitle('');
    setDescription('');
    setCode('');
    setTags([]);
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 text-purple-600 mb-2">
        <MessageSquare className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Ask a Question</h2>
      </div>
      
      <div className="space-y-4">
        <div className="group">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all group-hover:border-purple-300"
            placeholder="What's your question about?"
          />
        </div>

        <div className="group">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all group-hover:border-purple-300"
            placeholder="Describe your question in detail..."
          />
        </div>

        <div className="group">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <TagInput tags={tags} onChange={setTags} />
        </div>

        <div className="group">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Code className="w-4 h-4" />
            Code (optional)
          </label>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all group-hover:border-purple-300"
            placeholder="Paste your code here..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] font-semibold shadow-md"
        >
          Submit Question
        </button>
      </div>
    </form>
  );
}