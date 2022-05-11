import { QUIZ_ACTIONS } from '../utils';

export const quizReducer = (state, { type, payload }) => {
  switch (type) {
    case QUIZ_ACTIONS.SET_SELECTED_QUIZ:
      return { ...state, selectedQuiz: payload.quizDetails };
    case QUIZ_ACTIONS.SET_SELECTED_QUIZ_ID:
      return { ...state, selectedQuizID: payload.quizID };
    case QUIZ_ACTIONS.SHOW_LOADER:
      return { ...state, isLoaderActive: true };
    case QUIZ_ACTIONS.HIDE_LOADER:
      return { ...state, isLoaderActive: false };
    case QUIZ_ACTIONS.INCREMENT_QUESTION_NUMBER:
      return {
        ...state,
        currentQuestionNumber: state.currentQuestionNumber + 1,
      };
    case QUIZ_ACTIONS.ADD_ANSWER_TO_SELECTED_OPTIONS:
      return {
        ...state,
        selectedOptions: state.selectedOptions.concat(payload.answer),
      };
    case QUIZ_ACTIONS.RESET_QUIZ_STATE:
      return { ...state, selectedOptions: [], currentQuestionNumber: 1 };
    default:
      return { ...state };
  }
};
