const NEW_LOGIN = 'NEW_LOGIN';
const NEW_ENTRY = 'NEW_ENTRY';
const RECEIVE_API = 'RECEIVE_API';

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

export const newEntry = (entry) => {
  const action = {
    type: NEW_ENTRY,
    entry,
  };

  return action;
};

export { NEW_ENTRY, NEW_LOGIN, RECEIVE_API };
