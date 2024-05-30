import {
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAILURE,
    CLEAR_ERRORS,
  } from "../Constants/productConstant"

export const createNewProduct = (productData) => async(dispatch) =>{
    try {
        dispatch({
            type : NEW_PRODUCT_REQUEST
        })
        const data = await fetch(`https://localhost:7283/api/Product/create`,{
            method :"POST",
            headers :{
                // 'Content-Type': 'application/json'
            },
            body : productData
        })
        dispatch({
            type : NEW_PRODUCT_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAILURE,
            payload: error.response.data.message,
        })
    }
}

export const clearErros = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}