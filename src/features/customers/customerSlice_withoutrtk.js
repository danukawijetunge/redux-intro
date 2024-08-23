const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
  updatedAt: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt,
      };
    case "customer/updateFullName":
      return {
        ...state,
        fullName: action.payload.fullName,
        updatedAt: action.payload.updatedAt,
      };
    default:
      return state;
  }
}

export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName: fullName,
      nationalID: nationalID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
}

export function updateName(fullName) {
  return {
    type: "customer/updateFullName",
    payload: {
      fullName: fullName,
      updatedAt: new Date().toISOString(),
    },
  };
}
