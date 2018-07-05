'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _inheritsLoose = _interopDefault(require('@babel/runtime/helpers/builtin/inheritsLoose'));
var _assertThisInitialized = _interopDefault(require('@babel/runtime/helpers/builtin/assertThisInitialized'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/builtin/defineProperty'));
var React = require('react');

var TMask =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TMask, _React$Component);

  function TMask() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      value: _this.props.value,
      internal: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_before", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_input", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleChange", function (evt) {
      var value = evt.target.value;
      var input = evt.target;

      _this.setState({
        value: value,
        internal: true
      }, function () {
        var selectionStart = input.selectionStart;
        _this._input = input;
        _this._before = value.substr(0, selectionStart).replace(/\s+/gi, '');

        _this.props.onChange(_this.props.format(value));
      });
    });

    return _this;
  }

  TMask.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    if (state.internal) {
      return {
        value: state.value,
        internal: false
      };
    }

    return {
      value: props.value,
      internal: false
    };
  };

  var _proto = TMask.prototype;

  _proto.render = function render() {
    var _handleChange = this._handleChange,
        value = this.state.value,
        children = this.props.children;
    return children({
      value: value,
      onChange: _handleChange
    });
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var _before = this._before,
        _input = this._input;

    if (_before != null && _input != null) {
      var value = this.state.value;
      var start = -1;

      for (var i = 0; i !== _before.length; ++i) {
        start = value.indexOf(_before[i], start + 1);
      }

      _input.selectionStart = start + 1;
      _input.selectionEnd = start + 1;
    }

    this._input = null;
    this._before = null;
  };

  return TMask;
}(React.Component);

exports.TMask = TMask;
