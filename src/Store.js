import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { newProductReducer, productDetailsReducer, productReducer } from "./componets/reducers/productReducer";

const reducer = combineReducers({
  newProducts: newProductReducer,
  products :productReducer,
  productDetails : productDetailsReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
