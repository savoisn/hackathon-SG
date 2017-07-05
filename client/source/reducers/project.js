import * as cst from '../constants/project';

export default function reducer(state = [], action) {
  switch (action.type) {
    case cst.GET_PROJECT_SUCCESS: {
      return action.payload;
    }
    case cst.CREATE_PROJECT_SUCCESS: {
      return [...state, ...action.payload];
    }
    default:
      return state;
  }
}
