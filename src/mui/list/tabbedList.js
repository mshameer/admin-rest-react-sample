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
import { Link } from 'react-router-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const styles = {
    floating: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 60,
        left: 'auto',
        position: 'fixed',
    },
};

export class TabbedList extends Component {
    state  = {
      activePath: React.Children.toArray(this.props.children)[0].props.basePath,
    }

    tabHandler = (activePath) => {
      this.setState({ activePath });
    }

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
                  <Tab label={child.props.title} onActive={() => this.tabHandler(child.props.basePath)} >
                    {React.cloneElement(child, { ...other, backTo: basePath })}
                  </Tab>
                ))}
            </Tabs>
            { width === 1 && (
              <FloatingActionButton
                  style={styles.floating}
                  containerElement={<Link to={`${this.state.activePath}/create?backTo=${basePath}`} />}
              >
                  <ContentAdd />
              </FloatingActionButton>) }
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
