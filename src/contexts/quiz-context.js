import { createContext, useContext, useEffect, useReducer } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { quizReducer } from '../reducers';
import { QUIZ_ACTIONS } from '../utils';
import { db } from '../firebase';

const QuizContext = createContext(null);

const initialQuizState = {
  selectedQuizID: null,
  selectedQuiz: null,
  isLoaderActive: false,
  currentQuizScore: 0,
  currentQuestionNumber: 1,
};

const QuizProvider = ({ children }) => {
  const [quizState, dispatchQuiz] = useReducer(quizReducer, initialQuizState);
  const { selectedQuizID, selectedQuiz } = quizState;

  useEffect(() => {
    if (!selectedQuiz && selectedQuizID) {
      dispatchQuiz({ type: QUIZ_ACTIONS.SHOW_LOADER });
      (async () => {
        try {
          const res = await getDoc(doc(db, 'quizzes', selectedQuizID));
          dispatchQuiz({
            type: QUIZ_ACTIONS.SET_SELECTED_QUIZ,
            payload: { quizDetails: res.data() },
          });
        } catch (error) {
          console.error(error);
        } finally {
          dispatchQuiz({ type: QUIZ_ACTIONS.HIDE_LOADER });
        }
      })();
    }
  }, [selectedQuizID, selectedQuiz]);

  return (
    <QuizContext.Provider value={{ quizState, dispatchQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => useContext(QuizContext);

export { initialQuizState, QuizProvider, useQuiz };
