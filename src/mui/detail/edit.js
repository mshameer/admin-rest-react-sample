import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import compose from 'recompose/compose';
import inflection from 'inflection';
import Title from 'admin-on-rest/lib/mui/layout/Title';
import {
    crudGetOne as crudGetOneAction,
    crudUpdate as crudUpdateAction,
} from 'admin-on-rest/lib/actions/dataActions';
import DefaultActions from 'admin-on-rest/lib/mui/detail/EditActions';
import translate from 'admin-on-rest/lib/i18n/translate';
import withPermissionsFilteredChildren from 'admin-on-rest/lib/auth/withPermissionsFilteredChildren';
import EditHead from './editHead';

export class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 0,
            record: props.data,
        };
        this.previousKey = 0;
    }

    componentDidMount() {
        this.updateData();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({ record: nextProps.data }); // FIXME: erases user entry when fetch response arrives late
            if (this.fullRefresh) {
                this.fullRefresh = false;
                this.setState({ key: this.state.key + 1 });
            }
        }
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
            .slice(0, -1)
            .join('/');
    }

    defaultRedirectRoute() {
        return 'list';
    }

    updateData(resource = this.props.resource, id = this.props.id) {
        this.props.crudGetOne(resource, id, this.getBasePath());
    }

    save = (record, redirect) => {
        this.props.crudUpdate(
            this.props.resource,
            this.props.id,
            record,
            this.props.data,
            this.getBasePath(),
            redirect
        );
    };

    render() {
        const {
            actions = <DefaultActions />,
            children,
            data,
            hasDelete,
            hasShow,
            hasList,
            id,
            isLoading,
            resource,
            title,
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
        const defaultTitle = translate('aor.page.edit', {
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
            <div className="edit-page">
                <Card style={{ opacity: isLoading ? 0.8 : 1, boxShadow: 'none', paddingBottom: 75  }}>
                    <EditHead
                      actions={actions}
                      basePath={basePath}
                      data={data}
                      hasDelete={hasDelete}
                      hasShow={hasShow}
                      hasList={hasList}
                      backTo={backTo}
                      resource={resource}
                      title={titleElement}
                      backTitle={backTitle || resource}
                      tab={tab}
                     />
                    {data &&
                        React.cloneElement(children, {
                            save: this.save,
                            resource,
                            basePath,
                            record: data,
                            translate,
                            redirect:
                                typeof children.props.redirect === 'undefined'
                                    ? this.defaultRedirectRoute()
                                    : children.props.redirect,
                        })}
                    {!data && <CardText>&nbsp;</CardText>}
                </Card>
            </div>
        );
    }
}

Edit.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.node,
    crudGetOne: PropTypes.func.isRequired,
    crudUpdate: PropTypes.func.isRequired,
    data: PropTypes.object,
    hasDelete: PropTypes.bool,
    hasShow: PropTypes.bool,
    hasList: PropTypes.bool,
    id: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any,
    translate: PropTypes.func,
    version: PropTypes.number.isRequired,
    backTitle: PropTypes.string,
    tab: PropTypes.bool,
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
    connect(mapStateToProps, {
        crudGetOne: crudGetOneAction,
        crudUpdate: crudUpdateAction,
    }),
    translate,
    withPermissionsFilteredChildren
);

export default enhance(Edit);
