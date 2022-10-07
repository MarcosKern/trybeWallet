const NEW_LOGIN = 'NEW_LOGIN';
const NEW_ENTRY = 'NEW_ENTRY';
const RECEIVE_API = 'RECEIVE_API';
const NEW_VALUE = 'NEW_VALUE';
const EDIT = 'EDIT';
const EDIT_ENTRY = 'EDIT_ENTRY';

export const login = (state) => {
  const action = {
    type: NEW_LOGIN,
    state,
  };

  return action;
};

export const receiveApi = (currencies) => {
  const action = {
    type: RECEIVE_API,
    currencies,
  };

  return action;
};

export const newEntry = (entry, id) => {
  const action = {
    type: NEW_ENTRY,
    entry,
    id,
  };

  return action;
};

export const totalExpenses = (totalValue) => {
  const action = {
    type: NEW_VALUE,
    totalValue,
  };

  return action;
};

export const editEntry = (newExpenses) => {
  const action = {
    type: EDIT_ENTRY,
    newExpenses,
  };

  return action;
};

export const isEditing = (edit) => {
  const action = {
    type: EDIT,
    edit,
  };

  return action;
};

export {
  NEW_ENTRY,
  NEW_LOGIN,
  RECEIVE_API,
  NEW_VALUE,
  EDIT,
  EDIT_ENTRY,
};
