// Store created using Redux Toolkit
// compare to store-v1.js which is created using createStore function from Redux.
// note that the code is simpler and more readable using Redux Toolkit.

import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/accounts/accountSlice";
import customerReducer from "../features/customers/customerSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;