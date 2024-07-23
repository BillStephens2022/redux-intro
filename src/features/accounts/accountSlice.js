// createSlice is a function that accepts an initial state, an object full of reducer functions, and a "slice name",
// and automatically generates action creators and action types that correspond to the reducers and state.
// Redux toolkit actually allows us to mutate state directly in the reducers, as it uses Immer under the hood
// to allow for this.  This was not permitted without use of the Redux Toolkit.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      // prepare is a function that allows us to pass in multiple 
      // arguments (i.e. amount, purpose) to the action creator
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
      if (state.loan > 0) return;
      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.purpose;
      state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { deposit, withdraw, requestLoan, payLoan, convertingCurrency } = accountSlice.actions;
export default accountSlice.reducer;

// Commented out the old reducer function, before using createSlice from Redux Toolkit.
// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return { ...state, balance: state.balance + action.payload, isLoading: false };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === "USD") {
//     return { type: "account/deposit", payload: amount };;
//   }
//   return async (dispatch, getState) => {
//     // API Call to convert currency to USD
//     dispatch({ type: "account/convertingCurrency" });
//     const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
//     const data = await res.json();
//     const convertedAmount = data.rates.USD;
//     // return action
//     dispatch({ type: "account/deposit", payload: convertedAmount });
//   };
// }

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return { type: "account/requestLoan", payload: { amount, purpose } };
// }

// export function payLoan() {
//   return { type: "account/payLoan" };
// }
