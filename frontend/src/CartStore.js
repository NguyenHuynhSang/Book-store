import { createContext, useReducer } from 'react';

const Store = createContext();

const intialState = {
  cart: {
    Items: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      return {
        ...state,
        cart: { ...state.cart, Items: [...state.cart.Items, action.payload] },
      };
    }
    default: {
      return state;
    }
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, intialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
export default Store;
