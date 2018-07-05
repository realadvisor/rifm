// @flow

import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { Value } from 'react-powerplug';
import { Rifm } from '../src';
import { numberFormat } from '../docs/format.js';

declare var test: Function;
declare var expect: Function;
declare var jest: Object;

const makeEvt = (value: string, start: number, end?: number = start) => ({
  target: {
    value,
    selectionStart: start,
    selectionEnd: end,
  },
});

test('number comma format', () => {
  const onChangeFn = jest.fn();
  let rifm = null;

  const renderer = TestRenderer.create(
    <Value initial="" onChange={onChangeFn}>
      {input => (
        <Rifm value={input.value} onChange={input.set} format={numberFormat}>
          {_rifm => {
            rifm = _rifm;
            return null;
          }}
        </Rifm>
      )}
    </Value>
  );
  if (!rifm) {
    throw Error('rifm is not initialized');
  }

  rifm.onChange(makeEvt(`111`, 2));
  expect(rifm.value).toEqual(`111`);
  expect(onChangeFn).lastCalledWith(`111`);

  rifm.onChange(makeEvt(`1111`, 3));
  expect(rifm.value).toEqual(`1,111`);
  expect(onChangeFn).lastCalledWith(`1,111`);
});
