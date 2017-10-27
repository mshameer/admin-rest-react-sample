import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'material-ui/Tabs';
import ListHead from './listHead';
import defaultTheme from '../../config/theme';

export class TabbedList extends Component {

    render() {
        const {
            children,
            title,
            ...other,
        } = this.props;
        return (
            <div className="list-page">
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
};

export default TabbedList;
