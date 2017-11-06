import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { Route, Switch } from 'react-router-dom';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Avatar from 'material-ui/Avatar';
import { CardTitle } from 'material-ui/Card';
import AppBarMobile from '../mui/layout/appBarMobile';
import withWidth from 'material-ui/utils/withWidth';
import MenuItem from 'material-ui/MenuItem';
import {white, blue600} from 'material-ui/styles/colors';

import Restricted from 'admin-on-rest/lib/auth/Restricted';
import Chart from './chart';
import { getCurrentUser} from '../utils/permissions';


const currentUser = getCurrentUser();

class Home extends Component {

    render() {
        const {
            children,
            width,
            muiTheme,
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
              <div style={{ width: '100%', height: '200px', backgroundColor: muiTheme.home.dashColor, paddingBottom: 20 }}>
                <Chart stroke={muiTheme.home.dashColor} />
              </div>
          </div>
        );
    }
}

Home.propTypes = {
    title: PropTypes.any,
    children: PropTypes.node,
    width: PropTypes.number,
};

const enhance = compose(
  muiThemeable(),
  withWidth()
);

const AppHome =  enhance(Home);


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
