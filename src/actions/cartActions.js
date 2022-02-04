import backendAPI from "../apis/backendAPI";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await backendAPI.get(`/products/${id}`);

  const { product } = data;

  dispatch({
    type: ADD_TO_CART,
    payload: {
      ...product,
      qty: quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: {
      id,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const saveShippingAddress = (address) => async (dispatch, getState) => {
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: {
      address: JSON.parse(address),
    },
  });

  localStorage.setItem("shippingAddress", address);
};

export { addToCart, removeFromCart, saveShippingAddress };
