import cst from '../constants/expense';
import { request } from './networking';

const createExpenseSuccess = payload => ({ type: cst.CREATE_EXPENSE_SUCCESS, payload });
const createExpenseError = payload => ({ type: cst.CREATE_EXPENSE_ERROR, payload });

const getExpenseSuccess = payload => ({ type: cst.GET_EXPENSE_SUCCESS, payload });
const getExpenseError = payload => ({ type: cst.GET_EXPENSE_ERROR, payload });

export const createExpense = (data) => {
  return dispatch => dispatch(request(
    'api/expenses',
    { method: 'POST', body: JSON.stringify(data) },
  ))
  .then(res => dispatch(createExpenseSuccess(res.data)))
  .catch(error => dispatch(createExpenseError(error)));
}

export const getExpense = () => {
  return dispatch => dispatch(request('api/expenses'))
  .then(res => dispatch(getExpenseSuccess(res.data)))
  .catch(error => dispatch(getExpenseError(error)));
}