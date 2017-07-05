import cst from '../constants/sgusers';
import { request } from './networking';


const getSgUsersSuccess = payload => ({ type: cst.GET_USERS_SUCCESS, payload });

const getSgUsersError = payload => ({ type: cst.GET_USERS_ERROR, payload });

export const getSgUsers = () => {
  return dispatch => dispatch(request('api/sgusers'))
  .then(res => dispatch(getSgUsersSuccess(res.data)))
  .catch(error => dispatch(getSgUsersError(error)));
}

