import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'material-ui/Tabs';
import { CardTitle } from 'material-ui/Card';
import AppBarMobile from '../layout/appBarMobile';
import withWidth from 'material-ui/utils/withWidth';
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
    appbar: {
      boxShadow: 'none',
    }
};

const boxShadow = 'rgba(0, 0, 0, 0.35) 0px 1px 6px, rgba(0, 0, 0, 0) 0px 1px 4px';

export class TabbedList extends Component {
    componentDidMount() {
      if(this.props.width === 1) {
        window.addEventListener("scroll", this.handleScroll);
      }
    }

    componentWillUnmount() {
      if(this.props.width === 1) {
        window.removeEventListener("scroll", this.handleScroll);
      }
    }

    state  = {
      activePath: React.Children.toArray(this.props.children)[0].props.basePath,
      tabStyle: { boxShadow },
    }

    tabHandler = (activePath) => {
      this.setState({ activePath });
    }

    handleScroll = () => {
      let supportPageOffset = window.pageXOffset !== undefined;
      let isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
      const scrollTop = supportPageOffset
        ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
      if (scrollTop > 30 && this.state.tabStyle.position !== 'fixed' ){
        this.setState({ tabStyle: { position: 'fixed', zIndex: 50, top: 0, boxShadow, transition: 'position .6s ease' },
          inkBarStyle: { position: 'fixed', zIndex: 51, top: 48, transition: 'position .6s ease' }});
      } else if (scrollTop < 30 && this.state.tabStyle.position === 'fixed' ){
        this.setState({ tabStyle: { boxShadow, position: 'relative', transition: 'position .6s ease' },
          inkBarStyle: { position: 'relative', transition: 'position .6s ease' }});
      }
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
              tab
              leftMenu={[
                <MenuItem primaryText="Refresh" type="refresh" />
              ]} />
          : <CardTitle title={title} className="title" />;
        return (
            <div className="list-page">
              {viewTitle}
              <Tabs
                tabItemContainerStyle={this.state.tabStyle}
                tabTemplateStyle={{ marginTop: 5 }}
                inkBarStyle={this.state.inkBarStyle}
              >
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
