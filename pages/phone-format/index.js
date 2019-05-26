/* @flow */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Rifm } from 'rifm';
import { AsYouType } from 'libphonenumber-js';

const parseDigits = string => (string.match(/\d+/g) || []).join('');

const formatPhone = string => {
  const digits = parseDigits(string).substr(0, 10);
  return new AsYouType('US').input(digits);
};

const Example = () /*:React.Node*/ => {
  const [phone, setPhone] = React.useState('');

  return (
    <Grid>
      <div>
        <div>Phone format</div>
        <Rifm
          accept={/\d+/g}
          // do not jump after ) until see number before
          replace={
            phone.length < 6 && /[^\d]+/.test(phone[3])
              ? undefined
              : v => v.length >= 14
          }
          format={formatPhone}
          value={formatPhone(phone)}
          onChange={setPhone}
        >
          {renderInput}
        </Rifm>
      </div>
    </Grid>
  );
};

const renderInput = ({ value, onChange }) => (
  <input
    style={{
      width: '100%',
      height: 32,
      fontSize: 'inherit',
      boxSizing: 'border-box',
    }}
    value={value}
    onChange={onChange}
  />
);

const Grid = ({ children }) => {
  return (
    <div
      style={{
        display: 'grid',
        padding: 16,
        gap: 24,
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        alignItems: 'end',
      }}
    >
      {children}
    </div>
  );
};

if (typeof document !== 'undefined') {
  const root = document.getElementById('root');
  if (root) {
    ReactDOM.render(<Example />, root);
  }
}

export default Example;
