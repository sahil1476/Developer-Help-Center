export interface Question {
  id: string;
  title: string;
  description: string;
  code?: string;
  createdAt: string;
  answers: Answer[];
  tags: string[];
  votes: number;
  solved: boolean;
}

export interface Answer {
  id: string;
  content: string;
  code?: string;
  createdAt: string;
  votes: number;
  isAccepted: boolean;
}