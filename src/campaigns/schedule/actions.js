import { UPDATE, CREATE } from 'admin-on-rest';
export const SCHEDULE_CREATE = 'FIREBASE/SCHEDULE/SCHEDULE_CREATE';
export const SCHEDULE_CREATE_REST = 'FIREBASE/SCHEDULE/SCHEDULE_CREATE_REST';
export const UPDATE_GUEST_SCHEDULE = 'FIREBASE/SCHEDULE/UPDATE_GUEST_SCHEDULE';

export const scheduleCreate = (data) => {
  return ({
    type: SCHEDULE_CREATE,
    payload: data,
}) };

export const crudAddSchedule = (data) => ({
    type: SCHEDULE_CREATE_REST,
    payload: data,
    meta: { resource: 'schedule', fetch: CREATE, cancelPrevious: false },
});

export const updateGuestSchedule = (data) => ({
    type: UPDATE_GUEST_SCHEDULE,
    payload: data,
    meta: { resource: 'schedule', fetch: CREATE, cancelPrevious: false },
});

// export const updateAuthUser = (userData) => ({
//   type: USER_UPDATE,
//   payload: { ...userData },
// });
//
// export const updateAppUser = (userData) => ({
//     type: USER_UPDATE_REST,
//     payload: userData,
//     meta: { resource: 'users', fetch: UPDATE, cancelPrevious: false },
// });
