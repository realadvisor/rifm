// @flow

import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { Value } from 'react-powerplug';
import { Rifm } from '../src';
import { numberFormat, dateFormat } from '../docs/format.js';
import { InputEmulator, renderInputState } from './utils/InputEmulator';

declare var test: Function;
declare var expect: Function;
declare var jest: Object;

const makeEvt = (
  value: string,
  start: number,
  end?: number = start
): SyntheticInputEvent<HTMLInputElement> =>
  ({
    target: {
      value,
      selectionStart: start,
      selectionEnd: end,
    },
  }: any);

test('number comma format', () => {
  const onChangeFn = jest.fn();
  let rifm = null;

  TestRenderer.create(
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

test('mask behaviour', async () => {
  const snaphot = [];
  let getVal = null;
  let execCommand = null;

  TestRenderer.create(
    <Value initial={''}>
      {input => (
        <Rifm
          replace={v => v.length >= 10}
          value={input.value}
          onChange={input.set}
          format={dateFormat}
        >
          {({ value, onChange }) => (
            <InputEmulator value={value} onChange={onChange}>
              {(exec, val) => {
                execCommand = exec;
                getVal = val;
                return null;
              }}
            </InputEmulator>
          )}
        </Rifm>
      )}
    </Value>
  );

  const exec = cmd => {
    if (!execCommand || !getVal) {
      throw Error('rifm is not initialized');
    }

    execCommand(cmd);
    snaphot.push({ ...getVal(), cmd, withCaret: renderInputState(getVal()) });
  };

  exec({ type: 'PUT_SYMBOL', payload: '1' });
  exec({ type: 'PUT_SYMBOL', payload: '23' });
  exec({ type: 'MOVE_CARET', payload: -1 });
  exec({ type: 'PUT_SYMBOL', payload: '4' });
  exec({ type: 'MOVE_CARET', payload: -100 }); // -100 at begin

  exec({ type: 'PUT_SYMBOL', payload: '5' });
  exec({ type: 'PUT_SYMBOL', payload: '6' });
  exec({ type: 'MOVE_CARET', payload: +100 }); // 100 at end
  exec({ type: 'PUT_SYMBOL', payload: '789' });
  // now check that replace works
  exec({ type: 'MOVE_CARET', payload: -4 });
  exec({ type: 'PUT_SYMBOL', payload: '9' });
  exec({ type: 'PUT_SYMBOL', payload: '8' });
  exec({ type: 'PUT_SYMBOL', payload: '7' });
  exec({ type: 'PUT_SYMBOL', payload: '6' });

  exec({ type: 'BACKSPACE' });
  exec({ type: 'PUT_SYMBOL', payload: '6' });

  exec({ type: 'MOVE_CARET', payload: -3 });
  exec({ type: 'BACKSPACE' });

  exec({ type: 'PUT_SYMBOL', payload: '0' });

  exec({ type: 'BACKSPACE' });
  exec({ type: 'PUT_SYMBOL', payload: '01' });

  exec({ type: 'PUT_SYMBOL', payload: '2345678' });

  exec({ type: 'MOVE_CARET', payload: -100 }); // -100 at begin
  exec({ type: 'MOVE_CARET', payload: 2 });

  exec({ type: 'BACKSPACE' });
  exec({ type: 'BACKSPACE' });

  exec({ type: 'PUT_SYMBOL', payload: '9876' });
  exec({ type: 'PUT_SYMBOL', payload: '5' });

  expect(snaphot).toMatchSnapshot();
});
