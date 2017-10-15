import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import translate from 'admin-on-rest/lib/i18n/translate';
import withWidth from 'material-ui/utils/withWidth';
import { refreshView as refreshViewAction } from 'admin-on-rest/lib/actions/uiActions';

class RefreshButton extends Component {
    static propTypes = {
        label: PropTypes.string,
        translate: PropTypes.func.isRequired,
        refreshView: PropTypes.func.isRequired,
        width: PropTypes.number,
    };

    static defaultProps = {
        label: 'aor.action.refresh',
    };

    handleClick = event => {
        event.preventDefault();
        this.props.refreshView();
    };

    render() {
        const { label, translate, width } = this.props;

        return (
            width > 1 ? (
              <FlatButton
                primary
                label={label && translate(label)}
                onClick={this.handleClick}
                icon={<NavigationRefresh />}
              />
          ) : null
        );
    }
}

const enhance = compose(
    connect(null, { refreshView: refreshViewAction }),
    withWidth(),
    translate
);

export default enhance(RefreshButton);
