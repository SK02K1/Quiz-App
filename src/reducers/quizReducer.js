import { QUIZ_ACTIONS } from '../utils';

export const quizReducer = (state, { type, payload }) => {
  switch (type) {
    case QUIZ_ACTIONS.SET_SELECTED_QUIZ:
      return { ...state, selectedQuiz: payload.quizDetails };
    default:
      return { ...state };
  }
};
