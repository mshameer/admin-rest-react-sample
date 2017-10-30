import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import compose from 'recompose/compose';
import inflection from 'inflection';
import Title from 'admin-on-rest/lib/mui/layout/Title';
import { crudCreate as crudCreateAction } from 'admin-on-rest/lib/actions/dataActions';
import DefaultActions from 'admin-on-rest/lib/mui/detail/CreateActions';
import translate from 'admin-on-rest/lib/i18n/translate';
import withPermissionsFilteredChildren from 'admin-on-rest/lib/auth/withPermissionsFilteredChildren';
import CreateHead from './createHead';

class Create extends Component {
    getBasePath() {
        const { location } = this.props;
        return location.pathname
            .split('/')
            .slice(0, -1)
            .join('/');
    }

    defaultRedirectRoute() {
        const { hasShow, hasEdit } = this.props;
        if (hasEdit) return 'edit';
        if (hasShow) return 'show';
        return 'list';
    }

    save = (record, redirect) => {
        this.props.crudCreate(
            this.props.resource,
            record,
            this.getBasePath(),
            redirect
        );
    };

    render() {
        const {
            actions = <DefaultActions />,
            children,
            isLoading,
            resource,
            title,
            backTitle,
            translate,
            hasList,
            tab,
        } = this.props;

        if (!children) return null;
        const basePath = this.getBasePath();

        const resourceName = translate(`resources.${resource}.name`, {
            smart_count: 1,
            _: inflection.humanize(inflection.singularize(resource)),
        });
        const defaultTitle = translate('aor.page.create', {
            name: `${resourceName}`,
        });
        const titleElement = (
            <Title title={title} defaultTitle={defaultTitle} />
        );

        const urlParams = new URLSearchParams(this.props.location.search);
        const backTo = urlParams.get('backTo');

        return (
            <div className="create-page">
                <Card style={{ opacity: isLoading ? 0.8 : 1, boxShadow: 'none', paddingBottom: 75 }}>
                    <CreateHead
                      actions={actions}
                      hasList={hasList}
                      title={titleElement}
                      backTitle={backTitle || resource}
                      basePath={backTo || basePath}
                      tab={tab}
                    />
                    {React.cloneElement(children, {
                        save: this.save,
                        resource,
                        basePath,
                        record: {},
                        translate,
                        redirect:
                            typeof children.props.redirect === 'undefined'
                                ? this.defaultRedirectRoute()
                                : children.props.redirect,
                    })}
                </Card>
            </div>
        );
    }
}

Create.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.element,
    crudCreate: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any,
    translate: PropTypes.func.isRequired,
    hasList: PropTypes.bool,
    tab: PropTypes.bool,
};

Create.defaultProps = {
    data: {},
};

function mapStateToProps(state) {
    return {
        isLoading: state.admin.loading > 0,
    };
}

const enhance = compose(
    connect(mapStateToProps, { crudCreate: crudCreateAction }),
    translate,
    withPermissionsFilteredChildren
);

export default enhance(Create);
