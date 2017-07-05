import cst from '../constants/country';
import { request } from './networking';

const createCountrySuccess = payload => ({ type: cst.CREATE_COUNTRY_SUCCESS, payload });
const createCountryError = payload => ({ type: cst.CREATE_COUNTRY_ERROR, payload });

const getCountrySuccess = payload => ({ type: cst.GET_COUNTRY_SUCCESS, payload });
const getCountryError = payload => ({ type: cst.GET_COUNTRY_ERROR, payload });

export const createCountry = (data) => {
  return dispatch => dispatch(request(
    'api/countries',
    { method: 'POST', body: JSON.stringify(data) },
  ))
  .then(res => dispatch(createCountrySuccess(res.data)))
  .catch(error => dispatch(createCountryError(error)));
}

export const getCountry = () => {
  return dispatch => dispatch(request('api/countries'))
  .then(res => dispatch(getCountrySuccess(res.data)))
  .catch(error => dispatch(getCountryError(error)));
}
