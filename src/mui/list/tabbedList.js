import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'material-ui/Tabs';
import { CardTitle } from 'material-ui/Card';
import AppBarMobile from '../layout/appBarMobile';
import withWidth from 'material-ui/utils/withWidth';
import defaultTheme from '../../config/theme';
import MenuItem from 'material-ui/MenuItem';
import SearchIcon from 'material-ui/svg-icons/action/search';
import {white} from 'material-ui/styles/colors';

export class TabbedList extends Component {

    render() {
        const {
            children,
            title,
            width,
            ...other,
        } = this.props;
        const basePath = this.props.location.pathname.replace(/\/$/, '');
        const viewTitle =  width === 1
          ? <AppBarMobile
              title={title}
              basePath={basePath}
              tools = {[
                <SearchIcon color={white} key={1} />
              ]}
              leftMenu={[
                <MenuItem primaryText="Refresh" type="refresh" />
              ]} />
          : <CardTitle title={title} className="title" />;
        return (
            <div className="list-page">
              {viewTitle}
              <Tabs>
                { React.Children.map(children, (child) => (
                  <Tab label={child.props.title} >
                    {React.cloneElement(child, { ...other })}
                  </Tab>
                ))}
            </Tabs>
          </div>
        );
    }
}

TabbedList.propTypes = {
    title: PropTypes.any,
    children: PropTypes.node,
    width: PropTypes.number,
};

export default withWidth()(TabbedList);
