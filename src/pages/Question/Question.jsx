import './Question.css';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth, useQuiz } from '../../contexts';
import { QUIZ_ACTIONS } from '../../utils';
import { Spinner } from '../../components';
import { submitQuiz } from '../../services';

export const Question = () => {
  const { quizID } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  let isMounted = false;

  const {
    quizState: {
      selectedQuiz,
      isLoaderActive,
      currentQuestionNumber,
      selectedOptions,
      timer,
    },
    dispatchQuiz,
  } = useQuiz();

  useEffect(() => {
    const id = setInterval(() => {
      dispatchQuiz({ type: QUIZ_ACTIONS.DECREMENT_TIMER_VALUE });
    }, 1000);

    if (timer === 0) {
      if (currentQuestionNumber < quizQuestions.length) {
        clearInterval(id);
        dispatchQuiz({
          type: QUIZ_ACTIONS.ADD_ANSWER_TO_SELECTED_OPTIONS,
          payload: { answer: null },
        });
        dispatchQuiz({ type: QUIZ_ACTIONS.INCREMENT_QUESTION_NUMBER });
        dispatchQuiz({ type: QUIZ_ACTIONS.RESET_TIMER_VALUE });
      } else {
        (async () => {
          clearInterval(id);
          submitQuiz({
            user,
            selectedOptions,
            answer: null,
            navigate,
            quizQuestions,
          });
        })();
      }
    }

    return () => {
      clearInterval(id);
    };
  }, [timer]);

  useEffect(() => {
    if (!selectedQuiz) {
      dispatchQuiz({
        type: QUIZ_ACTIONS.SET_SELECTED_QUIZ_ID,
        payload: { quizID },
      });
    }
  }, [quizID, selectedQuiz, dispatchQuiz]);

  useEffect(() => {
    return () => {
      if (isMounted) {
        dispatchQuiz({ type: QUIZ_ACTIONS.RESET_QUIZ_STATE });
      }
      isMounted = true;
    };
  }, []);

  const { quizTitle, quizQuestions } = selectedQuiz ?? {};
  const { question, options, questionIMG } =
    selectedQuiz?.quizQuestions[currentQuestionNumber - 1] ?? {};

  const optionClickHandler = async (answer) => {
    if (currentQuestionNumber < quizQuestions.length) {
      dispatchQuiz({ type: QUIZ_ACTIONS.INCREMENT_QUESTION_NUMBER });
      dispatchQuiz({ type: QUIZ_ACTIONS.RESET_TIMER_VALUE });
    }

    if ([...selectedOptions, answer].length !== quizQuestions.length) {
      dispatchQuiz({
        type: QUIZ_ACTIONS.ADD_ANSWER_TO_SELECTED_OPTIONS,
        payload: { answer },
      });
    } else {
      submitQuiz({
        user,
        selectedOptions,
        answer,
        navigate,
        quizQuestions,
      });
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
              <div className='timer-status'>
                <span>TIMER</span>
                <span className='material-symbols-rounded m-xs-lr'>
                  timer
                </span>{' '}
                :<span className='text-highlight m-xs-l'>{timer}</span>
              </div>
            </div>
            <h2 className='text-base text-center question m-lg-tb'>
              {question}
            </h2>
            {questionIMG && (
              <img
                className='question-img'
                src={questionIMG}
                alt='question img'
              />
            )}
            <div className='options m-xs-tb'>
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
