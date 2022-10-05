import { NEW_LOGIN } from '../actions';

const INITIAL_STATE = [];

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case NEW_LOGIN:
    return { ...state, email: action.state };
  default:
    return state;
  }
}

export default user;
