import './Question.css';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, doc, setDoc } from 'firebase/firestore';
import { QUIZ_ACTIONS } from '../../utils';
import { Spinner } from '../../components';
import { useAuth, useQuiz } from '../../contexts';
import { db } from '../../firebase';
import toast from 'react-hot-toast';

export const Question = () => {
  const { quizID } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    quizState: {
      selectedQuiz,
      isLoaderActive,
      currentQuestionNumber,
      selectedOptions,
    },
    dispatchQuiz,
  } = useQuiz();

  useEffect(() => {
    if (!selectedQuiz) {
      dispatchQuiz({
        type: QUIZ_ACTIONS.SET_SELECTED_QUIZ_ID,
        payload: { quizID },
      });
    }
  }, [quizID, selectedQuiz, dispatchQuiz]);

  const { quizTitle, quizQuestions } = selectedQuiz ?? {};
  const { question, options } =
    selectedQuiz?.quizQuestions[currentQuestionNumber - 1] ?? {};

  const optionClickHandler = async (answer) => {
    if (currentQuestionNumber < quizQuestions.length) {
      dispatchQuiz({ type: QUIZ_ACTIONS.INCREMENT_QUESTION_NUMBER });
    }

    if ([...selectedOptions, answer].length !== quizQuestions.length) {
      dispatchQuiz({
        type: QUIZ_ACTIONS.ADD_ANSWER_TO_SELECTED_OPTIONS,
        payload: { answer },
      });
    } else {
      const newResultDocumentRef = doc(collection(db, 'results'));
      const res = setDoc(newResultDocumentRef, {
        userID: user?.uid,
        questions: quizQuestions,
        selectedOptions: [...selectedOptions, answer],
      });
      toast.promise(res, {
        loading: 'Submitting Quiz',
        success: 'Successfuly submitted',
        error: 'Failed in submitting quiz',
      });
      await res;
      dispatchQuiz({ type: QUIZ_ACTIONS.RESET_QUIZ_STATE });
      navigate(`/results/${newResultDocumentRef.id}`, { replace: true });
    }
  };

  return (
    <div>
      {isLoaderActive && (
        <div className='m-xl-tb'>
          <Spinner />
        </div>
      )}
      {selectedQuiz && (
        <div className='quiz-container'>
          <h1 className='text-xl text-center m-sm-tb'>{quizTitle}</h1>
          <div className='quiz-card'>
            <div className='quiz-status m-md-tb'>
              <div className='question-status'>
                Question{' '}
                <span className='text-highlight'>
                  {currentQuestionNumber} / {quizQuestions.length}
                </span>
              </div>
              <div className='score-status'>
                TIMER: <span className='text-highlight'>30</span>
              </div>
            </div>
            <h2 className='text-base text-center question m-lg-tb'>
              {question}
            </h2>
            <div className='options m-xs-b'>
              {options.map((option) => {
                return (
                  <button
                    onClick={() => optionClickHandler(option)}
                    className='option btn btn-secondary m-xs-tb'
                    key={option}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
