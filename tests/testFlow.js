/* @flow */
import * as React from 'react';
import { Value } from 'react-powerplug';
import { TMask } from '../src';
import { css } from 'emotion';

const numberFormat = str => {
  const r = parseInt(str.replace(/[^\d]+/gi, ''), 10);
  return r ? r.toLocaleString('ch') : '';
};

export const TestFlow = () => (
  <Value initial={''}>
    {text => (
      <TMask value={text.value} onChange={text.set} format={numberFormat}>
        {({ value, onChange }) => (
          <input
            value={value}
            onChange={onChange}
            className={css({ textAlign: 'right' })}
          />
        )}
      </TMask>
    )}
  </Value>
);
