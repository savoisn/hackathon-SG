import cst from '../constants/project';
import { request } from './networking';

const createProjectSuccess = payload => ({ type: cst.CREATE_PROJECT_SUCCESS, payload });
const createProjectError = payload => ({ type: cst.CREATE_PROJECT_ERROR, payload });

const getProjectSuccess = payload => ({ type: cst.GET_PROJECT_SUCCESS, payload });
const getProjectError = payload => ({ type: cst.GET_PROJECT_ERROR, payload });

export const createProject = (data) => {
  return dispatch => dispatch(request(
    'api/Projects',
    { method: 'POST', body: JSON.stringify(data) },
  ))
  .then(res => dispatch(createProjectSuccess(res.data)))
  .catch(error => dispatch(createProjectError(error)));
}

export const getProject = () => {
  return dispatch => dispatch(request('api/Projects'))
  .then(res => dispatch(getProjectSuccess(res.data)))
  .catch(error => dispatch(getProjectError(error)));
}
