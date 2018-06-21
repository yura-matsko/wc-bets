import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';

const RadioComponent = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    value={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

export default RadioComponent;
