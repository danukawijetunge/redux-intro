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
      prepare(amount, purpose) {
        return {
          payload: {
            amount,
            purpose,
          },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        console.log(JSON.stringify(action));

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;

        state.balance = action.payload.amount + state.balance;
      },
    },
    payLoan(state) {
      console.log("inside the payLoan", state.balance - state.loan);
      let currentBalance = state.balance - state.loan;
      state.loan = 0;
      state.balance = currentBalance;
    },
    convertingCurruncy(state) {
      state.isLoading = true;
    },
  },
});

console.log("accountSlice", accountSlice);

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;

// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       console.log("inside the switch case");
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: action.payload.amount + state.balance,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         balance: state.balance - state.loan,
//       };
//     case "account/convertingCurruncy":
//       return {
//         ...state,
//         isLoading: action.payload.isLoading,
//       };
//     default:
//       return state;
//   }
// }

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // before storing in the store, it will make the api call
  return async function (dispatch, getState) {
    //before fetching
    dispatch({
      type: "account/convertingCurruncy",
      payload: { isLoading: true },
    });

    const host = "api.frankfurter.app";
    let response = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await response.json();
    const convertedAmount = data.rates.USD;

    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

// export function withdraw(widthdrawAmount) {
//   return { type: "account/withdraw", payload: widthdrawAmount };
// }

// export function requestLoan(loanAmount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: {
//       amount: loanAmount,
//       purpose: purpose,
//     },
//   };
// }

// export function payLoan(payAmount) {
//   return { type: "account/payLoan", payload: 5000 };
// }
