/* @flow */

import * as React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
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
  append?: (str: string) => string,
  maskFn?: string => boolean,
  initialValue?: string,
|};

export const createExec = (props: Props) => {
  let getVal = null;
  let execCommand = null;
  let stateValue_ = null;

  const Component = () => {
    const [state, setState] = React.useState(
      props.initialValue != null ? props.initialValue : ''
    );
    stateValue_ = state;

    return (
      <Rifm
        value={state}
        onChange={setState}
        accept={props.accept}
        format={props.format}
        replace={props.replace}
        append={props.append}
        mask={
          props.mask != null
            ? props.mask
            : props.maskFn != null
            ? props.maskFn(state)
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
  };

  TestRenderer.create(<Component />);

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
    const { replace } = props;

    // console.log({ stateValue_, v: renderInputState(getVal()) });
    expect(
      replace ? replace(props.format(stateValue_)) : props.format(stateValue_)
    ).toEqual(getVal().value);

    return expect(renderInputState(getVal()));
  };

  return exec;
};
