import './Rules.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useQuiz } from '../../contexts';
import { QUIZ_ACTIONS } from '../../utils';
import { Spinner } from '../../components';

export const Rules = () => {
  const { quizID } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const {
    quizState: { selectedQuiz },
    dispatchQuiz,
  } = useQuiz();

  useEffect(() => {
    if (!selectedQuiz) {
      (async () => {
        setShowLoader(true);
        try {
          const res = await getDoc(doc(db, 'quizzes', quizID));
          dispatchQuiz({
            type: QUIZ_ACTIONS.SET_SELECTED_QUIZ,
            payload: { quizDetails: res.data() },
          });
        } catch (error) {
          console.log(error);
        } finally {
          setShowLoader(false);
        }
      })();
    }
  }, []);

  return (
    <div>
      {showLoader && (
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
