import React from 'react';
import { useParams } from 'react-router-dom';

export const Result = () => {
  const { resultID } = useParams();
  return (
    <div>
      <h1 className='text-center text-xl m-md-tb'>Result Page</h1>
      <p className='text-center m-xs-tb'>{resultID}</p>
    </div>
  );
};
