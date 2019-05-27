/* @flow */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Rifm } from 'rifm';

const Example = () /*:React.Node*/ => {
  const [lowercase, setLowercase] = React.useState('');
  const [uppercase, setUppercase] = React.useState('');
  const [capitalized, setCapitalized] = React.useState('');
  const [latinLetters, setLatinLetters] = React.useState('');

  return (
    <Grid>
      <div>
        <div>Lower case</div>
        <Rifm
          accept={/./g}
          format={v => v.toLowerCase()}
          value={lowercase}
          onChange={setLowercase}
        >
          {renderInput}
        </Rifm>
      </div>

      <div>
        <div>Upper case</div>
        <Rifm
          accept={/./g}
          format={v => v.toUpperCase()}
          value={uppercase}
          onChange={setUppercase}
        >
          {renderInput}
        </Rifm>
      </div>

      <div>
        <div>Capital first letter</div>
        <Rifm
          accept={/./g}
          format={v => v.slice(0, 1).toUpperCase() + v.slice(1).toLowerCase()}
          value={capitalized}
          onChange={setCapitalized}
        >
          {renderInput}
        </Rifm>
      </div>

      <div>
        <div>Allow latin letters only</div>
        <Rifm
          accept={/[a-zA-Z]/g}
          format={v => (v.match(/[a-zA-Z]/g) || []).join('')}
          value={latinLetters}
          onChange={setLatinLetters}
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
