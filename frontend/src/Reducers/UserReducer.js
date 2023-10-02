export const USER_LIST_REQ = 'USER_LIST_REQ';
export const USER_LIST_SUCC = 'USER_LIST_SUCC';
export const USER_LIST_FAIL = 'USER_GET_FAIL';

export const userListReducer = (state, action) => {
  switch (action.type) {
    case USER_LIST_REQ:
      return { loading: true };
    case USER_LIST_SUCC:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
