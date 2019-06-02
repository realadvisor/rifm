/* @flow */
import * as React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { Value } from 'react-powerplug';
import { Rifm } from '../../src';
import {
  InputEmulator,
  renderInputState,
  type InputCommand,
} from './InputEmulator';

type Props = {|
  accept?: RegExp,
  // replace?: string => boolean,
  mask?: boolean,
  format: (str: string) => string,
  replace?: (str: string) => string,
  maskFn?: string => boolean,
|};

export const createExec = (props: Props) => {
  let getVal = null;
  let execCommand = null;
  let stateValue_ = null;

  TestRenderer.create(
    <Value initial={''}>
      {input => {
        stateValue_ = input.value;

        return (
          <Rifm
            value={input.value}
            onChange={input.set}
            accept={props.accept}
            format={props.format}
            replace={props.replace}
            mask={
              props.mask != null
                ? props.mask
                : props.maskFn != null
                ? props.maskFn(input.value)
                : undefined
            }
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
    act(() => {
      if (!execCommand) {
        throw Error('rifm is not initialized');
      }

      execCommand(cmd);
    });

    if (getVal == null || stateValue_ == null) {
      throw Error('rifm is not initialized');
    }

    expect(props.format(stateValue_)).toEqual(getVal().value);

    return expect(renderInputState(getVal()));
  };

  return exec;
};
