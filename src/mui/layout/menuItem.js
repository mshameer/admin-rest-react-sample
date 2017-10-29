import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ListItem } from 'material-ui/List';
import { withRouter } from 'react-router';

export class MenuItemLinkComponent extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        onClick: PropTypes.func,
        to: PropTypes.string,
    };

    handleMenuTap = () => {
      if(this.props.onClick) {
        this.props.history.push(this.props.to);
        this.props.onClick();
      }
    };
    render() {
        const {
            history,
            match,
            location,
            staticContext,
            ...props
        } = this.props;

        return <ListItem {...props}  innerDivStyle={{ padding: '16px 36px 16px 72px'}} onClick={this.handleMenuTap} />;
    }
}

export default withRouter(MenuItemLinkComponent);
