// Code for creating the Redux store - version 1 - without Redux Toolkit.  
// Note this file is not being imported anywhere, it is just here for educational purposes.

// Code for creating the Redux store with the help of the createStore function from Redux. 
// The store is created by combining the reducers and applying the middleware. 
// The composeWithDevTools function is used to enable the Redux DevTools extension in the browser.

import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import accountReducer from "../features/accounts/accountSlice";
import customerReducer from "../features/customers/customerSlice";


const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
