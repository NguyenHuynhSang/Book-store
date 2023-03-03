import { createContext, useReducer } from 'react';
import { ReactSession } from 'react-client-session';
import { toast } from 'react-toastify';

// create a context to share state
const Store = createContext();
ReactSession.setStoreType('localStorage');

const intialState = {
  cart: {
    Items: localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [],
  },
  loggedUser: localStorage.getItem('loggedUser')
    ? JSON.parse(localStorage.getItem('loggedUser'))
    : {},
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
      toast('Added ' + newItem.name + ' to cart!', {
        position: 'bottom-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
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
    case 'USER_LOGGEDIN': {
      return { ...state, loggedUser: action.payload };
    }
  }
};

// create a reducer to update state
export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, intialState);
  let value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
export default Store;
