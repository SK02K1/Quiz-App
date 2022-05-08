import './QuizDetailsCard.css';
import { Link } from 'react-router-dom';

export const QuizDetailsCard = ({ quizDetails }) => {
  const { quizTitle, quizIMG, quizDescription } = quizDetails;
  return (
    <div className='quiz-info-card'>
      <img src={quizIMG} alt={quizTitle} className='info-card-img img-res' />
      <div className='info-card-content'>
        <h2 className='text-xl'>{quizTitle}</h2>
        <p className='text-base m-sm-tb'>{quizDescription}</p>
        <Link to='/' className='btn btn-primary'>
          Play now
        </Link>
      </div>
    </div>
  );
};
