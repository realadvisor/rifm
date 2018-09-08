// @flow

import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { Value } from 'react-powerplug';
import { Rifm } from '../src';
import { numberFormat, currencyFormat2 } from '../docs/format';
import {
  InputEmulator,
  renderInputState,
  type InputCommand,
} from './utils/InputEmulator';

test('format works', async () => {
  const snaphot = [];
  let getVal = null;
  let execCommand = null;

  TestRenderer.create(
    <Value initial={''}>
      {input => (
        <Rifm value={input.value} onChange={input.set} format={numberFormat}>
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

  const exec = (cmd: InputCommand) => {
    if (!execCommand || !getVal) {
      throw Error('rifm is not initialized');
    }

    execCommand(cmd);
    snaphot.push({ ...getVal(), cmd, withCaret: renderInputState(getVal()) });
  };

  exec({ type: 'PUT_SYMBOL', payload: '1' });
  exec({ type: 'PUT_SYMBOL', payload: '46' });
  exec({ type: 'MOVE_CARET', payload: -2 });
  exec({ type: 'PUT_SYMBOL', payload: '23' });
  exec({ type: 'MOVE_CARET', payload: 1 });
  exec({ type: 'PUT_SYMBOL', payload: '5' });

  exec({ type: 'MOVE_CARET', payload: -2 });
  exec({ type: 'PUT_SYMBOL', payload: '9' });
  exec({ type: 'PUT_SYMBOL', payload: '8' });

  exec({ type: 'BACKSPACE' });
  exec({ type: 'BACKSPACE' });
  exec({ type: 'MOVE_CARET', payload: 1 });
  exec({ type: 'BACKSPACE' });
  exec({ type: 'MOVE_CARET', payload: 100 });
  exec({ type: 'BACKSPACE' });
  exec({ type: 'MOVE_CARET', payload: -100 });
  exec({ type: 'MOVE_CARET', payload: 1 });
  exec({ type: 'BACKSPACE' });
  exec({ type: 'PUT_SYMBOL', payload: '1' });
  exec({ type: 'PUT_SYMBOL', payload: 'x' });

  expect(snaphot).toMatchSnapshot();
});

test('format with custom refuse works', async () => {
  const snaphot = [];
  let getVal = null;
  let execCommand = null;

  TestRenderer.create(
    <Value initial={''}>
      {input => (
        <Rifm
          refuse={/[^\d.]/gi}
          value={input.value}
          onChange={input.set}
          format={currencyFormat2}
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

  const exec = (cmd: InputCommand) => {
    if (!execCommand || !getVal) {
      throw Error('rifm is not initialized');
    }

    execCommand(cmd);
    snaphot.push({ ...getVal(), cmd, withCaret: renderInputState(getVal()) });
  };

  exec({ type: 'PUT_SYMBOL', payload: '1' });
  exec({ type: 'PUT_SYMBOL', payload: '46' });
  exec({ type: 'MOVE_CARET', payload: -2 });
  exec({ type: 'PUT_SYMBOL', payload: '23' });
  exec({ type: 'MOVE_CARET', payload: 1 });
  exec({ type: 'PUT_SYMBOL', payload: '5' });

  exec({ type: 'MOVE_CARET', payload: -2 });
  exec({ type: 'PUT_SYMBOL', payload: '9' });
  exec({ type: 'PUT_SYMBOL', payload: '8' });

  exec({ type: 'BACKSPACE' });
  exec({ type: 'BACKSPACE' });
  exec({ type: 'MOVE_CARET', payload: 1 });
  exec({ type: 'BACKSPACE' });
  exec({ type: 'MOVE_CARET', payload: 100 });
  exec({ type: 'BACKSPACE' });
  exec({ type: 'MOVE_CARET', payload: -100 });
  exec({ type: 'MOVE_CARET', payload: 1 });
  exec({ type: 'BACKSPACE' });
  exec({ type: 'PUT_SYMBOL', payload: '1' });
  exec({ type: 'PUT_SYMBOL', payload: 'x' });
  exec({ type: 'MOVE_CARET', payload: 100 });
  exec({ type: 'PUT_SYMBOL', payload: '.' });
  exec({ type: 'PUT_SYMBOL', payload: '0' });
  exec({ type: 'PUT_SYMBOL', payload: '0' });
  exec({ type: 'MOVE_CARET', payload: -2 });
  exec({ type: 'BACKSPACE' });
  exec({ type: 'MOVE_CARET', payload: -1 });
  exec({ type: 'PUT_SYMBOL', payload: '.' });
  exec({ type: 'MOVE_CARET', payload: -3 });
  exec({ type: 'PUT_SYMBOL', payload: '.' });
  exec({ type: 'MOVE_CARET', payload: -1 });
  exec({ type: 'BACKSPACE' });
  exec({ type: 'BACKSPACE' });

  expect(snaphot).toMatchSnapshot();
});
