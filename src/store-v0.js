import { createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function reducerAccount(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;

      return {
        ...state,
        loan: action.payload.loan,
        loanPurpose: action.payload.purpose,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        balance: state.balance + state.loan,
        loanPurpose: "",
      };

    default:
      return state;
  }
}

const store = createStore(reducerAccount);

// store.dispatch({ type: "account/deposit", payload: 1000 });
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 500 });
// console.log(store.getState());
// store.dispatch({
//   type: "account/requestLoan",
//   payload: {
//     loan: 300,
//     purpose: "need to buy a car",
//   },
// });
// console.log(store.getState());

// store.dispatch({
//   type: "account/payLoan",
//   payload: {
//     loan: 0,
//     purpose: "",
//   },
// });
// console.log(store.getState());

// export default store;

//action creators

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(loanAmount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      loan: loanAmount,
      purpose: purpose,
    },
  };
}

function payLoan() {
  return {
    type: "account/payLoan",
    payload: {
      loan: 0,
      purpose: "",
    },
  };
}

store.dispatch(deposit(1000));
console.log(store.getState());

store.dispatch(withdraw(500));
console.log(store.getState());

store.dispatch(requestLoan(500));
console.log(store.getState());

store.dispatch(payLoan(500));
console.log(store.getState());
