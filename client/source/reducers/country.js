import * as cst from '../constants/country';

export default function reducer(state = [], action) {
  switch (action.type) {
    case cst.GET_COUNTRY_SUCCESS: {
      return action.payload;
    }
    case cst.CREATE_COUNTRY_SUCCESS: {
      return [...state, ...action.payload];
    }
    default:
      return state;
  }
}
