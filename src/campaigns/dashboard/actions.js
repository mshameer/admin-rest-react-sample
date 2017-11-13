import { GET_ONE, GET_LIST } from 'admin-on-rest';
export const LOAD_DASHBOARD_DATA = 'FIREBASE/SCHEDULE/LOAD_DASHBOARD_DATA';
export const LOAD_ADMIN_ORG = 'FIREBASE/SCHEDULE/LOAD_ADMIN_ORG';
export const LOAD_ADMIN_ORG_SUCCESS = 'FIREBASE/SCHEDULE/LOAD_ADMIN_ORG_SUCCESS';
export const LOAD_GUEST = 'FIREBASE/SCHEDULE/LOAD_GUEST';
export const LOAD_GUEST_SUCCESS = 'FIREBASE/SCHEDULE/LOAD_GUEST_SUCCESS';
export const LOAD_DASHBOARD_LIST = 'FIREBASE/SCHEDULE/LOAD_DASHBOARD_LIST';
export const LOAD_DASHBOARD_LIST_SUCCESS = 'FIREBASE/SCHEDULE/LOAD_DASHBOARD_LIST_SUCCESS';

const typeToResource = {
  unit: 'units',
  zone: 'zones',
  district: 'districts',
}

/*
*  Load all the dashboard data
*/
export const loadDashBoardData = (adminId, type) => {
  return ({
    type: LOAD_DASHBOARD_DATA,
    payload: { adminId, type },
}) };

/*
*  Load current admin org level data to get main title
*/
export const loadAdminOrg = (id, type) => ({
  type: LOAD_ADMIN_ORG,
  payload: { id },
  meta: { resource: typeToResource[type], fetch: GET_ONE, cancelPrevious: false, type }
})

/*
* Load guest list for the org level
*/
export const loadGuestStatus = (id, type) => {
  const filterToType = {
    unit: { unitId: id },
    zone: { zoneId: id },
    district: { districtId: id },
  };
  return({
      type: LOAD_GUEST,
      payload: { filter: filterToType[type], pagination: { page: 1, perPage: 999999 } },
      meta: { resource: 'guests', fetch: GET_LIST, cancelPrevious: false, type, adminId: id },
  })
};

/*
* Common sub level orgnization with loaded Guests status
*/

export const loadSubLevelOrgWithGuestStatus = (adminId, type) => {
  const subLevelToType = {
    unit: { resource: 'campaigns', sort: { field: 'cmpDate', order: 'DESC'} },
    zone: { resource: 'units', filter: { zoneId: adminId }, sort: { field: 'name', order: 'ASC'} },
    district: { resource: 'zones', filter: { districtId: adminId }, sort: { field: 'name', order: 'ASC'} },
    state: { resource: 'districts', sort: { field: 'name', order: 'ASC'} },
  }
  return {
    type: LOAD_DASHBOARD_LIST,
    payload: { filter: subLevelToType[type].filter, pagination: { page: 1, perPage: 9999 }, sort: subLevelToType[type].sort },
    meta: { resource: subLevelToType[type].resource, fetch: GET_LIST, cancelPrevious: false, type },
  }
};
