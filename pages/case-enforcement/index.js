/* @flow */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Rifm } from 'rifm';

const renderInput = ({ value, onChange }) => (
  <input value={value} onChange={onChange} />
);

const Example = () => {
  const [lowercase, setLowercase] = React.useState('');
  const [uppercase, setUppercase] = React.useState('');
  const [capitalized, setCapitalized] = React.useState('');
  const [latinLetters, setLatinLetters] = React.useState('');

  return (
    <React.Fragment>
      <div>Lower case</div>
      <Rifm
        accept={/./g}
        format={v => v.toLowerCase()}
        value={lowercase}
        onChange={setLowercase}
      >
        {renderInput}
      </Rifm>

      <div>Upper case</div>
      <Rifm
        accept={/./g}
        format={v => v.toUpperCase()}
        value={uppercase}
        onChange={setUppercase}
      >
        {renderInput}
      </Rifm>

      <div>Capital first letter</div>
      <Rifm
        accept={/./g}
        format={v => v.slice(0, 1).toUpperCase() + v.slice(1).toLowerCase()}
        value={capitalized}
        onChange={setCapitalized}
      >
        {renderInput}
      </Rifm>

      <div>Allow latin letters only</div>
      <Rifm
        accept={/[a-zA-Z]/g}
        format={v => (v.match(/[a-zA-Z]/g) || []).join('')}
        value={latinLetters}
        onChange={setLatinLetters}
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
