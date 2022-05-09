import { createContext, useContext, useReducer } from 'react';
import { quizReducer } from '../reducers';

const QuizContext = createContext(null);

const initialQuizState = {
  selectedQuiz: null,
};

const QuizProvider = ({ children }) => {
  const [quizState, dispatchQuiz] = useReducer(quizReducer, initialQuizState);
  return (
    <QuizContext.Provider value={{ quizState, dispatchQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => useContext(QuizContext);

export { initialQuizState, QuizProvider, useQuiz };
