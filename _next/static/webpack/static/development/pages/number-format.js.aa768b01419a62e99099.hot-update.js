webpackHotUpdate("static/development/pages/number-format.js",{

/***/ "./pages/number-format/index.js":
/*!**************************************!*\
  !*** ./pages/number-format/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_number_parse_float__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/number/parse-float */ "./node_modules/@babel/runtime-corejs2/core-js/number/parse-float.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_number_parse_float__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_number_parse_float__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_number_is_nan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/number/is-nan */ "./node_modules/@babel/runtime-corejs2/core-js/number/is-nan.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_number_is_nan__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_number_is_nan__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_number_parse_int__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/number/parse-int */ "./node_modules/@babel/runtime-corejs2/core-js/number/parse-int.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_number_parse_int__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_number_parse_int__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var rifm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rifm */ "./src/index.js");




var _jsxFileName = "/Users/bogdancadkin/host/rifm/pages/number-format/index.js";

/* @flow */


 // To prevent parseInt overflow you can use `maxLength` on input field
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

var formatFixedPointNumber = function formatFixedPointNumber(value, digits) {
  var parsed = parseNumber(value);

  var _parsed$split = parsed.split('.'),
      _parsed$split2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_parsed$split, 2),
      head = _parsed$split2[0],
      tail = _parsed$split2[1];

  var number; // For fixed format numbers deleting "." must be no-op
  // as imagine u have 123.45 then delete "." and get 12345.00 looks bad in UI
  // so we transform here 12345 into 123.45 instead of 12345.00.
  // The main disadvantage of this, that you need carefully check input value
  // that it always has fractional part

  if (digits > 0 && tail == null) {
    var paddedHead = head.padStart(digits + 1 - head.length, '0');
    number = _babel_runtime_corejs2_core_js_number_parse_float__WEBPACK_IMPORTED_MODULE_0___default()("".concat(paddedHead.slice(0, -digits), ".").concat(paddedHead.slice(-digits)));
  } else {
    number = _babel_runtime_corejs2_core_js_number_parse_float__WEBPACK_IMPORTED_MODULE_0___default()(parsed);
  }

  if (_babel_runtime_corejs2_core_js_number_is_nan__WEBPACK_IMPORTED_MODULE_2___default()(number)) {
    return '';
  } // Avoid rounding errors at toLocaleString as when user enters 1.239 and maxDigits=2 we
  // must not to convert it to 1.24, it must stay 1.23


  number = Math.trunc(number * Math.pow(10, digits)) / Math.pow(10, digits);
  var formatted = number.toLocaleString('de-CH', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
  return formatted;
};

var formatFloatingPointNumber = function formatFloatingPointNumber(value, maxDigits) {
  var parsed = parseNumber(value);

  var _parsed$split3 = parsed.split('.'),
      _parsed$split4 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_parsed$split3, 2),
      head = _parsed$split4[0],
      tail = _parsed$split4[1]; // Avoid rounding errors at toLocaleString as when user enters 1.239 and maxDigits=2 we
  // must not to convert it to 1.24, it must stay 1.23


  var scaledTail = tail != null ? tail.slice(0, maxDigits) : '';

  var number = _babel_runtime_corejs2_core_js_number_parse_float__WEBPACK_IMPORTED_MODULE_0___default()("".concat(head, ".").concat(scaledTail));

  if (_babel_runtime_corejs2_core_js_number_is_nan__WEBPACK_IMPORTED_MODULE_2___default()(number)) {
    return '';
  }

  var formatted = number.toLocaleString('de-CH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDigits
  });

  if (parsed.includes('.')) {
    var _formatted$split = formatted.split('.'),
        _formatted$split2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_formatted$split, 1),
        formattedHead = _formatted$split2[0]; // skip zero at digits position for non fixed floats
    // as at digits 2 for non fixed floats numbers like 1.50 has no sense, just 1.5 allowed
    // but 1.0 has sense as otherwise you will not be able to enter 1.05 for example


    var formattedTail = scaledTail !== '' && scaledTail[maxDigits - 1] === '0' ? scaledTail.slice(0, -1) : scaledTail;
    return "".concat(formattedHead, ".").concat(formattedTail);
  }

  return formatted;
}; // 2 in m^2 should not be a number to not match regexp


var formatMeters = function formatMeters(string) {
  return formatFloatingPointNumber(string, 2) + " m\xB2";
};

var formatCurrency = function formatCurrency(string) {
  return '$' + formatFloatingPointNumber(string, 2);
};

