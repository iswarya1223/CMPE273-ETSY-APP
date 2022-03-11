import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
  } from "../constants/cartConstants";
  import axios from "axios";
  
  // Adding the productdetails to Cart
  export const addItemsToCart = (productid, quantity) => async (dispatch, getState) => {
    const {data} = await axios.get("http://localhost:5000/api/profile/getProductDetails/"+productid);;
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        productid: data.results[0].productid,
        productname: data.results[0].productname,
        price: data.results[0].price,
        image_URL: data.results[0].image_URL,
        stock: data.results[0].stock,
        currency: data.results[0].currency,
        quantity,
      },
    });
    
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

  export const removeItemsFromCart = (productid) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: productid,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };