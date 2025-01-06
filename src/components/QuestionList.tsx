import React from 'react';
import { MessageSquare, Clock, ChevronRight, Tag, ThumbsUp } from 'lucide-react';
import { Question } from '../types';

interface QuestionListProps {
  questions: Question[];
  onQuestionClick: (question: Question) => void;
}

export function QuestionList({ questions, onQuestionClick }: QuestionListProps) {
  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div
          key={question.id}
          onClick={() => onQuestionClick(question)}
          className="group bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-lg transition-all duration-200 animate-fade-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex gap-4">
            <div className="flex flex-col items-center min-w-[64px] text-gray-500">
              <ThumbsUp className={`w-5 h-5 ${question.votes > 0 ? 'text-indigo-600' : ''}`} />
              <span className={`font-medium ${question.votes > 0 ? 'text-indigo-600' : ''}`}>
                {question.votes}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-indigo-600 transition-colors">
                {question.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{question.description}</p>
              
              {question.tags && question.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <MessageSquare className="w-4 h-4" />
                    <span>{question.answers?.length || 0} answers</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(question.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}