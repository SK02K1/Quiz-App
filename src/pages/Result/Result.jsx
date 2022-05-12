import './Result.css';
import React, { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { getFinalScore } from '../../utils';
import { Spinner, ResultListing } from '../../components';
import { db } from '../../firebase';

export const Result = () => {
  const [resultData, setResultData] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const { resultID } = useParams();

  useEffect(() => {
    (async () => {
      setShowLoader(true);
      try {
        const res = await getDoc(doc(db, 'results', resultID));
        setResultData(res.data());
      } catch (error) {
        console.log(error.message);
      } finally {
        setShowLoader(false);
      }
    })();
  }, [resultID]);

  const totalScore = getFinalScore(resultData);

  return (
    <div>
      <h1 className='text-center text-xl m-md-tb'>Result</h1>
      {showLoader && <Spinner />}
      {resultData && (
        <>
          <h2 className='text-center m-md-tb text-xl'>
            Final Score: <span className='text-highlight'>{totalScore}</span>
          </h2>
          <ResultListing resultData={resultData} />
        </>
      )}
    </div>
  );
};
