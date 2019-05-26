import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Rifm } from 'rifm';
import { AsYouType } from 'libphonenumber-js';

const renderInput = ({ value, onChange }) => (
  <input type="tel" value={value} onChange={onChange} />
);

const parseDigits = string => (string.match(/\d+/g) || []).join('');

const formatPhone = string => {
  const digits = parseDigits(string).substr(0, 10);
  return new AsYouType('US').input(digits);
};

const Example = () => {
  const [phone, setPhone] = React.useState('');

  return (
    <React.Fragment>
      <div>Phone format</div>
      <Rifm
        refuse={/[^\d]+/g}
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
