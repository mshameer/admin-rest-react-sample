import { put, takeEvery, select } from 'redux-saga/effects';
import { CRUD_CREATE_SUCCESS, crudUpdate, crudGetOne, CRUD_UPDATE, CRUD_UPDATE_SUCCESS } from 'admin-on-rest/lib/actions/dataActions';

function* updateGuest({ payload, meta, requestPayload }) {
  if(meta.resource === 'schedule'){
      yield put(crudGetOne('teams', payload.data.teamId));
      const teams = yield select(state => state.admin.resources.teams);
      if(payload.data.guestIds){
        for(let guestId of payload.data.guestIds){
          yield put(crudUpdate(
            'guests',
            guestId,
            {
              teamMembers: teams.data[payload.data.teamId].teamMembers,
              campaignId: payload.data.campaignId,
              status: 'scheduled'
            },
            {},
            requestPayload.basePath,
            requestPayload.redirectTo
          ));
        }
      }
  }
};

function* updateGuestStatus({ meta, payload }) {
  if(meta.resource === 'schedule'){
    if(payload.previousData.guestIds){
      for(let guestId of payload.previousData.guestIds){
        yield put(crudUpdate('guests', guestId, { status: 'notScheduled'}, {}, null, null));
      }
    }
  }
}

export default function* scheduleSaga() {
  yield [
    takeEvery(CRUD_CREATE_SUCCESS, updateGuest),
    takeEvery(CRUD_UPDATE, updateGuestStatus),
    takeEvery(CRUD_UPDATE_SUCCESS, updateGuest),
   ];
}
