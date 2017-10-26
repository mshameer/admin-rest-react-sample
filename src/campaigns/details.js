import React, { createElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import Restricted from 'admin-on-rest/lib/auth/Restricted';
import { GuestList} from './guests';

const restrictPage = (component, route) => {
  const commonProps = {
      resource: 'guests',
      hasList: false,
      hasEdit: false,
      hasShow: false,
      hasCreate: false,
      hasDelete: false,
  };

    const RestrictedPage = routeProps => (
        <Restricted authParams={{ resource: 'guests', route }} {...routeProps}>
            {createElement(component, {
                ...commonProps,
                ...routeProps,
            })}
        </Restricted>
    );
    return RestrictedPage;
};

const Details = () => (
  <Switch>
    <Route
        exact
        path={`/campaigns-details`}
        render={restrictPage(GuestList, 'list')}
    />
  </Switch>
)

export default Details;
