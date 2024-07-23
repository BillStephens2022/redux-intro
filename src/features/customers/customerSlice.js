// createSlice is a function that accepts an initial state, an object full of reducer functions, and a "slice name",
// and automatically generates action creators and action types that correspond to the reducers and state.
// Redux toolkit actually allows us to mutate state directly in the reducers, as it uses Immer under the hood
// to allow for this.  This was not permitted without use of the Redux Toolkit.
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      // prepare is a function that allows us to pass in multiple 
      // arguments (i.e. amount, purpose) to the action creator
      prepare(fullName, nationalId) {
        return { payload: { fullName, nationalId, createdAt: new Date().toISOString() } };
      },
      reducer(state, action) {
      state.fullName = action.payload.fullName;
      state.nationalId = action.payload.nationalId;
      state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;


// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalId: action.payload.nationalId,
//         createdAt: action.payload.createdAt,
//       };
//     case "customer/updateName":
//       return { ...state, fullName: action.payload };
//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, nationalId) {
//   return {
//     type: "customer/createCustomer",
//     payload: { fullName, nationalId, createdAt: new Date().toISOString() },
//   };
// }

// export function updateName(fullName) {
//   return { type: "customer/updateName", payload: fullName };
// }
