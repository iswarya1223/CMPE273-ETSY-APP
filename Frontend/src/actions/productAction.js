import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS,
} from "../constants/productConstants";

export const getProduct =
  (keyword,price=[0,250],sortType='price',outOfStock=0) =>
  async (dispatch) => {
    //console.log("the one value" +one);
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      console.log("the keyword is ", +keyword);
      //let temp = "temp";
      console.log("in actions",outOfStock);
      const body= {min_price:price[0],max_price:price[1],sortType: sortType,outOfStock: outOfStock};
      const body1 =JSON.stringify(body);
      const res = await axios.post("http://localhost:5000/api/profile/getSearchDetails/" +keyword,body);
      console.log("received data" + res.data.results);
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: res.data.results,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const getProductDetails = (productid) => async (dispatch) => {
    //const body = JSON.stringify({productid});
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
  
      const {data} = await axios.get("http://localhost:5000/api/profile/getProductDetails/"+productid);
  
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.results[0], 
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
