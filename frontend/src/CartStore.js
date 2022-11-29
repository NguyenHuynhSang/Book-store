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
      const newItem = action.payload;
      const existItem = state.cart.Items.find((x) => x.id === newItem.id);

      const Items = existItem
        ? state.cart.Items.map((x) => (x.id === existItem.id ? newItem : x))
        : [...state.cart.Items, newItem];

      return {
        ...state,
        cart: { ...state.cart, Items },
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
