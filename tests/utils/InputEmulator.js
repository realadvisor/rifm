/* @flow */

import * as React from 'react';

const makeEvtFromState = (state): SyntheticInputEvent<HTMLInputElement> =>
  ({
    target: state,
  }: any);

export type InputCommand =
  | {| type: 'PUT_SYMBOL', payload: string |}
  | {| type: 'MOVE_CARET', payload: number |}
  | {| type: 'BACKSPACE' |}
  | {| type: 'DELETE' |};

type InputState = {
  value: string,
  selectionStart: number,
  selectionEnd: number,
};

type Props = {|
  value: string,
  onChange: (evt: SyntheticInputEvent<HTMLInputElement>) => void,
  children: ((cmd: InputCommand) => void, () => InputState) => React.Node,
|};

export class InputEmulator extends React.Component<Props> {
  _execCommand: (cmd: InputCommand) => void;
  _state: InputState;

  constructor(props: Props) {
    super(props);

    this._state = {
      value: this.props.value,
      selectionStart: 0,
      selectionEnd: 0,
    };

    this._execCommand = (cmd: InputCommand) => {
      if (cmd.type === 'PUT_SYMBOL') {
        this._state.value =
          this._state.value.substr(0, this._state.selectionStart) +
          cmd.payload +
          this._state.value.substr(this._state.selectionStart);
        this._state.selectionStart += cmd.payload.length;
        this._state.selectionEnd = this._state.selectionStart;

        this.props.onChange(makeEvtFromState(this._state));
      }
      if (cmd.type === 'MOVE_CARET') {
        this._state.selectionStart = this._state.selectionEnd = Math.min(
          Math.max(this._state.selectionStart + cmd.payload, 0),
          this._state.value.length
        );
      }

      if (cmd.type === 'BACKSPACE') {
        this._state.value =
          this._state.value.substr(0, this._state.selectionStart - 1) +
          this._state.value.substr(this._state.selectionStart);

        this._state.selectionStart = this._state.selectionEnd = Math.min(
          Math.max(this._state.selectionStart - 1, 0),
          this._state.value.length
        );
        this.props.onChange(makeEvtFromState(this._state));
      }

      if (cmd.type === 'DELETE') {
        document.dispatchEvent(
          new KeyboardEvent('keydown', { keyCode: 46, code: 'Delete' })
        );

        this._state.value =
          this._state.value.substr(0, this._state.selectionStart) +
          this._state.value.substr(this._state.selectionStart + 1);
        /*
      this._state.selectionStart = this._state.selectionEnd = Math.min(
        Math.max(this._state.selectionStart - 1, 0),
        this._state.value.length
      );
      */
        this.props.onChange(makeEvtFromState(this._state));

        document.dispatchEvent(
          new KeyboardEvent('keyup', { keyCode: 46, code: 'Delete' })
        );
      }
    };
  }

  render() {
    // emulate React behaviour of cursor moved to end if new value is not equal to internal value
    if (this.props.value !== this._state.value) {
      this._state.value = this.props.value;
      this._state.selectionStart = this._state.selectionEnd = this.props.value.length;
    }

    return this.props.children(this._execCommand, () => ({ ...this._state }));
  }
}

export const renderInputState = (state: InputState) => {
  if (state.selectionEnd < state.selectionStart) {
    throw new Error("selectionEnd can't be greater selectionStart");
  }

  if (state.selectionStart === state.selectionEnd) {
    return (
      state.value.substring(0, state.selectionStart) +
      '|' +
      state.value.substring(state.selectionStart)
    );
  }

  const end = state.value.substring(state.selectionStart);
  const dt = state.selectionEnd - state.selectionStart;

  return (
    state.value.substring(0, state.selectionStart) +
    '[' +
    end.substring(0, dt) +
    ']' +
    end.substring(dt)
  );
};
