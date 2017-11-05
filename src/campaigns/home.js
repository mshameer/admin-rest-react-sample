import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import { CardTitle } from 'material-ui/Card';
import AppBarMobile from '../mui/layout/appBarMobile';
import withWidth from 'material-ui/utils/withWidth';
import MenuItem from 'material-ui/MenuItem';

import Restricted from 'admin-on-rest/lib/auth/Restricted';
import { getCurrentUser} from '../utils/permissions';


const currentUser = getCurrentUser();

class Home extends Component {

    render() {
        const {
            children,
            width,
            ...other,
        } = this.props;
        const basePath = this.props.location.pathname.replace(/\/$/, '');
        const viewTitle =  width === 1
          ? <AppBarMobile
              title="Home"
              basePath={basePath}
              tab
              leftMenu={[
                <MenuItem primaryText="Refresh" type="refresh" />
              ]} />
          : <CardTitle title="Home" className="title" />;
        return (
          <div className="list-page">
              {viewTitle}
          </div>
        );
    }
}

Home.propTypes = {
    title: PropTypes.any,
    children: PropTypes.node,
    width: PropTypes.number,
};

const AppHome =  withWidth()(Home);


const restrictPage = (component, route) => {

    const RestrictedPage = routeProps => (
        <Restricted authParams={{ route }} {...routeProps}>
            {createElement(component, {
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
        path={`/`}
        render={restrictPage(AppHome, 'list')}
    />
    <Route
        exact
        path={`/campaigns-home`}
        render={restrictPage(AppHome, 'list')}
    />
  </Switch>
)

export default Details;
