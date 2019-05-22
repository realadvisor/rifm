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

  return (
    <React.Fragment>
      <div>Lower case</div>
      <Rifm
        refuse={/$^/}
        format={v => v.toLowerCase()}
        value={lowercase}
        onChange={setLowercase}
      >
        {renderInput}
      </Rifm>

      <div>Upper case</div>
      <Rifm
        refuse={/$^/}
        format={v => v.toUpperCase()}
        value={uppercase}
        onChange={setUppercase}
      >
        {renderInput}
      </Rifm>

      <div>Capital first letter</div>
      <Rifm
        refuse={/$^/}
        format={v => v.slice(0, 1).toUpperCase() + v.slice(1).toLowerCase()}
        value={capitalized}
        onChange={setCapitalized}
      >
        {renderInput}
      </Rifm>
    </React.Fragment>
  );
};

ReactDOM.render(<Example />, document.getElementById('root'));
