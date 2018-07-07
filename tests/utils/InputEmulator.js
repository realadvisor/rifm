/* @flow */

import * as React from 'react';

const makeEvtFromState = (state): SyntheticInputEvent<HTMLInputElement> =>
  ({
    target: state,
  }: any);

type InputCommand =
  | { type: 'PUT_SYMBOL', payload: string }
  | { type: 'MOVE_CARET', payload: number }
  | { type: 'BACKSPACE' }
  | { type: 'DELETE' };

export class InputEmulator extends React.Component<{|
  value: string,
  onChange: (evt: SyntheticInputEvent<HTMLInputElement>) => void,
  children: (
    (cmd: InputCommand) => void,
    () => { value: string, selectionStart: number }
  ) => React.Node,
|}> {
  _state = {
    value: this.props.value,
    selectionStart: 0,
    selectionEnd: 0,
  };

  _execCommand = (cmd: InputCommand) => {
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
    }
  };

  render() {
    // emulate React behaviour of cursor moved to end if new value is not equal to internal value
    if (this.props.value !== this._state.value) {
      this._state.value = this.props.value;
      this._state.selectionStart = this._state.selectionEnd = this.props.value.length;
    }

    return this.props.children(this._execCommand, () => ({ ...this._state }));
  }
}
