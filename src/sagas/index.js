import usersSaga from '../users/saga';
import scheduleSaga from '../campaigns/schedule/saga'
import dashboardSaga from '../campaigns/dashboard/saga'
export default [
  usersSaga,
  scheduleSaga,
  dashboardSaga,
];
