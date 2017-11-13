import React, { createElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import Restricted from 'admin-on-rest/lib/auth/Restricted';
import { getCurrentUser} from '../../utils/permissions';
import HomeDashboard from './home-dashboard';

const { role, unitId, zoneId, districtId } = getCurrentUser() || {};
const adminIds = {
  unit: unitId,
  zone: zoneId,
  district: districtId,
}
const getHome = (type) => {
    const RestrictedPage = routeProps => {
       const pageType = type || role;
       const pageId = routeProps.match.params.id || adminIds[role];
       return(<Restricted authParams={{ route: 'list' }} {...routeProps}>
            { createElement(HomeDashboard, {
                ...routeProps,
                role: pageType,
                adminId: pageId,
            })}
        </Restricted>)
    };
    return RestrictedPage;
};

const CampaignHome = () => (
  <Switch>
    <Route
        exact
        path={`/`}
        render={getHome()}
    />
    <Route
        exact
        path={`/campaigns-home`}
        render={getHome()}
    />
    <Route
        exact
        path={`/campaigns-district-home/:id`}
        render={getHome('district')}
    />
    <Route
        exact
        path={`/campaigns-zone-home/:id`}
        render={getHome('zone')}
    />
    <Route
        exact
        path={`/campaigns-unit-home/:id`}
        render={getHome('unit')}
    />
  </Switch>
)

export default CampaignHome;
