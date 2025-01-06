import React, { useState, useEffect } from 'react';
import { HelpCircle, PlusCircle, Search } from 'lucide-react';
import { QuestionForm } from './components/QuestionForm';
import { QuestionList } from './components/QuestionList';
import { QuestionDetail } from './components/QuestionDetail';
import { SearchBar } from './components/SearchBar';
import { Modal } from './components/Modal';
import { Question } from './types';
import { getQuestions } from './utils/storage';

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Question[]>([]);

  useEffect(() => {
    const loadQuestions = () => {
      const loadedQuestions = getQuestions();
      setQuestions(loadedQuestions);
    };

    loadQuestions();
    window.addEventListener('storage', loadQuestions);
    return () => window.removeEventListener('storage', loadQuestions);
  }, []);

  useEffect(() => {
    const filtered = questions.filter((question) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        question.title.toLowerCase().includes(searchLower) ||
        question.description.toLowerCase().includes(searchLower) ||
        question.tags?.some(tag => tag.toLowerCase().includes(searchLower)) ||
        question.code?.toLowerCase().includes(searchLower)
      );
    });
    setSearchResults(filtered);
  }, [searchQuery, questions]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-indigo-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Developer Help Center
              </h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <PlusCircle className="w-5 h-5" />
              Ask Question
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedQuestion ? (
          <QuestionDetail
            question={selectedQuestion}
            onBack={() => setSelectedQuestion(null)}
          />
        ) : (
          <>
            <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
                  alt="Developers collaborating"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 flex items-center justify-center">
                  <div className="text-center px-4">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Find Solutions Together
                    </h2>
                    <p className="text-white/90 text-lg max-w-2xl">
                      Get help from experienced developers and share your knowledge with the community
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
            </div>

            {searchResults.length === 0 && searchQuery ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or ask a new question
                </p>
              </div>
            ) : (
              <QuestionList
                questions={searchResults}
                onQuestionClick={setSelectedQuestion}
              />
            )}
          </>
        )}
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <QuestionForm onSubmit={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default App;