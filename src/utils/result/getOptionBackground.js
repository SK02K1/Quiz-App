export const getOptionBackground = ({ option, selectedOption, answer }) => {
  return Boolean(selectedOption)
    ? option === selectedOption
      ? selectedOption === answer
        ? 'green'
        : 'red'
      : option === answer
      ? 'green'
      : 'gray'
    : option === answer
    ? 'green'
    : 'gray';
};
