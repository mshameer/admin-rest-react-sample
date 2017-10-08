import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import getDefaultValues from 'admin-on-rest/lib/mui/form/getDefaultValues';
import FormInput from 'admin-on-rest/lib/mui/form/FormInput';
import Toolbar from 'admin-on-rest/lib/mui/form/Toolbar';

import { createAuthUser, updateAuthUser } from './actions';

const formStyle = { padding: '0 1em 1em 1em' };

export class SimpleForm extends Component {
    handleSubmitWithRedirect = (redirect = this.props.redirect) =>
      this.props.handleSubmit(values => {

        if(this.props.action === 'update') {
          this.props.updateUser(values);
        } else {
          this.props.createUser({
            ...values,
            password: Math.random().toString(36).slice(-8),
          });
        }
      });

    render() {
        const {
            basePath,
            children,
            invalid,
            record,
            resource,
            submitOnEnter,
            toolbar,
        } = this.props;

        return (
            <form className="simple-form">
                <div style={formStyle}>
                    {Children.map(children, input => (
                        <FormInput
                            basePath={basePath}
                            input={input}
                            record={record}
                            resource={resource}
                        />
                    ))}
                </div>
                {toolbar &&
                    React.cloneElement(toolbar, {
                        handleSubmitWithRedirect: this.handleSubmitWithRedirect,
                        invalid,
                        submitOnEnter,
                    })}
            </form>
        );
    }
}

SimpleForm.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    handleSubmit: PropTypes.func, // passed by redux-form
    invalid: PropTypes.bool,
    record: PropTypes.object,
    resource: PropTypes.string,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    save: PropTypes.func, // the handler defined in the parent, which triggers the REST submission
    submitOnEnter: PropTypes.bool,
    toolbar: PropTypes.element,
    validate: PropTypes.func,
    createUser: PropTypes.func,
    updateUser: PropTypes.func,
    action: PropTypes.string,
};

SimpleForm.defaultProps = {
    submitOnEnter: true,
    action: 'create',
    toolbar: <Toolbar />,
};

const enhance = compose(
    connect((state, props) => ({
        initialValues: getDefaultValues(state, props),
    }),{
      createUser: createAuthUser,
      updateUser: updateAuthUser,
    }),
    reduxForm({
        form: 'record-form',
        enableReinitialize: true,
    })
);

export default enhance(SimpleForm);
