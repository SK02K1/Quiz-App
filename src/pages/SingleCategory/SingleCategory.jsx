import './SingleCategory.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { Spinner, QuizDetailsCard } from '../../components';
import { db } from '../../firebase';
import { useDocumentTitle } from '../../hooks';

export const SingleCategory = () => {
  const [quizzes, setQuizzes] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get('category');
  const categoryID = searchParams.get('categoryID');
  useDocumentTitle(categoryName);

  useEffect(() => {
    const quizzesQuery = query(
      collection(db, 'quizzes'),
      where('categoryID', '==', categoryID)
    );

    (async () => {
      setShowLoader(true);
      try {
        const res = await getDocs(quizzesQuery);
        setQuizzes(
          res.docs.map((quizDocument) => ({
            id: quizDocument.id,
            ...quizDocument.data(),
          }))
        );
      } catch (error) {
        console.error(error.message);
      } finally {
        setShowLoader(false);
      }
    })();
  }, [categoryID]);

  return (
    <div>
      <h1 className='text-center text-xl m-md-tb'>{categoryName}</h1>
      {showLoader && <Spinner />}
      {quizzes && (
        <div className='quiz-list-wrapper'>
          {quizzes.map((quizDetails) => (
            <QuizDetailsCard key={quizDetails.id} quizDetails={quizDetails} />
          ))}
        </div>
      )}
    </div>
  );
};
