import { put, takeEvery } from 'redux-saga/effects';
import { LOAD_DASHBOARD_DATA, LOAD_GUEST_SUCCESS,
  loadAdminOrg, loadGuestStatus, loadSubLevelOrgWithGuestStatus } from './actions';

/*
* load organization level data and curresponding guest details
*/
function* loadAdminData({ payload }) {
  const { adminId, type } = payload;
  yield put(loadAdminOrg(adminId, type));
  yield put(loadGuestStatus(adminId, type));
}

/*
* load dashboard list data based on the type passed
*/
function* loadDashboardListData({ meta }) {
  yield put(loadSubLevelOrgWithGuestStatus(meta.adminId, meta.type));
}

/*
* Saga watch function for dashboard
*/
export default function* scheduleSaga() {
  yield [
    takeEvery(LOAD_DASHBOARD_DATA, loadAdminData),
    takeEvery(LOAD_GUEST_SUCCESS, loadDashboardListData),
   ];
}
