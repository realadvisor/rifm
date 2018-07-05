/* @flow */

import * as React from 'react';

type Props = {|
  value: string,
  onChange: string => void,
  format: (str: string) => string,
  refuse?: RegExp,
  children: ({
    value: string,
    onChange: (evt: SyntheticInputEvent<HTMLInputElement>) => void,
  }) => React.Node,
|};

type State = {|
  value: string,
  internal: boolean,
|};

export class Rifm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value,
      internal: false,
    };
  }

  _state: ?{
    before: string,
    input: HTMLInputElement,
  } = null;

  _handleChange = (evt: SyntheticInputEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    const input = evt.target;

    this.setState({ value, internal: true }, () => {
      const { selectionStart } = input;
      this._state = {
        input,
        before: value
          .substr(0, selectionStart)
          .replace(this.props.refuse || /[^\d]+/gi, ''),
      };

      this.props.onChange(this.props.format(value));
    });
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    return {
      value: state.internal ? state.value : props.value,
      internal: false,
    };
  }

  render() {
    const {
      _handleChange,
      state: { value },
      props: { children },
    } = this;

    return children({ value, onChange: _handleChange });
  }

  componentDidUpdate() {
    const { _state } = this;

    if (_state) {
      const value = this.state.value;

      let start = -1;
      for (let i = 0; i !== _state.before.length; ++i) {
        start = Math.max(start, value.indexOf(_state.before[i], start + 1));
      }

      _state.input.selectionStart = start + 1;
      _state.input.selectionEnd = start + 1;
    }

    this._state = null;
  }
}
