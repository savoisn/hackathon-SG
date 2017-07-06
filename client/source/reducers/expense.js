import * as cst from '../constants/expense';

export default function reducer(state = [], action) {
  switch (action.type) {
    case cst.GET_EXPENSE_SUCCESS: {
      return action.payload;
    }
    case cst.CREATE_EXPENSE_SUCCESS: {
      if (action.payload === undefined) {
        return state;
      }
      return [...state, ...action.payload];
    }
    case cst.CREATE_EXPENSE_RECIPIENT_SUCCESS: {
      return [...state, ...action.payload];
    }
    default:
      return state;
  }
}
