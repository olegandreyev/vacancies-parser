/**
 * Created by Olejka on 16.03.2017.
 */

import React from 'react'
import {TextField, Checkbox, RadioButtonGroup, SelectField} from 'material-ui'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={touched && error}
               {...input}
               {...custom}
    />
);

const renderCheckbox = ({ input, label }) => (
    <Checkbox label={label}
              checked={!!input.value}
              onCheck={input.onChange}/>
);

const renderRadioGroup = ({ input, ...rest }) => (
    <RadioButtonGroup {...input} {...rest}
                      valueSelected={input.value}
                      onChange={(event, value) => input.onChange(value)}/>
);

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
    <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}/>
);

export {
    renderCheckbox,
    renderSelectField,
    renderTextField,
    renderRadioGroup
}

export client from './client'