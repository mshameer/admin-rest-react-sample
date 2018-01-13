import pickBy from 'lodash.pickby';
import { LOAD_ADMIN_ORG_SUCCESS, LOAD_GUEST_SUCCESS, LOAD_DASHBOARD_LIST_SUCCESS } from './actions';

const getStatusCount = (guestsUnit, status) => {
  const filteredGuests = pickBy(guestsUnit, (guest) => guest.status === status);
  return Object.keys(filteredGuests).length;
}

const calculateStatus = (totalGuests) => {
  const guests = Object.keys(totalGuests).length;
  const completed = getStatusCount(totalGuests, 'completed');
  const scheduled = getStatusCount(totalGuests, 'scheduled');
  let status = completed === guests && guests ? 'dashboard.campaign_completed' : null;
  status = !status && scheduled === guests  ? 'dashboard.not_started' : 'dashboard.campaign_in_progress';
  const percent = guests ? Math.round((completed/guests)*100) : 0;
  return {
    guests,
    completed,
    scheduled,
    status,
    percent,
  }
}

const getSubWithGuestStatus = (subOrg, state, type) => {
  return subOrg.map(org => {
    const { orgGuests } = state;
    const validGuest = (id, guest) => guest[id] === org.id;
    const typeToId = {
      unit: 'campaignId',
      zone: 'unitId',
      district: 'zoneId',
      state: 'districtId'
    }
    const totalGuests = pickBy(orgGuests, (guest) => validGuest(typeToId[type], guest));

    return {
      ...org,
      ...calculateStatus(totalGuests),
    }
  });
}

const getChartData = (guests) => {
  const total =  Object.keys(guests).length;
  const completedPer = (getStatusCount(guests, 'completed')/total)*100;
  const scheduledPer = (getStatusCount(guests, 'scheduled')/total)*100;
  const notScheduledPer= (getStatusCount(guests, 'notScheduled')/total)*100;
  let chartData = [ ];

  if(completedPer !== 100){
    chartData = [
      {name: 'Scheduled', value: scheduledPer},
      {name: 'Not Scheduled', value: notScheduledPer},
    ];
  }

  if(notScheduledPer !== 100){
    chartData.unshift({name: 'Completed', value: completedPer});
  }

  return chartData;
}

export default (state = {}, { type, payload, meta }) => {
    switch(type){
       case LOAD_ADMIN_ORG_SUCCESS :
        return {
        ...state,
         adminOrg: payload.data,
       };

       case LOAD_GUEST_SUCCESS :
        return {
          ...state,
         orgGuests: payload.data,
         chartData: getChartData(payload.data),
       };

       case LOAD_DASHBOARD_LIST_SUCCESS :
        return {
          ...state,
         subLevelList: getSubWithGuestStatus(payload.data, state, meta.type),
       };

       default :  return state;
    }
  }
