import {
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAILURE,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAILURE,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAILURE,
  CLEAR_ERRORS,
} from "../Constants/productConstant";
import axios from "axios"

export const createNewProduct = (productData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_PRODUCT_REQUEST,
    });
    const data = await fetch(`https://localhost:7283/api/Product/create`, {
      method: "POST",
      headers: {
        // 'Content-Type': 'application/json'
      },
      body: productData,
    });
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAILURE,
      payload: error.response.data.message,
    });
  }
};
export const getProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCTS_REQUEST,
    });
    const response = await fetch(`https://localhost:7283/api/Product/all`, {
      method: "GET",
    });
    
    const data = await response.json(); 
    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: {products : data},
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAILURE,
      payload: error.response.data.message,
    });
  }
};
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCTS_DETAILS_REQUEST,
        })
        const response = await fetch(`https://localhost:7283/api/Product/${id}` , {
          method : "GET"
        })
        const data = await response.json()
        dispatch({
            type: PRODUCTS_DETAILS_SUCCESS,
            payload: {product : data.product}
        })
    } catch (error) {
        dispatch({
            type: PRODUCTS_DETAILS_FAILURE,
            payload: error.response.data.message,
        })
    }
}

export const clearErros = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