var Example = function Example()
/*:React.Node*/
{
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_4__["useState"]('12345'),
      _React$useState2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_React$useState, 2),
      integer = _React$useState2[0],
      setInteger = _React$useState2[1];

  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_4__["useState"]('12345'),
      _React$useState4 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_React$useState3, 2),
      negative = _React$useState4[0],
      setNegative = _React$useState4[1];

  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_4__["useState"]('12345'),
      _React$useState6 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_React$useState5, 2),
      variableFloat = _React$useState6[0],
      setVariableFloat = _React$useState6[1];

  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_4__["useState"]('12345'),
      _React$useState8 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_React$useState7, 2),
      fixedFloat = _React$useState8[0],
      setFixedFloat = _React$useState8[1];

  return react__WEBPACK_IMPORTED_MODULE_4__["createElement"](Grid, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127
    },
    __self: this
  }, "Integer number format: ", integer), react__WEBPACK_IMPORTED_MODULE_4__["createElement"](rifm__WEBPACK_IMPORTED_MODULE_6__["Rifm"], {
    accept: /\d/g,
    format: formatInteger,
    value: integer,
    onChange: function onChange(value) {
      return setInteger(parseInteger(value));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128
    },
    __self: this
  }, renderInput)), react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 138
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 139
    },
    __self: this
  }, "Negative number format: ", negative), react__WEBPACK_IMPORTED_MODULE_4__["createElement"](rifm__WEBPACK_IMPORTED_MODULE_6__["Rifm"], {
    accept: /[\d-]/g,
    format: formatNegative,
    value: negative,
    onChange: function onChange(value) {
      return setNegative(parseNegative(value));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140
    },
    __self: this
  }, renderInput)), react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 150
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 151
    },
    __self: this
  }, "Number with fractional part: ", fixedFloat), react__WEBPACK_IMPORTED_MODULE_4__["createElement"](rifm__WEBPACK_IMPORTED_MODULE_6__["Rifm"], {
    accept: /[\d.]/g,
    format: function format(v) {
      return formatFixedPointNumber(v, 2);
    } // 00 is needed here see disadvantages comment at formatNumber
    ,
    value: "".concat(fixedFloat, "00"),
    onChange: function onChange(value) {
      return setFixedFloat(parseNumber(value));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 152
    },
    __self: this
  }, renderInput)), react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 163
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 164
    },
    __self: this
  }, "Number with variable fractional part: ", variableFloat), react__WEBPACK_IMPORTED_MODULE_4__["createElement"](rifm__WEBPACK_IMPORTED_MODULE_6__["Rifm"], {
    accept: /[\d.]/g,
    format: function format(v) {
      return formatFloatingPointNumber(v, 2);
    },
    value: variableFloat,
    onChange: function onChange(value) {
      return setVariableFloat(parseNumber(value));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 165
    },
    __self: this
  }, renderInput)), react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 175
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 176
    },
    __self: this
  }, "Square meters number: ", variableFloat), react__WEBPACK_IMPORTED_MODULE_4__["createElement"](rifm__WEBPACK_IMPORTED_MODULE_6__["Rifm"], {
    accept: /[\d.]/g,
    format: formatMeters,
    value: variableFloat,
    onChange: function onChange(value) {
      return setVariableFloat(parseNumber(value));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 177
    },
    __self: this
  }, renderInput)), react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 187
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 188
    },
    __self: this
  }, "Currency number: ", variableFloat), react__WEBPACK_IMPORTED_MODULE_4__["createElement"](rifm__WEBPACK_IMPORTED_MODULE_6__["Rifm"] // $ need to be in regexp to prevent cursor jumping on backspace
  , {
    accept: /[\d.$]/g,
    format: formatCurrency,
    value: variableFloat,
    onChange: function onChange(value) {
      return setVariableFloat(parseNumber(value));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 189
    },
    __self: this
  }, renderInput)));
};

var renderInput = function renderInput(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange;
  return (// type=number is not allowed
    react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("input", {
      type: "tel",
      style: {
        textAlign: 'right',
        width: '100%',
        height: 32,
        fontSize: 'inherit',
        boxSizing: 'border-box'
      },
      value: value,
      onChange: onChange,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 205
      },
      __self: this
    })
  );
};

var Grid = function Grid(_ref2) {
  var children = _ref2.children;
  return react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
    style: {
      display: 'grid',
      padding: 16,
      gap: 24,
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      alignItems: 'end'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 221
    },
    __self: this
  }, children);
};

if (typeof document !== 'undefined') {
  var root = document.getElementById('root');

  if (root) {
    react_dom__WEBPACK_IMPORTED_MODULE_5__["render"](react__WEBPACK_IMPORTED_MODULE_4__["createElement"](Example, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 238
      },
      __self: undefined
    }), root);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Example);

/***/ })

})
//# sourceMappingURL=number-format.js.aa768b01419a62e99099.hot-update.js.map