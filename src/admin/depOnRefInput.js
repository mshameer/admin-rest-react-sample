import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { Labeled } from 'admin-on-rest';
import { formValueSelector } from 'redux-form';
import {
    crudGetOne as crudGetOneAction,
    crudGetMatching as crudGetMatchingAction,
} from 'admin-on-rest/lib/actions/dataActions';
import { getPossibleReferences } from 'admin-on-rest/lib/reducer/admin/references/possibleValues';
const REDUX_FORM_NAME = 'record-form';

const referenceSource = (resource, source) => `${resource}@${source}`;
const noFilter = () => true;

export class DepOnRefInput extends Component {
    constructor(props) {
        super(props);
        const { perPage, sort, filter } = props;
        // stored as a property rather than state because we don't want redraw of async updates
        this.params = { pagination: { page: 1, perPage }, sort, filter };
        this.debouncedSetFilter = debounce(this.setFilter.bind(this), 500);
    }

    componentDidMount() {
        this.fetchReferenceAndOptions();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.record.id !== nextProps.record.id || this.props.dependsOnValue !== nextProps.dependsOnValue ) {
            this.fetchReferenceAndOptions(nextProps);
        }
    }

    setFilter = filter => {
        if (filter !== this.params.filter) {
            this.params.filter = this.props.filterToQuery(filter);
            this.fetchReferenceAndOptions();
        }
    };

    setPagination = pagination => {
        if (pagination !== this.param.pagination) {
            this.param.pagination = pagination;
            this.fetchReferenceAndOptions();
        }
    };

    setSort = sort => {
        if (sort !== this.params.sort) {
            this.params.sort = sort;
            this.fetchReferenceAndOptions();
        }
    };

    fetchReferenceAndOptions(
        { input, reference, source, resource, dependsOn, dependsOnValue } = this.props
    ) {
        const { filter: filterFromProps } = this.props;
        const { pagination, sort, filter } = this.params;
        const id = input.value;

        if (id) {
            this.props.crudGetOne(reference, id, null, false);
        }

        let finalFilter = { ...filterFromProps, ...filter };
        finalFilter[dependsOn] = dependsOnValue;
        this.props.crudGetMatching(
            reference,
            referenceSource(resource, source),
            pagination,
            sort,
            finalFilter
        );
    }

    render() {
        const {
            input,
            resource,
            label,
            source,
            referenceRecord,
            allowEmpty,
            matchingReferences,
            basePath,
            onChange,
            children,
            meta,
        } = this.props;
        if (!referenceRecord && !allowEmpty) {
            return (
                <Labeled
                    label={
                        typeof label === 'undefined' ? (
                            `resources.${resource}.fields.${source}`
                        ) : (
                            label
                        )
                    }
                    source={source}
                    resource={resource}
                />
            );
        }

        return React.cloneElement(children, {
            allowEmpty,
            input,
            label:
                typeof label === 'undefined'
                    ? `resources.${resource}.fields.${source}`
                    : label,
            resource,
            meta,
            source,
            choices: matchingReferences,
            basePath,
            onChange,
            filter: noFilter, // for AutocompleteInput
            setFilter: this.debouncedSetFilter,
            setPagination: this.setPagination,
            setSort: this.setSort,
            translateChoice: false,
        });
    }
}

DepOnRefInput.propTypes = {
    addField: PropTypes.bool.isRequired,
    allowEmpty: PropTypes.bool.isRequired,
    basePath: PropTypes.string,
    children: PropTypes.element.isRequired,
    crudGetMatching: PropTypes.func.isRequired,
    crudGetOne: PropTypes.func.isRequired,
    filter: PropTypes.object,
    filterToQuery: PropTypes.func.isRequired,
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    matchingReferences: PropTypes.array,
    meta: PropTypes.object,
    onChange: PropTypes.func,
    perPage: PropTypes.number,
    reference: PropTypes.string.isRequired,
    referenceRecord: PropTypes.object,
    resource: PropTypes.string.isRequired,
    sort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.oneOf(['ASC', 'DESC']),
    }),
    source: PropTypes.string,
    dependsOnValue: PropTypes.any,
};

DepOnRefInput.defaultProps = {
    addField: true,
    allowEmpty: false,
    filter: {},
    filterToQuery: searchText => ({ q: searchText }),
    matchingReferences: [],
    perPage: 25,
    sort: { field: 'id', order: 'DESC' },
    referenceRecord: null,
};

function mapStateToProps(state, props) {
    const referenceId = props.input.value;
    const dependsOn = props.dependsOn;
    const formName = props.formName || REDUX_FORM_NAME;
    const formValue = formValueSelector(formName)(state, dependsOn);

    return {
        referenceRecord:
            state.admin.resources[props.reference].data[referenceId],
        matchingReferences: getPossibleReferences(
            state,
            referenceSource(props.resource, props.source),
            props.reference,
        ),
        dependsOnValue: formValue,
    };
}

const ConnectedDepOnRefInput = connect(mapStateToProps, {
    crudGetOne: crudGetOneAction,
    crudGetMatching: crudGetMatchingAction,
})(DepOnRefInput);

ConnectedDepOnRefInput.defaultProps = {
    addField: true,
};

export default ConnectedDepOnRefInput;
