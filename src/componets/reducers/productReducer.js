import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAILURE,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAILURE,
  NEW_PRODUCT_RESET,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAILURE,
  CLEAR_ERRORS,
} from "../Constants/productConstant";

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload.product,
      };
    case NEW_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const productReducer = (state = {products : []} , action) =>{
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return { 
        loading : true,
        products:[]
      };
    case ALL_PRODUCTS_SUCCESS : 
    return{
      loading : false ,
      products : action.payload.products,
    }
    case ALL_PRODUCTS_FAILURE :
      return {
        loading : false,
        error : action.payload
      }
      case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
  }
}
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
      case PRODUCTS_DETAILS_REQUEST:
          return {
              loading: true,
              ...state
          };
      case PRODUCTS_DETAILS_SUCCESS:
          return {
              loading: false,
              product: action.payload
          };
      case PRODUCTS_DETAILS_FAILURE:
          return {
              loading: false,
              error: action.payload
          }
      case CLEAR_ERRORS:
          return {
              ...state,
              error: null
          }
      default:
          return state;
  }
}