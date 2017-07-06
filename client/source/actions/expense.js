import cst from '../constants/expense';
import { request } from './networking';
import { push } from 'react-router-redux'

const createExpenseSuccess = payload => ({ type: cst.CREATE_EXPENSE_SUCCESS, payload });

const createExpenseError = payload => ({ type: cst.CREATE_EXPENSE_ERROR, payload });

const getExpenseSuccess = payload => ({ type: cst.GET_EXPENSE_SUCCESS, payload });

const getExpenseError = payload => ({ type: cst.GET_EXPENSE_ERROR, payload });

const getExpenseRecipientSuccess = payload => ({ type: cst.GET_EXPENSE_RECIPIENT_SUCCESS, payload });

const getExpenseRecipientError = payload => ({ type: cst.GET_EXPENSE_RECIPIENT_ERROR, payload });

export const createExpense = (
  selectedUsers,
  name,
  date,
  amount,
  payer,
) => {
  const expense = {
    name,
    date,
    amount,
    settled: false,
    PayerId: payer,
    projectId: 1,
  };

  return dispatch => dispatch(request(
    'api/expenses',
    { method: 'POST', body: JSON.stringify(expense) },
  ))
  .then(res => {
    const expenseid = res.data.id;
    const promises = selectedUsers.map((recipientid) => {
      return new Promise ((resolve, reject) => {
        const exrc = {
          recipientId: recipientid,
          expenseId: expenseid,
        }
        dispatch(request(`api/ExpenseRecipients`,
          { method: 'POST', body: JSON.stringify(exrc) }))
        .then(res => resolve(res))
        .catch(err => reject(err))
      }
    )
    })
    Promise.all(promises)
  })
  .then(res => dispatch(createExpenseSuccess()))
  .then(() => {
    dispatch(push('/activity'));
  })
  .catch(error => {console.log(error); dispatch(createExpenseError(error))});
}

export const getExpense = () => {
  return dispatch => dispatch(request('api/expenses'))
  .then(res => dispatch(getExpenseSuccess(res.data)))
  .catch(error => dispatch(getExpenseError(error)));
}

export const getExpenseRecipient = (expenseId) => {
  return dispatch => dispatch(request(`api/expenses/${expenseId}/recipients`))
  .then(res => dispatch(getExpenseRecipientSuccess(res.data)))
  .catch(error => dispatch(getExpenseRecipientError(error)));
}
