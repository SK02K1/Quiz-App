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
    default:
      return { ...state };
  }
};
