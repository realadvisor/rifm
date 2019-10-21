webpackHotUpdate("static/development/pages/date-format.js",{

/***/ "./pages/date-format/index.js":
/*!************************************!*\
  !*** ./pages/date-format/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rifm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rifm */ "./src/index.js");

var _jsxFileName = "/Users/ice/ext/npm/rifm/pages/date-format/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1__["createElement"];

/* @flow */




var parseDigits = function parseDigits(string) {
  return (string.match(/\d+/g) || []).join('');
};

var formatDate = function formatDate(string) {
  var digits = parseDigits(string);
  var chars = digits.split('');
  return chars.reduce(function (r, v, index) {
    return index === 2 || index === 4 ? "".concat(r, "-").concat(v) : "".concat(r).concat(v);
  }, '').substr(0, 10);
};

var formatDateWithAppend = function formatDateWithAppend(string) {
  var res = formatDate(string);

  if (string.endsWith('-')) {
    if (res.length === 2) {
      return "".concat(res, "-");
    }

    if (res.length === 5) {
      return "".concat(res, "-");
    }
  }

  return res;
};

var appendHyphen = function appendHyphen(v) {
  return v.length === 2 || v.length === 5 ? "".concat(v, "-") : v;
};

var addMask = function addMask(string) {
  var digits = parseDigits(string);
  var days = digits.slice(0, 2).padEnd(2, '_');
  var months = digits.slice(2, 4).padEnd(2, '_');
  var years = digits.slice(4, 8).padEnd(4, '_');
  return "".concat(days, "-").concat(months, "-").concat(years);
};

var Example = function Example()
/*:React.Node*/
{
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1__["useState"]('18-08-1978'),
      _React$useState2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$useState, 2),
      formatted = _React$useState2[0],
      setFormatted = _React$useState2[1];

  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_1__["useState"](''),
      _React$useState4 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$useState3, 2),
      formattedA = _React$useState4[0],
      setFormattedA = _React$useState4[1];

  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_1__["useState"](''),
      _React$useState6 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$useState5, 2),
      masked = _React$useState6[0],
      setMasked = _React$useState6[1];

  return __jsx(Grid, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }, __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, "Date format with append"), __jsx(rifm__WEBPACK_IMPORTED_MODULE_3__["Rifm"], {
    accept: /\d+/g,
    mask: 10 <= formattedA.length,
    format: formatDateWithAppend // append={appendHyphen}
    ,
    value: formattedA,
    onChange: setFormattedA,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, renderInput)), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    },
    __self: this
  }, __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: this
  }, "Date format"), __jsx(rifm__WEBPACK_IMPORTED_MODULE_3__["Rifm"], {
    accept: /\d/g,
    mask: 10 <= formatted.length,
    format: formatDate,
    value: formatted,
    onChange: setFormatted,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: this
  }, renderInput)), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: this
  }, __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: this
  }, "Date format with mask"), __jsx(rifm__WEBPACK_IMPORTED_MODULE_3__["Rifm"], {
    accept: /[\d]/g,
    mask: true,
    format: formatDate,
    replace: addMask,
    value: masked,
    onChange: setMasked,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81
    },
    __self: this
  }, renderInput)));
};

var renderInput = function renderInput(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange;
  return __jsx("input", {
    type: "tel",
    placeholder: "dd-mm-yyyy",
    style: {
      width: '100%',
      height: 32,
      fontSize: 'inherit',
      boxSizing: 'border-box'
    },
    value: value,
    onChange: onChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97
    },
    __self: this
  });
};

var Grid = function Grid(_ref2) {
  var children = _ref2.children;
  return __jsx("div", {
    style: {
      display: 'grid',
      padding: 16,
      gap: 24,
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      alignItems: 'end'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113
    },
    __self: this
  }, children);
};

if (typeof document !== 'undefined') {
  var root = document.getElementById('root');

  if (root) {
    react_dom__WEBPACK_IMPORTED_MODULE_2__["render"](__jsx(Example, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 130
      },
      __self: undefined
    }), root);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Example);

/***/ })

})
//# sourceMappingURL=date-format.js.e91a84bd518422d39e0b.hot-update.js.map