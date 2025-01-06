import { Question } from '../types';

const STORAGE_KEY = 'help_center_questions';

export const getQuestions = (): Question[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveQuestion = (question: Question) => {
  const questions = getQuestions();
  questions.unshift(question);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
};

export const addAnswer = (questionId: string, answer: Question['answers'][0]) => {
  const questions = getQuestions();
  const questionIndex = questions.findIndex((q) => q.id === questionId);
  if (questionIndex !== -1) {
    questions[questionIndex].answers.push(answer);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  }
};

export const updateQuestionVotes = (questionId: string, increment: boolean): number => {
  const questions = getQuestions();
  const questionIndex = questions.findIndex((q) => q.id === questionId);
  if (questionIndex !== -1) {
    const currentVotes = questions[questionIndex].votes || 0; // Ensure votes is initialized
    questions[questionIndex].votes = currentVotes + (increment ? 1 : -1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
    return questions[questionIndex].votes;
  }
  return 0;
};

export const updateAnswerVotes = (questionId: string, answerId: string, increment: boolean): number => {
  const questions = getQuestions();
  const questionIndex = questions.findIndex((q) => q.id === questionId);
  if (questionIndex !== -1) {
    const answerIndex = questions[questionIndex].answers.findIndex(a => a.id === answerId);
    if (answerIndex !== -1) {
      const currentVotes = questions[questionIndex].answers[answerIndex].votes || 0; // Ensure votes is initialized
      questions[questionIndex].answers[answerIndex].votes = currentVotes + (increment ? 1 : -1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
      return questions[questionIndex].answers[answerIndex].votes;
    }
  }
  return 0;
};

export const markQuestionSolved = (questionId: string, answerId: string) => {
  const questions = getQuestions();
  const questionIndex = questions.findIndex((q) => q.id === questionId);
  if (questionIndex !== -1) {
    questions[questionIndex].solved = true;
    const answerIndex = questions[questionIndex].answers.findIndex(a => a.id === answerId);
    if (answerIndex !== -1) {
      questions[questionIndex].answers[answerIndex].isAccepted = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
    }
  }
};