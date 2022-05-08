import { useNavigate } from 'react-router-dom';
import './CategoryCard.css';

export const CategoryCard = ({ categoryInfo }) => {
  const { categoryName, categoryImg } = categoryInfo;
  const navigate = useNavigate();
  const navigateToSingleCategory = () => {
    navigate(`/categories/${categoryName}`);
  };
  return (
    <div onClick={navigateToSingleCategory} className='category-card'>
      <div className='overlay'>
        <h2 className='overlay-header m-md-tblr text-2xl'>{categoryName}</h2>
      </div>
      <img className='category-card-img' src={categoryImg} alt={categoryName} />
    </div>
  );
};
