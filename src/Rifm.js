/* @flow */

import * as React from 'react';

type Props = {|
  value: string,
  onChange: string => void,
  format: (str: string) => string,
  replace?: string => boolean,
  refuse?: RegExp,
  children: ({
    value: string,
    onChange: (evt: SyntheticInputEvent<HTMLInputElement>) => void,
  }) => React.Node,
|};

type State = {|
  value: string,
  local: boolean,
|};

export class Rifm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value,
      local: false,
    };
  }

  _state: ?{|
    before: string,
    input: HTMLInputElement,
    op: boolean,
    di: boolean,
    del: boolean,
  |} = null;

  _del: boolean = false;

  _handleChange = (evt: SyntheticInputEvent<HTMLInputElement>) => {
    // FUTURE: use evt.nativeEvent.inputType for del event, see comments at onkeydown
    let value = evt.target.value;
    const input = evt.target;
    const op = value.length > this.props.value.length;
    const del = this._del;
    const noOp = this.props.value === this.props.format(value);

    this.setState({ value, local: true }, () => {
      const { selectionStart } = input;
      const refuse = this.props.refuse || /[^\d]+/g;

      const before = value.substr(0, selectionStart).replace(refuse, '');

      this._state = {
        input,
        before,
        op,
        di: del && noOp,
        del,
      };

      if (
        this.props.replace &&
        this.props.replace(this.props.value) &&
        op &&
        !noOp
      ) {
        let start = -1;
        for (let i = 0; i !== before.length; ++i) {
          start = Math.max(start, value.indexOf(before[i], start + 1));
        }

        const c = value.substr(start + 1).replace(refuse, '')[0];
        start = value.indexOf(c, start + 1);

        value = `${value.substr(0, start)}${value.substr(start + 1)}`;
      }

      this.props.onChange(this.props.format(value));
    });
  };

  // until https://developer.mozilla.org/en-US/docs/Web/API/InputEvent/inputType will be supported
  // by all major browsers (now supported by: +chrome, +safari, ?edge, !firefox)
  // there is no way I found to distinguish in onChange
  // backspace or delete was called in some situations
  // firefox track https://bugzilla.mozilla.org/show_bug.cgi?id=1447239
  _hKD = (evt: KeyboardEvent) => {
    if (evt.code === 'Delete') {
      this._del = true;
    }
  };

  _hKU = (evt: KeyboardEvent) => {
    if (evt.code === 'Delete') {
      this._del = false;
    }
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    return {
      value: state.local ? state.value : props.value,
      local: false,
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

  // delete when  https://developer.mozilla.org/en-US/docs/Web/API/InputEvent/inputType will be supported by all major browsers
  componentWillUnmount() {
    document.removeEventListener('keydown', this._hKD);
    document.removeEventListener('keyup', this._hKU);
  }

  // delete when  https://developer.mozilla.org/en-US/docs/Web/API/InputEvent/inputType will be supported by all major browsers
  componentDidMount() {
    document.addEventListener('keydown', this._hKD);
    document.addEventListener('keyup', this._hKU);
  }

  componentDidUpdate() {
    const { _state } = this;

    if (_state) {
      const value = this.state.value;

      let start = -1;
      for (let i = 0; i !== _state.before.length; ++i) {
        start = Math.max(start, value.indexOf(_state.before[i], start + 1));
      }

      // format usually looks better without this
      if (this.props.replace && (_state.op || (_state.del && !_state.di))) {
        while (
          value[start + 1] &&
          (this.props.refuse || /[^\d]+/).test(value[start + 1])
        ) {
          start += 1;
        }
      }

      _state.input.selectionStart = _state.input.selectionEnd =
        start + 1 + (_state.di ? 1 : 0);
    }

    this._state = null;
  }
}
