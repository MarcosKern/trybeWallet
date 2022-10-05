import { RECEIVE_API, NEW_ENTRY } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVE_API:
    return {
      currencies: action.currencies,
    };
  case NEW_ENTRY:
    return {
      ...state,
      expenses: action.entry,
    };
  default:
    return state;
  }
}

export default wallet;
