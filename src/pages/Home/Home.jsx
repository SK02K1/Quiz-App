import './Home.css';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useCategories } from '../../contexts';
import { CategoryCard, Spinner } from '../../components';
import { db } from '../../firebase';
import { useDocumentTitle } from '../../hooks';

export const Home = () => {
  const { categories, setCategories } = useCategories();
  useDocumentTitle('Home');

  useEffect(() => {
    if (!categories) {
      (async () => {
        try {
          const categoryCollection = await getDocs(
            collection(db, 'categories')
          );
          setCategories(
            categoryCollection.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          );
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [categories, setCategories]);

  return (
    <div>
      <h1 className='text-center text-xl m-md-tb'>Featured Categories</h1>
      {!categories && <Spinner />}
      {categories && (
        <div className='grid-container auto'>
          {categories.map((categoryInfo) => (
            <CategoryCard key={categoryInfo.id} categoryInfo={categoryInfo} />
          ))}
        </div>
      )}
    </div>
  );
};
