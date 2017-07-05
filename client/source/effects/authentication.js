import { push } from 'react-router-redux'

import * as action from '../actions/authentication';
import { request } from '../actions/networking';
import urls from '../constants/url-config';



export const login = credentials =>
  dispatch => {
    let token = '';
    dispatch(request(urls.AUTH_LOGIN, { method: 'POST', body: JSON.stringify(credentials) } ))
    .then((res) => {
      token = res.data.id
      return dispatch(request(urls.AUTH_USER+res.data.userId, { method: 'GET' } ))
    }).then((res) => {
      console.log('res',res);
      res.data.userId = res.data.id;
      res.data.id = token;
      return dispatch(action.login(res.data));
    }).then(() => {
      dispatch(push('/'));
    });
  }

export const logout = () =>
  dispatch =>
    dispatch(request(urls.AUTH, { method: 'DELETE' }))
      .then(() =>
        dispatch(request(urls.AUTH_LOGOUT)),
      )
      .catch(() => {
        dispatch(action.logout());
        window.location = 'logout';
      });
