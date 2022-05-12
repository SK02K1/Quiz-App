import './QuizDetailsCard.css';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../contexts';
import { QUIZ_ACTIONS } from '../../utils';

export const QuizDetailsCard = ({ quizDetails }) => {
  const { id, quizTitle, quizIMG, quizDescription } = quizDetails;
  const { dispatchQuiz } = useQuiz();
  const navigate = useNavigate();

  const playBtnHandler = () => {
    dispatchQuiz({
      type: QUIZ_ACTIONS.SET_SELECTED_QUIZ,
      payload: { quizDetails },
    });
    navigate(`/rules/${id}`);
  };

  return (
    <div className='quiz-info-card'>
      <img src={quizIMG} alt={quizTitle} className='info-card-img img-res' />
      <div className='info-card-content'>
        <h2 className='text-xl'>{quizTitle}</h2>
        <p className='text-base m-sm-tb'>{quizDescription}</p>
        <button onClick={playBtnHandler} className='btn btn-primary'>
          Play now
        </button>
      </div>
    </div>
  );
};
