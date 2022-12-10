import { createContext, useReducer } from 'react';
import { ReactSession } from 'react-client-session';
import { json } from 'react-router-dom';

const Store = createContext();
ReactSession.setStoreType('localStorage');

const intialState = {
  cart: {
    Items: localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.Items.find((x) => x._id === newItem._id);

      const Items = existItem
        ? state.cart.Items.map((x) => (x._id === existItem._id ? newItem : x))
        : [...state.cart.Items, newItem];

      const cart = { ...state.cart, Items };
      localStorage.setItem('cart', JSON.stringify(Items));
      return {
        ...state,
        cart: cart,
      };
    }
    case 'REMOVE_ITEM': {
      const list = state.cart.Items.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cart', JSON.stringify(list));
      return { ...state, cart: { ...state.cart, Items: list } };
    }
    default: {
      return state;
    }
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, intialState);
  let value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
export default Store;
