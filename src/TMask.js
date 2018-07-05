/* @flow */

import * as React from 'react';

type Props = {|
  value: string,
  onChange: string => void,
  format: (str: string) => string,
  children: ({
    value: string,
    onChange: (evt: SyntheticInputEvent<HTMLInputElement>) => void,
  }) => React.Node,
|};

type State = {|
  value: string,
  internal: boolean,
|};

export class TMask extends React.Component<Props, State> {
  state = {
    value: this.props.value,
    internal: false,
  };

  _before: ?string;
  _input: ?HTMLInputElement;

  static getDerivedStateFromProps(props: Props, state: State) {
    if (state.internal) {
      return { value: state.value, internal: false };
    }

    return { value: props.value, internal: false };
  }

  _handleChange = (evt: SyntheticInputEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    const input = evt.target;

    this.setState({ value, internal: true }, () => {
      const { selectionStart } = input;
      this._input = input;
      this._before = value.substr(0, selectionStart).replace(/\s+/gi, '');

      this.props.onChange(this.props.format(value));
    });
  };

  render() {
    const {
      _handleChange,
      state: { value },
      props: { children },
    } = this;

    return children({ value, onChange: _handleChange });
  }

  componentDidUpdate() {
    const { _before, _input } = this;

    if (_before != null && _input != null) {
      const value = this.state.value;

      let start = -1;
      for (let i = 0; i !== _before.length; ++i) {
        start = value.indexOf(_before[i], start + 1);
      }

      _input.selectionStart = start + 1;
      _input.selectionEnd = start + 1;
    }

    this._input = null;
    this._before = null;
  }
}
