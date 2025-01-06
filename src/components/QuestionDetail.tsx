import React, { useState } from 'react';
import { MessageSquare, Clock, ArrowLeft, Check } from 'lucide-react';
import { Question } from '../types';
import { addAnswer, updateQuestionVotes, updateAnswerVotes, markQuestionSolved } from '../utils/storage';
import { VoteButtons } from './VoteButtons';
import { CodeBlock } from './CodeBlock';

interface QuestionDetailProps {
  question: Question;
  onBack: () => void;
}

export function QuestionDetail({ question, onBack }: QuestionDetailProps) {
  const [answer, setAnswer] = useState('');
  const [code, setCode] = useState('');
  const [localQuestion, setLocalQuestion] = useState(question);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnswer = {
      id: Date.now().toString(),
      content: answer,
      code: code || undefined,
      createdAt: new Date().toISOString(),
      votes: 0,
      isAccepted: false
    };
    addAnswer(question.id, newAnswer);
    setAnswer('');
    setCode('');
    setLocalQuestion(prev => ({
      ...prev,
      answers: [...prev.answers, newAnswer]
    }));
  };

  const handleQuestionVote = (increment: boolean) => {
    const newVotes = updateQuestionVotes(question.id, increment);
    setLocalQuestion(prev => ({ ...prev, votes: newVotes }));
  };

  const handleAnswerVote = (answerId: string, increment: boolean) => {
    const newVotes = updateAnswerVotes(question.id, answerId, increment);
    setLocalQuestion(prev => ({
      ...prev,
      answers: prev.answers.map(a => 
        a.id === answerId ? { ...a, votes: newVotes } : a
      )
    }));
  };

  const handleAcceptAnswer = (answerId: string) => {
    markQuestionSolved(question.id, answerId);
    setLocalQuestion(prev => ({
      ...prev,
      solved: true,
      answers: prev.answers.map(a => ({
        ...a,
        isAccepted: a.id === answerId
      }))
    }));
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Questions
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex gap-4">
          <VoteButtons votes={localQuestion.votes} onVote={handleQuestionVote} />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">{localQuestion.title}</h2>
            <p className="text-gray-700 mb-4">{localQuestion.description}</p>
            
            {localQuestion.code && (
              <div className="mb-4">
                <CodeBlock code={localQuestion.code} />
              </div>
            )}

            {localQuestion.tags && localQuestion.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {localQuestion.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>{new Date(localQuestion.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          {localQuestion.answers.length} Answers
        </h3>

        <div className="space-y-6">
          {localQuestion.answers.map((answer) => (
            <div key={answer.id} className="border-b pb-6 last:border-b-0">
              <div className="flex gap-4">
                <VoteButtons
                  votes={answer.votes}
                  onVote={(increment) => handleAnswerVote(answer.id, increment)}
                />
                <div className="flex-1">
                  <p className="text-gray-700 mb-4">{answer.content}</p>
                  {answer.code && (
                    <div className="mb-4">
                      <CodeBlock code={answer.code} />
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {new Date(answer.createdAt).toLocaleString()}
                    </div>
                    {!localQuestion.solved && (
                      <button
                        onClick={() => handleAcceptAnswer(answer.id)}
                        className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
                      >
                        <Check className="w-4 h-4" />
                        Accept Answer
                      </button>
                    )}
                    {answer.isAccepted && (
                      <span className="flex items-center gap-1 text-sm text-green-600">
                        <Check className="w-4 h-4" />
                        Accepted Answer
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
              Your Answer
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your answer..."
            />
          </div>

          <div>
            <label htmlFor="answerCode" className="block text-sm font-medium text-gray-700 mb-1">
              Code (optional)
            </label>
            <textarea
              id="answerCode"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Include code if relevant..."
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Answer
          </button>
        </form>
      </div>
    </div>
  );
}