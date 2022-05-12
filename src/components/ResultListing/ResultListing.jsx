import { getOptionBackground } from '../../utils';

export const ResultListing = ({ resultData }) => {
  return (
    <div className='quiz-container'>
      {resultData?.questions.map(
        ({ questionID, question, questionIMG, options, answer }, index) => {
          const selectedOption = resultData?.selectedOptions[index];
          return (
            <div className='result-card m-sm-tb' key={questionID}>
              <h2 className='text-center text-base m-sm-tb'>
                {questionID}: {question}
              </h2>
              {!selectedOption && (
                <p className='text-center m-sm-tb'>(not attempted)</p>
              )}
              {questionIMG && (
                <img
                  className='question-img'
                  src={questionIMG}
                  alt='question img'
                />
              )}
              {options.map((option) => {
                return (
                  <button
                    style={{
                      backgroundColor: getOptionBackground({
                        answer,
                        selectedOption,
                        option,
                      }),
                    }}
                    key={option}
                    className='option btn btn-secondary m-xs-tb'
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          );
        }
      )}
    </div>
  );
};
