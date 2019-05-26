webpackHotUpdate("static/development/pages/number-format.js",{

/***/ "./pages/number-format/index.js":
/*!**************************************!*\
  !*** ./pages/number-format/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_number_parse_float__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/number/parse-float */ "./node_modules/@babel/runtime-corejs2/core-js/number/parse-float.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_number_parse_float__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_number_parse_float__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_number_is_nan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/number/is-nan */ "./node_modules/@babel/runtime-corejs2/core-js/number/is-nan.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_number_is_nan__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_number_is_nan__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_number_parse_int__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/number/parse-int */ "./node_modules/@babel/runtime-corejs2/core-js/number/parse-int.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_number_parse_int__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_number_parse_int__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var rifm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rifm */ "./src/index.js");




var _jsxFileName = "/Users/ice/ext/npm/rifm/pages/number-format/index.js";




var renderInput = function renderInput(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange;
  return (// type=number is not allowed
    react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("input", {
      type: "tel",
      style: {
        textAlign: 'right'
      },
      value: value,
      onChange: onChange,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 7
      },
      __self: this
    })
  );
}; // To prevent parseInt overflow you can use `maxLength` on input field
// or write your own numberFormat.


var integerAccept = /\d+/g;

var parseInteger = function parseInteger(string) {
  return (string.match(integerAccept) || []).join('');
};

var formatInteger = function formatInteger(string) {
  var parsed = parseInteger(string);

  var number = _babel_runtime_corejs2_core_js_number_parse_int__WEBPACK_IMPORTED_MODULE_3___default()(parsed, 10);

  if (_babel_runtime_corejs2_core_js_number_is_nan__WEBPACK_IMPORTED_MODULE_2___default()(number)) {
    return '';
  }

  return number.toLocaleString('en');
};

var negativeAccept = /[\d-]+/g;

var parseNegative = function parseNegative(string) {
  return (string.match(negativeAccept) || []).join('');
};

var formatNegative = function formatNegative(string) {
  var parsed = parseNegative(string);

  if (parsed === '-') {
    return '-';
  }

  var number = _babel_runtime_corejs2_core_js_number_parse_int__WEBPACK_IMPORTED_MODULE_3___default()(parsed, 10);

  if (_babel_runtime_corejs2_core_js_number_is_nan__WEBPACK_IMPORTED_MODULE_2___default()(number)) {
    return '';
  }

  return number.toLocaleString('en');
};

var numberAccept = /[\d.]+/g;

var parseNumber = function parseNumber(string) {
  return (string.match(numberAccept) || []).join('');
};

var floor = function floor(number, scale) {
  var ratio = Math.pow(10, scale);
  return Math.floor(number * ratio) / ratio;
};

var formatNumber = function formatNumber(string, scale, fixed) {
  var parsed = parseNumber(string);

  var number = _babel_runtime_corejs2_core_js_number_parse_float__WEBPACK_IMPORTED_MODULE_1___default()(parsed);

  if (_babel_runtime_corejs2_core_js_number_is_nan__WEBPACK_IMPORTED_MODULE_2___default()(number)) {
    return '';
  } // floor to prevent incrementing rounded number


  var formatted = floor(number, scale).toLocaleString('de-CH', {
    minimumFractionDigits: fixed ? scale : 0,
    maximumFractionDigits: scale
  });

  if (!formatted.includes('.') && parsed.includes('.')) {
    var _parsed$split = parsed.split('.'),
        _parsed$split2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_parsed$split, 2),
        tail = _parsed$split2[1];

    return formatted + '.' + tail.slice(0, scale);
  }

  return formatted;
}; // 2 in m^2 should not be a number to not match regexp


var formatMeters = function formatMeters(string) {
  return formatNumber(string, 2, false) + " m\xB2";
};

var formatCurrency = function formatCurrency(string) {
  return '$' + formatNumber(string, 2, false);
};

