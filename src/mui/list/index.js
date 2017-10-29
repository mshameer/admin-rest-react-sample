import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { parse, stringify } from 'query-string';
import { push as pushAction } from 'react-router-redux';
import { Card, CardText } from 'material-ui/Card';
import compose from 'recompose/compose';
import { createSelector } from 'reselect';
import inflection from 'inflection';
import queryReducer, {
    SET_SORT,
    SET_PAGE,
    SET_FILTER,
    SORT_DESC,
} from 'admin-on-rest/lib/reducer/admin/resource/list/queryReducer';
import ListHead from './listHead';
import Title from 'admin-on-rest/lib/mui/layout/Title';
import DefaultPagination from 'admin-on-rest/lib/mui/list/Pagination';
import withWidth from 'material-ui/utils/withWidth';

import DefaultActions from './actions';
import { crudGetList as crudGetListAction } from 'admin-on-rest/lib/actions/dataActions';
import { changeListParams as changeListParamsAction } from 'admin-on-rest/lib/actions/listActions';
import { refreshView as refreshViewAction } from 'admin-on-rest/lib/actions/uiActions';
import translate from 'admin-on-rest/lib/i18n/translate';
import removeKey from 'admin-on-rest/lib/util/removeKey';
import defaultTheme from '../../config/theme';
import withPermissionsFilteredChildren from 'admin-on-rest/lib/auth/withPermissionsFilteredChildren';

const styles = {
  noResults: { padding: 20 },
};

export class List extends Component {
    state = {};

    componentDidMount() {
        this.updateData();
        if (Object.keys(this.props.query).length > 0) {
            this.props.changeListParams(this.props.resource, this.props.query);
        }
        if(this.props.width === 1) {
          window.addEventListener("scroll", this.handleScroll);
        }
    }

    componentWillUnmount() {
      if(this.props.width === 1) {
        window.removeEventListener("scroll", this.handleScroll);
      }
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.resource !== this.props.resource ||
            nextProps.query.sort !== this.props.query.sort ||
            nextProps.query.order !== this.props.query.order ||
            nextProps.query.page !== this.props.query.page ||
            nextProps.query.filter !== this.props.query.filter
        ) {
            this.updateData(
                Object.keys(nextProps.query).length > 0
                    ? nextProps.query
                    : nextProps.params
            );
        }
        if (nextProps.version !== this.props.version) {
            this.updateData();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextProps.isLoading === this.props.isLoading &&
            nextProps.width === this.props.width &&
            nextProps.version === this.props.version &&
            nextState === this.state
        ) {
            return false;
        }
        return true;
    }

    getBasePath() {
        return this.props.location.pathname.replace(/\/$/, '');
    }

    /**
     * Merge list params from 3 different sources:
     *   - the query string
     *   - the params stored in the state (from previous navigation)
     *   - the props passed to the List component
     */
    getQuery() {
        const query =
            Object.keys(this.props.query).length > 0
                ? this.props.query
                : { ...this.props.params };
        if (!query.sort) {
            query.sort = this.props.sort.field;
            query.order = this.props.sort.order;
        }
        if (!query.perPage) {
            query.perPage = this.props.perPage;
        }
        return query;
    }

    handleScroll = () => {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        const params = this.getQuery();
        const { page, perPage } = params;
        const nextPage = parseInt(page, 10) + 1;
        if(Math.ceil(this.props.total / perPage) >= nextPage) {
          this.setPage(nextPage);
        }
      }
    }

    updateData(query) {
        const params = query || this.getQuery();
        const { sort, order, page, perPage, filter } = params;
        const pagination = {
            page: parseInt(page, 10),
            perPage: parseInt(perPage, 10),
            infinit: this.props.width === 1,
        };
        const permanentFilter = this.props.filter;
        this.props.crudGetList(
            this.props.resource,
            pagination,
            { field: sort, order },
            { ...filter, ...permanentFilter }
        );
    }

    setSort = sort => this.changeParams({ type: SET_SORT, payload: sort });

    setPage = page => this.changeParams({ type: SET_PAGE, payload: page });

    setFilters = filters =>
        this.changeParams({ type: SET_FILTER, payload: filters });

    showFilter = (filterName, defaultValue) => {
        this.setState({ [filterName]: true });
        if (typeof defaultValue !== 'undefined') {
            this.setFilters({
                ...this.props.filterValues,
                [filterName]: defaultValue,
            });
        }
    };

    hideFilter = filterName => {
        this.setState({ [filterName]: false });
        const newFilters = removeKey(this.props.filterValues, filterName);
        this.setFilters(newFilters);
    };

    changeParams(action) {
        const newParams = queryReducer(this.getQuery(), action);
        this.props.push({
            ...this.props.location,
            search: `?${stringify({
                ...newParams,
                filter: JSON.stringify(newParams.filter),
            })}`,
        });
        console.log(this.props);
        this.props.changeListParams(this.props.resource, newParams);
    }

    refresh() {
        if (process.env !== 'production') {
            console.warn( // eslint-disable-line
                'Deprecation warning: The preferred way to refresh the List view is to connect your custom button with redux and dispatch the `refreshView` action.'
            );
        }

        this.props.refreshView();
    }

    render() {
        const {
            children,
            filters,
            pagination = <DefaultPagination />,
            actions = <DefaultActions />,
            resource,
            hasCreate,
            title,
            data,
            ids,
            total,
            isLoading,
            translate,
            theme,
            version,
            width,
        } = this.props;
        const query = this.getQuery();
        const filterValues = query.filter;
        const basePath = this.getBasePath();

        const resourceName = translate(`resources.${resource}.name`, {
            smart_count: 2,
            _: inflection.humanize(inflection.pluralize(resource)),
        });
        const defaultTitle = translate('aor.page.list', {
            name: `${resourceName}`,
        });
        const titleElement = (
            <Title title={title} defaultTitle={defaultTitle} />
        );

        const cartStyle =  width === 1 ? { opacity: isLoading ? 0.8 : 1,  boxShadow: 'none' } :  { opacity: isLoading ? 0.8 : 1};

        return (
            <div className="list-page">
                <Card style={cartStyle} >
                  <ListHead
                    title={titleElement}
                    actions={actions}
                    resource={resource}
                    filters={filters}
                    filterValues={filterValues}
                    basePath={basePath}
                    hasCreate={hasCreate}
                    displayedFilters={this.state}
                    showFilter={this.showFilter}
                    theme={theme}
                    refresh={this.refresh}

                    hideFilter={this.hideFilter}
                    setFilters={this.setFilters}
                  />
                    {isLoading || total > 0 ? (
                        <div key={version}>
                            {children &&
                                React.cloneElement(children, {
                                    resource,
                                    ids,
                                    data,
                                    currentSort: {
                                        field: query.sort,
                                        order: query.order,
                                    },
                                    basePath,
                                    isLoading,
                                    setSort: this.setSort,
                                })}
                            {pagination && width > 1 &&
                                React.cloneElement(pagination, {
                                    total,
                                    page: parseInt(query.page, 10),
                                    perPage: parseInt(query.perPage, 10),
                                    setPage: this.setPage,
                                })}
                        </div>
                    ) : (
                        <CardText style={styles.noResults}>
                            {translate('aor.navigation.no_results')}
                        </CardText>
                    )}
                </Card>
            </div>
        );
    }
}

