import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
}

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return { ...state, fullName: action.payload.fullName, nationalId: action.payload.nationalId, createdAt: action.payload.createdAt };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }

}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 700 });

// console.log(store.getState());

// store.dispatch({ type: "account/withdraw", payload: 50 });

// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 500, purpose: "Vacation" },
// });

// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });

// console.log(store.getState());

// Account action creator functions
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
function payLoan() {
  return { type: "account/payLoan" };
}

// Customer action creator functions
function createCustomer(fullName, nationalId) {
  return { type: "customer/createCustomer", payload: { fullName, nationalId, createdAt: new Date().toISOString() } };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(deposit(700));
console.log(store.getState());

store.dispatch(withdraw(400));
console.log(store.getState());

store.dispatch(requestLoan(1000, "Buy a new car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

store.dispatch(createCustomer("John Doe", "123456789"));
console.log(store.getState());

store.dispatch(updateName("Marsellus Wallace"));
console.log(store.getState());
