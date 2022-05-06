import './CategoryCard.css';

export const CategoryCard = ({ categoryInfo }) => {
  const { categoryName, categoryImg } = categoryInfo;
  return (
    <div className='category-card'>
      <div className='overlay'>
        <h2 className='overlay-header m-md-tblr text-2xl'>{categoryName}</h2>
      </div>
      <img className='category-card-img' src={categoryImg} alt={categoryName} />
    </div>
  );
};
