import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { Route, Switch } from 'react-router-dom';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { CardTitle } from 'material-ui/Card';
import AppBarMobile from '../mui/layout/appBarMobile';
import withWidth from 'material-ui/utils/withWidth';
import MenuItem from 'material-ui/MenuItem';
import {white} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';

import People from 'material-ui/svg-icons/social/people';
import Weekend from 'material-ui/svg-icons/content/weekend';
import ArrowRight from 'material-ui/svg-icons/image/navigate-next';
import Restricted from 'admin-on-rest/lib/auth/Restricted';
import Chart from './chart';

const styles = {
  chart: {
    width: '100%',
    height: '200px'
  },
  title: {
    margin: 0,
    textAlign: 'center',
    padding: '20px 0 0',
    color: 'white',
    fontSize: '18px',
  },
  subtitle: {
    margin: 0,
    textAlign: 'center',
    padding: '5px 0 10px',
    color: '#a5e6f5',
    fontSize: '14px',
  },
  tools: {
    margin: '25px 20px 0px',
    display: 'flex',
    justifyContent: 'center',
  },
  toolLabel: {
    color: white,
    textTransform: 'capitalize',
    fontSize: 14,
  },
  toolsIcon: {
    fill: white,
    width: 30,
    height: 30,
  },
  buttonStyle: {
    borderRight: '1px solid #FFF'
  },
  list: {
    margin: '20px 0 0 20px',
    padding: 0
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 0px 15px 0',
    alignItems: 'center',
    borderBottom: '1px solid #CCC',
    margin: '0 10px 15px 0',
  },
  subItem: {
    display: 'block',
    fontSize: '12px',
    color: '#737171',
    paddingTop: '5px',
  },
  rightItem: {
    fontSize: 20,
    color: '#6eb2c1',
  },
  rightIcon: {
    width: 30,
    height: 30,
    fill:'#bbbbbb'
  },
  rightMost:{
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  last: {
    borderBottom: 'none',
  }
}


// const currentUser = getCurrentUser();

class Home extends Component {

    render() {
        const {
            width,
            muiTheme,
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
              <div style={{backgroundColor: muiTheme.home.dashColor, paddingBottom: 20}}>
                <h3 style={styles.title}>Pallimukk</h3>
                <h4 style={styles.subtitle}>Campagin Status | 12 May 2017</h4>
                <div style={styles.chart}>
                  <Chart stroke={muiTheme.home.dashColor} />
                </div>
                <div style={styles.tools}>
                  <FlatButton
                    href="/users/"
                    label="Campagin"
                    style={styles.buttonStyle}
                    labelStyle={styles.toolLabel}
                    icon={<Weekend  style={styles.toolsIcon} />}
                    />
                  <FlatButton
                    href="/users/"
                    label="Members"
                    labelStyle={styles.toolLabel}
                    icon={<People  style={styles.toolsIcon} />}
                  />
                </div>
              </div>
              <ul style={styles.list}>
                <li style={styles.item}>
                  <div>
                    <span>Souhruth Hastham Campagin</span>
                    <span style={styles.subItem}>Status: Active | Guests: 30 | Scheduled: 20</span>
                  </div>
                  <div style={styles.rightItem}>
                    <div  style={styles.rightMost}>
                      <div>30%</div><ArrowRight style={styles.rightIcon}/></div>
                    </div>
                </li>
                <li style={styles.item}>
                  <div>
                    <span>Souhruth Hastham 1</span>
                    <span style={styles.subItem}>Status: Active | Guests: 30 | Scheduled: 20</span>
                  </div>
                  <div style={styles.rightItem}>
                    <div  style={styles.rightMost}>
                      <div>100%</div><ArrowRight style={styles.rightIcon}/></div>
                    </div>
                </li>
                <li style={Object.assign({}, styles.item, styles.last)}>
                  <div>
                    <span>Campagin New</span>
                    <span style={styles.subItem}>Status: Active | Guests: 30 | Scheduled: 20</span>
                  </div>
                  <div style={styles.rightItem}>
                    <div  style={styles.rightMost}>
                      <div>100%</div><ArrowRight style={styles.rightIcon}/></div>
                    </div>
                </li>
              </ul>
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
