/* @flow */

import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { Value } from 'react-powerplug';
import { InputEmulator, renderInputState } from './InputEmulator';

declare var test: Function;
declare var expect: Function;
declare var jest: Object;

test('Input emulator commands test', () => {
  let getVal = null;
  let execCommand = null;
  let snaphot = [];
  let reactVal = '';

  TestRenderer.create(
    <Value
      initial=""
      onChange={v => {
        reactVal = v;
      }}
    >
      {input => (
        <InputEmulator
          value={input.value}
          onChange={event => input.set(event.target.value)}
        >
          {(exec, val) => {
            execCommand = exec;
            getVal = val;
            return null;
          }}
        </InputEmulator>
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
  exec({ type: 'PUT_SYMBOL', payload: '34' });
  exec({ type: 'MOVE_CARET', payload: -2 });
  exec({ type: 'PUT_SYMBOL', payload: '2' });
  exec({ type: 'MOVE_CARET', payload: 100 });
  exec({ type: 'PUT_SYMBOL', payload: '5' });
  exec({ type: 'MOVE_CARET', payload: -100 });
  exec({ type: 'PUT_SYMBOL', payload: '0' });
  exec({ type: 'PUT_SYMBOL', payload: 'd' });
  exec({ type: 'BACKSPACE' });
  exec({ type: 'BACKSPACE' });
  exec({ type: 'BACKSPACE' });
  exec({ type: 'MOVE_CARET', payload: 100 });
  exec({ type: 'BACKSPACE' });
  exec({ type: 'MOVE_CARET', payload: -1 });
  exec({ type: 'BACKSPACE' });
  exec({ type: 'PUT_SYMBOL', payload: '3' });
  exec({ type: 'MOVE_CARET', payload: 100 });
  exec({ type: 'DELETE' });
  exec({ type: 'MOVE_CARET', payload: -1 });
  exec({ type: 'DELETE' });
  exec({ type: 'MOVE_CARET', payload: -2 });
  exec({ type: 'DELETE' });
  exec({ type: 'MOVE_CARET', payload: -100 });
  exec({ type: 'DELETE' });
  exec({ type: 'DELETE' });
  exec({ type: 'DELETE' });

  expect(reactVal).toEqual(getVal && getVal().value);

  expect(snaphot).toMatchSnapshot();
});

test('Input emulator work as React if values dont match', () => {
  let getVal = null;
  let execCommand = null;
  let snaphot = [];
  let badSymbol = '';

  TestRenderer.create(
    <Value initial="">
      {input => (
        <InputEmulator
          value={badSymbol + input.value}
          onChange={event => input.set(event.target.value)}
        >
          {(exec, val) => {
            execCommand = exec;
            getVal = val;
            return null;
          }}
        </InputEmulator>
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
  exec({ type: 'PUT_SYMBOL', payload: '2' });
  exec({ type: 'MOVE_CARET', payload: -100 });
  badSymbol = '-';
  // cursor should move at the end of input
  exec({ type: 'PUT_SYMBOL', payload: '3' });

  expect(snaphot).toMatchSnapshot();
});

test('renderInputState test', () => {
  const snaphot = [];

  snaphot.push(
    renderInputState({
      value: 'hello',
      selectionStart: 1,
      selectionEnd: 4,
    })
  );

  snaphot.push(
    renderInputState({
      value: 'hello',
      selectionStart: 0,
      selectionEnd: 5,
    })
  );

  snaphot.push(
    renderInputState({
      value: 'hello',
      selectionStart: 5,
      selectionEnd: 5,
    })
  );

  snaphot.push(
    renderInputState({
      value: 'hello',
      selectionStart: 0,
      selectionEnd: 0,
    })
  );

  snaphot.push(
    renderInputState({
      value: 'hello',
      selectionStart: 2,
      selectionEnd: 2,
    })
  );

  expect(() =>
    renderInputState({
      value: 'hello',
      selectionStart: 2,
      selectionEnd: 1,
    })
  ).toThrow();

  expect(snaphot).toMatchSnapshot();
});
