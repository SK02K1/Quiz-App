import { doc, collection, setDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { db } from '../firebase';

export const submitQuiz = async ({
  user,
  selectedOptions,
  answer,
  navigate,
  quizQuestions,
}) => {
  const newResultDocumentRef = doc(collection(db, 'results'));
  const res = setDoc(newResultDocumentRef, {
    userID: user?.uid,
    questions: quizQuestions,
    selectedOptions: [...selectedOptions, answer],
    createAt: serverTimestamp(),
  });
  toast.promise(res, {
    loading: 'Submitting Quiz',
    success: 'Successfuly submitted',
    error: 'Failed in submitting quiz',
  });
  await res;
  navigate(`/results/${newResultDocumentRef.id}`, { replace: true });
};
