/* @flow */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Rifm } from 'rifm';

const renderInput = ({ value, onChange }) => (
  // type=number is not allowed
  <input
    type="tel"
    style={{ textAlign: 'right' }}
    value={value}
    onChange={onChange}
  />
);

// To prevent parseInt overflow you can use `maxLength` on input field
// or write your own numberFormat.

const integerAccept = /\d+/g;

const parseInteger = string => (string.match(integerAccept) || []).join('');

const formatInteger = string => {
  const parsed = parseInteger(string);
  const number = Number.parseInt(parsed, 10);
  if (Number.isNaN(number)) {
    return '';
  }
  return number.toLocaleString('en');
};

const negativeAccept = /[\d-]+/g;

const parseNegative = string => (string.match(negativeAccept) || []).join('');

const formatNegative = string => {
  const parsed = parseNegative(string);
  if (parsed === '-') {
    return '-';
  }
  const number = Number.parseInt(parsed, 10);
  if (Number.isNaN(number)) {
    return '';
  }
  return number.toLocaleString('en');
};

const numberAccept = /[\d.]+/g;

const parseNumber = string => (string.match(numberAccept) || []).join('');

const formatNumber = (string, scale, fixed) => {
  const parsed = parseNumber(string);
  const [head, tail] = parsed.split('.');
  const scaledTail = tail != null ? tail.slice(0, scale) : '';

  let number = Number.parseFloat(`${head}.${scaledTail}`);

  // For fixed format numbers deleting "." must be no-op
  // as imagine u have 123.45 then delete "." and get 12345.00 looks bad in UI
  // so we transform here 12345 into 123.45 instead of 12345.00.
  // The main disadvantage of this, that you need carefully check input value
  // that it always has fractional part
  if (scale > 0 && fixed && tail == null) {
    const paddedHead = head.padStart(scale + 1 - head.length, '0');
    number = Number.parseFloat(
      `${paddedHead.slice(0, -scale)}.${paddedHead.slice(-scale)}`
    );
  }

  if (Number.isNaN(number)) {
    return '';
  }

  const formatted = number.toLocaleString('de-CH', {
    minimumFractionDigits: fixed ? scale : 0,
    maximumFractionDigits: scale,
  });

  if (!fixed && parsed.includes('.')) {
    const [formattedHead] = formatted.split('.');
    return `${formattedHead}.${
      // skip zero at scale position for non fixed floats
      // as at scale 2 for non fixed floats numbers like 1.50 has no sense, just 1.5 allowed
      // but 1.0 has sense as otherwise you will not be able to enter 1.05 for example
      scaledTail !== '' && scaledTail[scale - 1] === '0'
        ? scaledTail.slice(0, -1)
        : scaledTail
    }`;
  }
  return formatted;
};

// 2 in m^2 should not be a number to not match regexp
const formatMeters = string => formatNumber(string, 2, false) + ' m\u00B2';

const formatCurrency = string => '$' + formatNumber(string, 2, false);

const Example = () => {
  const [integer, setInteger] = React.useState('12345');
  const [negative, setNegative] = React.useState('12345');
  const [variableFloat, setVariableFloat] = React.useState('12345');
  const [fixedFloat, setFixedFloat] = React.useState('12345');

  return (
    <React.Fragment>
      <div>Integer number format: {integer}</div>
      <Rifm
        accept={/\d/g}
        format={formatInteger}
        value={formatInteger(integer)}
        onChange={value => setInteger(parseInteger(value))}
      >
        {renderInput}
      </Rifm>

      <div>Negative number format: {negative}</div>
      <Rifm
        accept={/[\d-]/g}
        format={formatNegative}
        value={formatNegative(negative)}
        onChange={value => setNegative(parseNegative(value))}
      >
        {renderInput}
      </Rifm>

      <div>Number with fractional part: {fixedFloat}</div>
      <Rifm
        accept={/[\d.]/g}
        format={v => formatNumber(v, 2, true)}
        // 00 is needed here see disadvantages comment at formatNumber
        value={formatNumber(`${fixedFloat}00`, 2, true)}
        onChange={value => setFixedFloat(parseNumber(value))}
      >
        {renderInput}
      </Rifm>

      <div>Number with variable fractional part: {variableFloat}</div>
      <Rifm
        accept={/[\d.]/g}
        format={v => formatNumber(v, 2, false)}
        value={formatNumber(variableFloat, 2, false)}
        onChange={value => setVariableFloat(parseNumber(value))}
      >
        {renderInput}
      </Rifm>

      <div>Square meters number: {variableFloat}</div>
      <Rifm
        accept={/[\d.]/g}
        format={formatMeters}
        value={formatMeters(variableFloat)}
        onChange={value => setVariableFloat(parseNumber(value))}
      >
        {renderInput}
      </Rifm>

      <div>Currency number: {variableFloat}</div>
      <Rifm
        // $ need to be in regexp to prevent cursor jumping on backspace
        accept={/[\d.$]/g}
        format={formatCurrency}
        value={formatCurrency(variableFloat)}
        onChange={value => setVariableFloat(parseNumber(value))}
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
