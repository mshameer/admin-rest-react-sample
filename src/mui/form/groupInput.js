import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import Checkbox from 'material-ui/Checkbox';
import muiThemeable from 'material-ui/styles/muiThemeable';
import compose from 'recompose/compose';

import FieldTitle from 'admin-on-rest/lib/util/FieldTitle';
import translate from 'admin-on-rest/lib/i18n/translate';
import {List, ListItem} from 'material-ui/List';

const getStyles = muiTheme => {
    const {
        baseTheme,
        textField: { floatingLabelColor, backgroundColor },
    } = muiTheme;

    return {
        labelContainer: {
            fontSize: 16,
            lineHeight: '24px',
            display: 'inline-block',
            position: 'relative',
            backgroundColor,
            fontFamily: baseTheme.fontFamily,
            cursor: 'auto',
            marginTop: 14,
        },
        label: {
            color: floatingLabelColor,
            lineHeight: '22px',
            zIndex: 1,
            transform: 'scale(0.75)',
            transformOrigin: 'left top',
            pointerEvents: 'none',
            userSelect: 'none',
        },
    };
};

export class CheckboxGroupInputComponent extends Component {
    componentDidMount() {
      const { input: { value } } = this.props;
      this.value = value;
    }
    handleCheck = (event, isChecked) => {
        const { input: { value, onChange } } = this.props;

        if (isChecked) {
            onChange([...value, ...[event.target.value]]);
        } else {
            onChange(value.filter(v => v != event.target.value));
        }
    };

    renderCheckbox = choice => {
        const {
            input: { value },
            optionText,
            optionValue,
            options,
            translate,
            disabled,
            translateChoice,
            secondary,
        } = this.props;
        const disStatus =  disabled && disabled(choice) ? ( this.value && this.value.find(v => v == get(choice, optionValue)) ?  false :  true ) : false;
        const choiceName = React.isValidElement(optionText) // eslint-disable-line no-nested-ternary
            ? React.cloneElement(optionText, { record: choice })
            : typeof optionText === 'function'
              ? optionText(choice)
              : get(choice, optionText);
        return (
        <ListItem
          key={get(choice, optionValue)}
          leftCheckbox={<Checkbox
              checked={
                  value ? (
                      value.find(v => v == get(choice, optionValue)) !==
                      undefined
                  ) : (
                      false
                  )
              }
              onCheck={this.handleCheck}
              disabled={disStatus}
              value={get(choice, optionValue)}
              {...options}
          />}
          primaryText={
              translateChoice ? (
                  translate(choiceName, { _: choiceName })
              ) : (
                  choiceName
              )
          }
          secondaryText={get(choice, secondary)}
        />);
    };

    render() {
        const {
            choices,
            isRequired,
            label,
            muiTheme,
            resource,
            source,
        } = this.props;
        const styles = getStyles(muiTheme);
        const { prepareStyles } = muiTheme;

        return (
            <div>
                <div style={prepareStyles(styles.labelContainer)}>
                    <div style={prepareStyles(styles.label)}>
                        <FieldTitle
                            label={label}
                            source={source}
                            resource={resource}
                            isRequired={isRequired}
                        />
                    </div>
                </div>
                <List>
                  {choices.map(this.renderCheckbox)}
                </List>
            </div>
        );
    }
}

CheckboxGroupInputComponent.propTypes = {
    addField: PropTypes.bool.isRequired,
    choices: PropTypes.arrayOf(PropTypes.object),
    label: PropTypes.string,
    source: PropTypes.string,
    options: PropTypes.object,
    input: PropTypes.shape({
        onChange: PropTypes.func.isRequired,
    }),
    isRequired: PropTypes.bool,
    optionText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.element,
    ]).isRequired,
    optionValue: PropTypes.string.isRequired,
    resource: PropTypes.string,
    translate: PropTypes.func.isRequired,
    translateChoice: PropTypes.bool.isRequired,
    muiTheme: PropTypes.object.isRequired,
    disabled: PropTypes.func,
    secondary: PropTypes.string,
};

CheckboxGroupInputComponent.defaultProps = {
    addField: true,
    choices: [],
    options: {},
    optionText: 'name',
    optionValue: 'id',
    translateChoice: true,
};

const enhance = compose(translate, muiThemeable());

const CheckboxGroupInput = enhance(CheckboxGroupInputComponent);

CheckboxGroupInput.propTypes = {
    addField: PropTypes.bool.isRequired,
};

CheckboxGroupInput.defaultProps = {
    addField: true,
};

export default CheckboxGroupInput;