List.propTypes = {
    // the props you can change
    title: PropTypes.any,
    filter: PropTypes.object,
    filters: PropTypes.element,
    pagination: PropTypes.element,
    actions: PropTypes.element,
    perPage: PropTypes.number.isRequired,
    sort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.string,
    }),
    children: PropTypes.node,
    // the props managed by admin-on-rest
    authClient: PropTypes.func,
    changeListParams: PropTypes.func.isRequired,
    crudGetList: PropTypes.func.isRequired,
    data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    filterValues: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    hasCreate: PropTypes.bool.isRequired,
    ids: PropTypes.array,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    path: PropTypes.string,
    params: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    refreshView: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
    translate: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    version: PropTypes.number.isRequired,
    width: PropTypes.number,
};

List.defaultProps = {
    filter: {},
    filterValues: {},
    perPage: 10,
    sort: {
        field: 'id',
        order: SORT_DESC,
    },
    theme: defaultTheme,
};

const getLocationSearch = props => props.location.search;
const getQuery = createSelector(getLocationSearch, locationSearch => {
    const query = parse(locationSearch);
    if (query.filter && typeof query.filter === 'string') {
        query.filter = JSON.parse(query.filter);
    }
    return query;
});

function mapStateToProps(state, props) {
    const resourceState = state.admin.resources[props.resource] || { list: { params: {} } };
    return {
        query: getQuery(props),
        params: resourceState.list.params,
        ids: resourceState.list.ids,
        total: resourceState.list.total,
        data: resourceState.data,
        isLoading: state.admin.loading > 0,
        filterValues: resourceState.list.params.filter,
        version: state.admin.ui.viewVersion,
    };
}

const enhance = compose(
    connect(mapStateToProps, {
        crudGetList: crudGetListAction,
        changeListParams: changeListParamsAction,
        push: pushAction,
        refreshView: refreshViewAction,
    }),
    translate,
    withWidth(),
    withPermissionsFilteredChildren
);

export default enhance(List);
