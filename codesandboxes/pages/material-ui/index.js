import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Rifm } from 'rifm';
import { TextField } from '@material-ui/core';

const Example = () => {
  const [number, setNumber] = React.useState('');

  return (
    <React.Fragment>
      <div>Number format with material-ui text field</div>
      <Rifm format={string => string} value={number} onChange={setNumber}>
        {({ value, onChange }) => (
          <TextField
            type="tel"
            variant="filled"
            label="Number input"
            placeholder="Enter number..."
            value={value}
            onChange={onChange}
          />
        )}
      </Rifm>
    </React.Fragment>
  );
};

if (typeof document !== 'undefined') {
  const root = document.getElementById('root');
  if (root) {
    ReactDOM.render(<Example />, root);
  }
}

export default Example;
