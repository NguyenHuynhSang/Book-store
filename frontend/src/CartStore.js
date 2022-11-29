import { createContext, useReducer } from 'react';
import { ReactSession } from 'react-client-session';

const Store = createContext();
ReactSession.setStoreType('localStorage');

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

      const cart = { ...state.cart, Items };
      ReactSession.set('cart', cart);
      return {
        ...state,
        cart: cart,
      };
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
