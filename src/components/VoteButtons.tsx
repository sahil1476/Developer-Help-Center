import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface VoteButtonsProps {
  votes: number;
  onVote: (increment: boolean) => void;
}

export function VoteButtons({ votes = 0, onVote }: VoteButtonsProps) {
  const handleVote = (increment: boolean) => {
    // Prevent default to avoid form submission
    onVote(increment);
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button" // Explicitly set button type to prevent form submission
        onClick={(e) => {
          e.preventDefault();
          handleVote(true);
        }}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ChevronUp className="w-6 h-6 text-gray-500 hover:text-purple-600" />
      </button>
      <span className="font-medium text-gray-700">{votes || 0}</span>
      <button
        type="button" // Explicitly set button type to prevent form submission
        onClick={(e) => {
          e.preventDefault();
          handleVote(false);
        }}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ChevronDown className="w-6 h-6 text-gray-500 hover:text-purple-600" />
      </button>
    </div>
  );
}