import { RECEIVE_API, NEW_ENTRY, NEW_VALUE, EDIT_ENTRY } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  totalValue: 0,
  entryesCount: 0,
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
      entryesCount: action.id,
    };
  case EDIT_ENTRY:
    return {
      ...state,
      expenses: action.newExpenses,
    };
  case NEW_VALUE:
    return {
      ...state,
      totalValue: action.totalValue,
    };
  default:
    return state;
  }
}

export default wallet;
