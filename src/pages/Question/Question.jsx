import './Question.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuiz } from '../../contexts';
import { QUIZ_ACTIONS } from '../../utils';
import { Spinner } from '../../components';

export const Question = () => {
  const { quizID } = useParams();

  const {
    quizState: {
      selectedQuiz,
      isLoaderActive,
      currentQuizScore,
      currentQuestionNumber,
    },
    dispatchQuiz,
  } = useQuiz();

  const { quizTitle, quizQuestions } = selectedQuiz ?? {};
  const { question, options } =
    selectedQuiz?.quizQuestions[currentQuestionNumber - 1] ?? {};

  useEffect(() => {
    if (!selectedQuiz) {
      dispatchQuiz({
        type: QUIZ_ACTIONS.SET_SELECTED_QUIZ_ID,
        payload: { quizID },
      });
    }
  }, [quizID, selectedQuiz, dispatchQuiz]);

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
                SCORE:{' '}
                <span className='text-highlight'>{currentQuizScore}</span>
              </div>
            </div>
            <h2 className='text-base text-center question m-lg-tb'>
              {question}
            </h2>
            <div className='options m-xs-b'>
              {options.map((option) => {
                return (
                  <button
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
