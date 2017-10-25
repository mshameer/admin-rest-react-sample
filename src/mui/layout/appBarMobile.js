import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiAppBar from 'material-ui/AppBar';
import muiThemeable from 'material-ui/styles/muiThemeable';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import BackButton from 'material-ui/svg-icons/navigation/arrow-back';
import compose from 'recompose/compose';
import { toggleSidebar as toggleSidebarAction } from 'admin-on-rest/lib/actions';
import { refreshView as refreshViewAction } from 'admin-on-rest/lib/actions/uiActions';

const styles = {
    bar: {
        height: '3em',
        position: 'absolute',
        top: 0,
    },
    title: {
        fontSize: '1.25em',
        lineHeight: '2.5em',
    },
    titleLabel: {
      fontSize: '1.25em',
      textTransform: 'capitalize',
    },
    iconLeft: {
        marginTop: 0,
        marginRight: 0,
        marginLeft: '-24px',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
    },
    iconRight: {
      marginTop: 0,
      color: '#fff',
    },
    iconButton: {
       float: 'left',
       padding: '12px 5px',
    },
    tools: {
      display: 'inline-flex',
    },
    headline: {
       fontSize: 24,
       paddingTop: 16,
       marginBottom: 12,
       fontWeight: 400,
     },
     menuOrigin: {
       horizontal: 'right',
       vertical: 'top',
    },
   };

class AppBarMobile extends Component {
    handleLeftIconButtonTouchTap = event => {
        event.preventDefault();
        this.props.toggleSidebar();
    };

    handleRefresh = event => {
        event.preventDefault();
        this.props.refreshView();
    };

    render() {
        const { title, leftMenu, tools, titleLink } = this.props;
        const menuItems = leftMenu && leftMenu.map((item, key) => {
          const itemProps = { key };
          if(item.props.type === 'refresh') {
            itemProps.onClick = this.handleRefresh;
          }
          return React.cloneElement(item, itemProps);
        })
        const rightSideTools =  (
          <div style={styles.tools} >
            <IconButton style={styles.iconButton}>{tools}</IconButton>
            { leftMenu &&
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon color="#FFF" /></IconButton>
                }
                targetOrigin={styles.menuOrigin}
                anchorOrigin={styles.menuOrigin}
                style={{ marginTop: 0 }}
              >
                {menuItems}
              </IconMenu> }
          </div>
        );
        const appBarProps = titleLink
          ? {
              iconElementLeft: <FlatButton
                label={title}
                icon={<BackButton />}
                containerElement={<Link to={titleLink} />}
                style={{color: 'white', margin: '0 0 0 -12px'}}
                labelStyle={styles.titleLabel}
              />
            }
          : {
              title,
              titleStyle: styles.title,
              iconStyleLeft: styles.iconLeft,
              onLeftIconButtonTouchTap: this.handleLeftIconButtonTouchTap,
            };
        return (
            <MuiAppBar
                { ...appBarProps }
                style={styles.bar}
                iconStyleRight={styles.iconRight}
                iconElementRight={rightSideTools}
            />
        );
    }
}

AppBarMobile.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    toggleSidebar: PropTypes.func.isRequired,
    refreshView: PropTypes.func.isRequired,
    leftMenu: PropTypes.arrayOf(PropTypes.element),
    tools: PropTypes.arrayOf(PropTypes.element),
    titleLink: PropTypes.string,
};

const enhance = compose(
    muiThemeable(), // force redraw on theme change
    connect(null, {
        toggleSidebar: toggleSidebarAction,
        refreshView: refreshViewAction
    })
);

export default enhance(AppBarMobile);
