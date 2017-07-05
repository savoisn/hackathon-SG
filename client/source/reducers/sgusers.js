import * as cst from '../constants/sgusers';

export default function reducer(state = [], action) {
  switch (action.type) {
    case cst.GET_USERS_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
}
