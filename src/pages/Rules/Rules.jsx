import './Rules.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuiz } from '../../contexts';
import { QUIZ_ACTIONS } from '../../utils';
import { Spinner } from '../../components';

export const Rules = () => {
  const { quizID } = useParams();

  const {
    quizState: { selectedQuiz, isLoaderActive },
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

  return (
    <div>
      {isLoaderActive && (
        <div className='m-xl-tb'>
          <Spinner />
        </div>
      )}
      {selectedQuiz && (
        <div className='rules-wrapper'>
          <h2 className='text-xl'>Instructions</h2>
          {selectedQuiz?.quizRules.map((rule) => {
            return (
              <p className='text-base m-sm-tb' key={rule}>
                {rule}
              </p>
            );
          })}
          <p className='text-base m-sm-tb'>
            To start, click the "Start" button.
          </p>
          <button className='btn btn-primary'>Start</button>
        </div>
      )}
    </div>
  );
};
