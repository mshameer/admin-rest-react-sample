import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiAppBar from 'material-ui/AppBar';
import muiThemeable from 'material-ui/styles/muiThemeable';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SearchIcon from 'material-ui/svg-icons/action/search';
import {white, blue600} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
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
    icon: {
        marginTop: 0,
        marginRight: 0,
        marginLeft: '-24px',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
    },
    iconLeft: {
      marginTop: 0,
      color: '#fff',
    },
    iconButton: {
       float: 'left',
       padding: '12px 5px',
     },
     textField: {
       color: white,
       backgroundColor: blue600,
       borderRadius: 2,
       height: 30,
       width: 120,
       padding: '12px 12px 0',
       display: 'none',
     },
     inputStyle: {
       color: white,
     },
     hintStyle: {
       height: 16,
       paddingLeft: 5,
       color: white
     },
     tools: {
       display: 'inline-flex',
       marginRight: '-10px',
     },
     headline: {
       fontSize: 24,
       paddingTop: 16,
       marginBottom: 12,
       fontWeight: 400,
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
        const { title } = this.props;
        const loggedMenu =  (
          <div style={styles.tools} >
            <TextField
              hintText="Search..."
              underlineShow={false}
              style={styles.textField}
              inputStyle={styles.inputStyle}
              hintStyle={styles.hintStyle}
              />
            <IconButton style={styles.iconButton}>
              <SearchIcon color={white} />
            </IconButton>
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon color="#FFF" /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              style={{marginTop: 0}}
            >
              <MenuItem primaryText="Refresh" onClick={this.handleRefresh} />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
          </div>
        );

        return (
            <MuiAppBar
                style={styles.bar}
                titleStyle={styles.title}
                iconStyleLeft={styles.icon}
                iconStyleRight={styles.iconLeft}
                title={title}
                onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap}
                iconElementRight={loggedMenu}
            />
        );
    }
}

AppBarMobile.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    toggleSidebar: PropTypes.func.isRequired,
    refreshView: PropTypes.func.isRequired,
};

const enhance = compose(
    muiThemeable(), // force redraw on theme change
    connect(null, {
        toggleSidebar: toggleSidebarAction,
        refreshView: refreshViewAction
    })
);

export default enhance(AppBarMobile);
