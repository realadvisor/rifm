// @flow

import * as React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { Value } from 'react-powerplug';
import { Rifm } from '../src';
import { dateFormat } from '../docs/format.js';
import {
  InputEmulator,
  renderInputState,
  type InputCommand,
} from './utils/InputEmulator';

test('mask behaviour', async () => {
  const snaphot = [];
  let getVal = null;
  let execCommand = null;
  let stateValue_ = null;

  TestRenderer.create(
    <Value initial={''}>
      {input => {
        stateValue_ = input.value;

        return (
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
        );
      }}
    </Value>
  );

  const exec = (cmd: InputCommand) => {
    if (!execCommand || !getVal) {
      throw Error('rifm is not initialized');
    }

    act(() => {
      if (!execCommand) {
        throw Error('rifm is not initialized');
      }

      execCommand(cmd);
    });

    expect(stateValue_).toEqual(getVal().value);
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

test('mask behaviour with bad symbols', async () => {
  const snaphot = [];
  let getVal = null;
  let execCommand = null;
  let stateValue_ = null;

  TestRenderer.create(
    <Value initial={''}>
      {input => {
        stateValue_ = input.value;

        return (
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
        );
      }}
    </Value>
  );

  const exec = cmd => {
    if (!execCommand || !getVal) {
      throw Error('rifm is not initialized');
    }

    act(() => {
      if (!execCommand) {
        throw Error('rifm is not initialized');
      }

      execCommand(cmd);
    });

    expect(stateValue_).toEqual(getVal().value);
    snaphot.push({ ...getVal(), cmd, withCaret: renderInputState(getVal()) });
  };

  exec({ type: 'PUT_SYMBOL', payload: '18081978' });
  exec({ type: 'MOVE_CARET', payload: -4 });
  exec({ type: 'PUT_SYMBOL', payload: 'x' });

  expect(snaphot).toMatchSnapshot();
});

test('mask behaviour with delete', async () => {
  const snaphot = [];
  let getVal = null;
  let execCommand = null;
  let stateValue_ = null;

  TestRenderer.create(
    <Value initial={''}>
      {input => {
        stateValue_ = input.value;

        return (
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
        );
      }}
    </Value>
  );

  const exec = cmd => {
    if (!execCommand || !getVal) {
      throw Error('rifm is not initialized');
    }

    act(() => {
      if (!execCommand) {
        throw Error('rifm is not initialized');
      }

      execCommand(cmd);
    });

    expect(stateValue_).toEqual(getVal().value);
    snaphot.push({ ...getVal(), cmd, withCaret: renderInputState(getVal()) });
  };

  exec({ type: 'PUT_SYMBOL', payload: '18081978' });
  exec({ type: 'MOVE_CARET', payload: -4 });
  exec({ type: 'DELETE' });
  exec({ type: 'DELETE' });
  exec({ type: 'DELETE' });
  exec({ type: 'DELETE' });
  exec({ type: 'DELETE' });
  exec({ type: 'PUT_SYMBOL', payload: '1978' });
  exec({ type: 'MOVE_CARET', payload: -100 });
  exec({ type: 'DELETE' });
  exec({ type: 'DELETE' });
  exec({ type: 'PUT_SYMBOL', payload: '18' });
  exec({ type: 'MOVE_CARET', payload: 1 });
  exec({ type: 'DELETE' });
  exec({ type: 'PUT_SYMBOL', payload: '8' });
  exec({ type: 'MOVE_CARET', payload: 2 });
  exec({ type: 'DELETE' });
  exec({ type: 'DELETE' });
  exec({ type: 'DELETE' });
  exec({ type: 'PUT_SYMBOL', payload: '78' });
  exec({ type: 'MOVE_CARET', payload: -5 });
  exec({ type: 'DELETE' });

  expect(snaphot).toMatchSnapshot();
});

test('mask works even if state is not updated on equal vals', async () => {
  const snaphot = [];
  let getVal = null;
  let execCommand = null;
  let stateValue_ = null;
  let callCount_ = 0;

  TestRenderer.create(
    <Value initial={''}>
      {input => {
        stateValue_ = input.value;

        return (
          <Rifm
            replace={v => v.length >= 10}
            value={input.value}
            onChange={v => {
              if (input.value !== v) {
                callCount_++;
                input.set(v);
              }
            }}
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
        );
      }}
    </Value>
  );

  const exec = cmd => {
    if (!execCommand || !getVal) {
      throw Error('rifm is not initialized');
    }

    act(() => {
      if (!execCommand) {
        throw Error('rifm is not initialized');
      }

      execCommand(cmd);
    });

    expect(stateValue_).toEqual(getVal().value);
    snaphot.push({ ...getVal(), cmd, withCaret: renderInputState(getVal()) });
  };

  exec({ type: 'PUT_SYMBOL', payload: '18081978' });
  exec({ type: 'MOVE_CARET', payload: -100 });
  exec({ type: 'PUT_SYMBOL', payload: '18081978' });
  exec({ type: 'MOVE_CARET', payload: -4 });
  exec({ type: 'PUT_SYMBOL', payload: '1978' });
  exec({ type: 'MOVE_CARET', payload: -4 });
  exec({ type: 'BACKSPACE' });
  exec({ type: 'DELETE' });

  exec({ type: 'PUT_SYMBOL', payload: 'x' });
  exec({ type: 'MOVE_CARET', payload: -1 });
  exec({ type: 'PUT_SYMBOL', payload: 'x' });
  exec({ type: 'MOVE_CARET', payload: -1 });
  exec({ type: 'PUT_SYMBOL', payload: '1' });

  expect(callCount_).toEqual(1);

  expect(snaphot).toMatchSnapshot();
});
