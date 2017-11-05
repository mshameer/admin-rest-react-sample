import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import compose from 'recompose/compose';
import inflection from 'inflection';
import ViewTitle from 'admin-on-rest/lib/mui/layout/ViewTitle';
import Title from 'admin-on-rest/lib/mui/layout/Title';
import { crudGetOne as crudGetOneAction } from 'admin-on-rest/lib/actions/dataActions';
import DefaultActions from 'admin-on-rest/lib/mui/detail/ShowActions';
import translate from 'admin-on-rest/lib/i18n/translate';
import withPermissionsFilteredChildren from 'admin-on-rest/lib/auth/withPermissionsFilteredChildren';

import ShowHead from './showHead';

export class Show extends Component {
    componentDidMount() {
        this.updateData();
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.id !== nextProps.id ||
            nextProps.version !== this.props.version
        ) {
            this.updateData(nextProps.resource, nextProps.id);
        }
    }

    getBasePath() {
        const { location } = this.props;
        return location.pathname
            .split('/')
            .slice(0, -2)
            .join('/');
    }

    updateData(resource = this.props.resource, id = this.props.id) {
        this.props.crudGetOne(resource, id, this.getBasePath());
    }

    render() {
        const {
            actions = <DefaultActions />,
            title,
            children,
            id,
            data,
            isLoading,
            resource,
            hasList,
            hasDelete,
            hasEdit,
            translate,
            backTitle,
            tab,
        } = this.props;

        if (!children) return null;
        const basePath = this.getBasePath();

        const resourceName = translate(`resources.${resource}.name`, {
            smart_count: 1,
            _: inflection.humanize(inflection.singularize(resource)),
        });
        const defaultTitle = translate('aor.page.show', {
            name: `${resourceName}`,
            id,
            data,
        });
        const titleElement = data ? (
            <Title title={title} record={data} defaultTitle={defaultTitle} />
        ) : (
            ''
        );

        const urlParams = new URLSearchParams(this.props.location.search);
        const backTo = urlParams.get('backTo');

        return (
            <div>
                <Card style={{ opacity: isLoading ? 0.8 : 1 }}>
                        <ShowHead
                          actions={actions}
                          basePath={basePath}
                          data={data}
                          hasDelete={hasDelete}
                          hasEdit={hasEdit}
                          hasList={hasList}
                          backTo={backTo}
                          resource={resource}
                          title={titleElement}
                          backTitle={backTitle || resource}
                          tab={tab}
                         />
                    {data &&
                        React.cloneElement(children, {
                            resource,
                            basePath,
                            record: data,
                            translate,
                        })}
                </Card>
            </div>
        );
    }
}

Show.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.element,
    crudGetOne: PropTypes.func.isRequired,
    data: PropTypes.object,
    hasList: PropTypes.bool,
    hasDelete: PropTypes.bool,
    hasEdit: PropTypes.bool,
    id: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any,
    translate: PropTypes.func,
    version: PropTypes.number.isRequired,
};

function mapStateToProps(state, props) {
    return {
        id: decodeURIComponent(props.match.params.id),
        data: state.admin.resources[props.resource]
            ? state.admin.resources[props.resource].data[
                  decodeURIComponent(props.match.params.id)
              ]
            : null,
        isLoading: state.admin.loading > 0,
        version: state.admin.ui.viewVersion,
    };
}

const enhance = compose(
    connect(mapStateToProps, { crudGetOne: crudGetOneAction }),
    translate,
    withPermissionsFilteredChildren
);

export default enhance(Show);
