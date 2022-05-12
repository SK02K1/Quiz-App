export const getFinalScore = (resultData) =>
  resultData?.selectedOptions.reduce(
    (finalScore, selectedOption, index) =>
      selectedOption === resultData?.questions[index].answer
        ? finalScore + 5
        : finalScore,
    0
  );
