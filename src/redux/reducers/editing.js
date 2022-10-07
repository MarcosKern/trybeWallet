import { EDIT } from '../actions';

const INITIAL_STATE = { edit: false };

function editing(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EDIT:
    return { ...state, edit: action.edit };
  default:
    return state;
  }
}

export default editing;
