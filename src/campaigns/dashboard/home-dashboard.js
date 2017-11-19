import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { CardTitle } from 'material-ui/Card';
import AppBarMobile from '../../mui/layout/appBarMobile';
import withWidth from 'material-ui/utils/withWidth';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import People from 'material-ui/svg-icons/social/people';
import Weekend from 'material-ui/svg-icons/content/weekend';
import { loadDashBoardData } from './../dashboard/actions';

import Chart from './chart';
import styles from './styles';

const subRole = {
  state: 'district',
  district: 'zone',
  zone: 'unit',
}

class HomeDashboard extends Component {

  componentDidMount() {
    this.props.loadData(this.props.adminId, this.props.role);
  }

  render() {
        const {
            width,
            muiTheme,
            orgGuests,
            adminOrg,
            subLevelList,
            chartData,
            role,
        } = this.props;
        const basePath = this.props.location.pathname.replace(/\/$/, '');
        const title = role === 'state' ?  'State Level' : adminOrg.name;
        const guestCount = Object.keys(orgGuests).length;
        const dt = new Date();
        const urlParams = new URLSearchParams(this.props.location.search);
        const backTo = urlParams.get('backTo');
        const appTitle = backTo ? 'Back' : 'Home';

        const viewTitle =  width === 1
          ? <AppBarMobile
              title={appTitle}
              basePath={basePath}
              tab
              titleLink={backTo}
              leftMenu={[
                <MenuItem primaryText="Refresh" type="refresh" />
              ]} />
          : <CardTitle title="Home" className="title" />;

        const chartRen = guestCount > 0
          ? <Chart
              stroke={muiTheme.home.dashColor}
              data={chartData}
              midValue={Object.keys(orgGuests).length}
            />
          :  <span style={styles.noGuest}>Not Guest Added</span>;
        return (
          <div className="list-page">
              {viewTitle}
              <div style={{backgroundColor: muiTheme.home.dashColor, paddingBottom: 20}}>
                <h3 style={styles.title}>{title}</h3>
                <h4 style={styles.subtitle}>Campagin Status | {dt.toLocaleDateString()}</h4>
                <div style={styles.chart}>
                  { chartRen }
                </div>
                <div style={styles.tools}>
                  <FlatButton
                    href="/#/campaigns-details"
                    label="Campagin"
                    style={styles.buttonStyle}
                    labelStyle={styles.toolLabel}
                    icon={<Weekend style={styles.toolsIcon} />}
                    />
                  <FlatButton
                    href="/#/users"
                    label="Members"
                    labelStyle={styles.toolLabel}
                    icon={<People style={styles.toolsIcon} />}
                  />
                </div>
              </div>
              <List style={styles.list}>
                { subLevelList.map((subOrg, key) => {
                  const linkEl =  role !== 'unit'
                    ? { containerElement: <Link to={ `/campaigns-${subRole[role]}-home/${subOrg.id}?backTo=${window.location.hash.replace('#/', '/')}`} /> }
                    : { };
                  return (
                    <ListItem
                      style={styles.item}
                      key={key}
                      { ...linkEl }
                      secondaryTextLines={2}
                      primaryText={
                        <span>{subOrg.title || subOrg.name}</span>
                      }
                      secondaryText={
                        <span style={styles.subItem}>
                          Total: {subOrg.guests} |
                          Scheduled: {subOrg.scheduled} |
                          Completed: {subOrg.completed}
                          <br /> Status: {subOrg.status}
                        </span>
                      }
                      rightIcon= {
                        <div style={styles.rightItem}>
                          <div  style={styles.rightMost}>
                            <div style={styles.comPer}>{subOrg.percent}%</div>
                          </div>
                          <div style={styles.statusPer}>Completed</div>
                        </div>
                      }

                    />)
                })}
              </List>
          </div>
        );
    }
}

HomeDashboard.propTypes = {
    unitId: PropTypes.string,
    width: PropTypes.number,
    muiTheme: PropTypes.object,
    loadData: PropTypes.func,
    adminOrg: PropTypes.object,
    orgGuests: PropTypes.array,
    chartData: PropTypes.array,
    subLevelList: PropTypes.array,
};

HomeDashboard.defaultProps = {
  adminOrg: {},
  orgGuests: [],
  subLevelList: [],
  chartData: [],
}

const mapStateToProps = state => ({
  adminOrg: state.dashboard.adminOrg,
  orgGuests: state.dashboard.orgGuests,
  subLevelList: state.dashboard.subLevelList,
  chartData: state.dashboard.chartData,
});


const enhance = compose(
  muiThemeable(),
  withWidth(),
  connect(mapStateToProps, {
    loadData: loadDashBoardData,
  })
);

export default enhance(HomeDashboard);