var Example = function Example() {
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_4__["useState"]('12345'),
      _React$useState2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$useState, 2),
      integer = _React$useState2[0],
      setInteger = _React$useState2[1];

  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_4__["useState"]('12345'),
      _React$useState4 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$useState3, 2),
      negative = _React$useState4[0],
      setNegative = _React$useState4[1];

  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_4__["useState"]('12345'),
      _React$useState6 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$useState5, 2),
      variableFloat = _React$useState6[0],
      setVariableFloat = _React$useState6[1];

  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_4__["useState"]('12345'),
      _React$useState8 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$useState7, 2),
      fixedFloat = _React$useState8[0],
      setFixedFloat = _React$useState8[1];

  return react__WEBPACK_IMPORTED_MODULE_4__["createElement"](react__WEBPACK_IMPORTED_MODULE_4__["Fragment"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
    },
    __self: this
  }, "Integer number format: ", integer), react__WEBPACK_IMPORTED_MODULE_4__["createElement"](rifm__WEBPACK_IMPORTED_MODULE_6__["Rifm"], {
    refuse: /[^\d]+/g,
    format: formatInteger,
    value: formatInteger(integer),
    onChange: function onChange(value) {
      return setInteger(parseInteger(value));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88
    },
    __self: this
  }, renderInput), react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97
    },
    __self: this
  }, "Negative number format: ", negative), react__WEBPACK_IMPORTED_MODULE_4__["createElement"](rifm__WEBPACK_IMPORTED_MODULE_6__["Rifm"], {
    refuse: /[^\d-]+/g,
    format: formatNegative,
    value: formatNegative(negative),
    onChange: function onChange(value) {
      return setNegative(parseNegative(value));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98
    },
    __self: this
  }, renderInput), react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107
    },
    __self: this
  }, "Number with fractional part: ", fixedFloat), react__WEBPACK_IMPORTED_MODULE_4__["createElement"](rifm__WEBPACK_IMPORTED_MODULE_6__["Rifm"], {
    refuse: /[^\d.]+/g,
    format: function format(v) {
      return formatNumber(v, 2, true);
    },
    value: formatNumber(fixedFloat, 2, true),
    onChange: function onChange(value) {
      return setFixedFloat(parseNumber(value));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108
    },
    __self: this
  }, renderInput), react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117
    },
    __self: this
  }, "Number with variable fractional part: ", variableFloat), react__WEBPACK_IMPORTED_MODULE_4__["createElement"](rifm__WEBPACK_IMPORTED_MODULE_6__["Rifm"], {
    refuse: /[^\d.]+/g,
    format: function format(v) {
      return formatNumber(v, 2, false);
    },
    value: formatNumber(variableFloat, 2, false),
    onChange: function onChange(value) {
      return setVariableFloat(parseNumber(value));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118
    },
    __self: this
  }, renderInput), react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127
    },
    __self: this
  }, "Square meters number: ", variableFloat), react__WEBPACK_IMPORTED_MODULE_4__["createElement"](rifm__WEBPACK_IMPORTED_MODULE_6__["Rifm"], {
    refuse: /[^\d.]+/g,
    format: formatMeters,
    value: formatMeters(variableFloat),
    onChange: function onChange(value) {
      return setVariableFloat(parseNumber(value));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128
    },
    __self: this
  }, renderInput), react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137
    },
    __self: this
  }, "Currency number: ", variableFloat), react__WEBPACK_IMPORTED_MODULE_4__["createElement"](rifm__WEBPACK_IMPORTED_MODULE_6__["Rifm"] // $ need to be in regexp to prevent cursor jumping on backspace
  , {
    refuse: /[^\d.$]+/g,
    format: formatCurrency,
    value: formatCurrency(variableFloat),
    onChange: function onChange(value) {
      return setVariableFloat(parseNumber(value));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 138
    },
    __self: this
  }, renderInput));
};

if (typeof document !== 'undefined') {
  var root = document.getElementById('root');

  if (root) {
    react_dom__WEBPACK_IMPORTED_MODULE_5__["render"](react__WEBPACK_IMPORTED_MODULE_4__["createElement"](Example, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 154
      },
      __self: undefined
    }), root);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Example);

/***/ })

})
//# sourceMappingURL=number-format.js.87a8b730b57dc7854dbb.hot-update.js.map