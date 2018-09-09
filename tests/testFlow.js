/* @flow */
import * as React from 'react';
import { Value } from 'react-powerplug';
import { Rifm } from '../src';
import { css } from 'emotion';

const numberFormat = (str: string) => {
  const r = parseInt(str.replace(/[^\d]+/gi, ''), 10);
  return r ? r.toLocaleString('ch') : '';
};

export const TestFlow = () => (
  <Value initial={''}>
    {text => (
      <Rifm value={text.value} onChange={text.set} format={numberFormat}>
        {({ value, onChange }) => (
          <input
            value={value}
            onChange={onChange}
            className={css({ textAlign: 'right' })}
          />
        )}
      </Rifm>
    )}
  </Value>
);
