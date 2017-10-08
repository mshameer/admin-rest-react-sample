import { CREATE, UPDATE } from 'admin-on-rest';

export const USER_CREATE = 'FIREBASE/AUTH/USER_CREATE';
export const USER_CREATE_REST = 'FIREBASE/USER_CREATE';
export const USER_UPDATE = 'FIREBASE/AUTH/USER_UPDATE';
export const USER_UPDATE_REST = 'FIREBASE/USER_UPDATE';


export const createAuthUser = (userData) => ({
  type: USER_CREATE,
  payload: { ...userData },
});

export const createAppUser = (userData) => ({
    type: USER_CREATE_REST,
    payload: userData,
    meta: { resource: 'users', fetch: CREATE, cancelPrevious: false },
});

export const updateAuthUser = (userData) => ({
  type: USER_UPDATE,
  payload: { ...userData },
});

export const updateAppUser = (userData) => ({
    type: USER_UPDATE_REST,
    payload: userData,
    meta: { resource: 'users', fetch: UPDATE, cancelPrevious: false },
});
