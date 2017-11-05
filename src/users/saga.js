import { put, takeEvery, call } from 'redux-saga/effects';
import { showNotification } from 'admin-on-rest';
import firebase from 'firebase'

import { fetchApi } from '../utils/api-fetch'
import { USER_CREATE, USER_UPDATE, createAppUser, updateAppUser } from './actions';

export default function* usersSaga() {
    yield takeEvery(USER_CREATE, function* ({ payload }) {
      const token = yield call(getAuthToken);
      const authData = yield call(createAuthUser, {
        ...payload,
        email: `${payload.phoneNumber}@sh.com`,
      }, token);
      yield put(createAppUser({
        data: {
          id: authData.uid,
          ...payload
        }
      }));
      yield put(showNotification('aor.notification.created'));
    })

    yield takeEvery(USER_UPDATE, function* ({ payload }) {
      const token = yield call(getAuthToken);
      const authData = yield call(updateAuthUser, {
        ...payload,
        email: `${payload.phoneNumber}@sh.com`,
      }, token);

      yield put(updateAppUser({
        id: authData.uid,
        data: payload,
      }));
      yield put(showNotification('aor.notification.updated'));
    })
}

const getAuthToken = () => firebase.auth().currentUser.getToken();

const createAuthUser = (data, token) => {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    return fetchApi("/users", data, 'post', headers );
};

const updateAuthUser = (data, token) => {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    return fetchApi("/users", data, 'put', headers );
};
