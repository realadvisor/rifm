webpackHotUpdate("static/development/pages/phone-format.js",{

/***/ "./pages/phone-format/index.js":
/*!*************************************!*\
  !*** ./pages/phone-format/index.js ***!
  \*************************************/
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
/* harmony import */ var libphonenumber_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libphonenumber-js */ "./node_modules/libphonenumber-js/index.es6.js");

var _jsxFileName = "/Users/bogdancadkin/host/rifm/pages/phone-format/index.js";

/* @flow */





var parseDigits = function parseDigits(string) {
  return (string.match(/\d+/g) || []).join('');
};

var formatPhone = function formatPhone(string) {
  var digits = parseDigits(string).substr(0, 10);
  return new libphonenumber_js__WEBPACK_IMPORTED_MODULE_4__["AsYouType"]('US').input(digits);
};

var Example = function Example()
/*:React.Node*/
{
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1__["useState"](''),
      _React$useState2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$useState, 2),
      phone = _React$useState2[0],
      setPhone = _React$useState2[1];

  return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Grid, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, "Phone format"), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](rifm__WEBPACK_IMPORTED_MODULE_3__["Rifm"], {
    accept: /\d+/g // do not jump after ) until see number before
    ,
    replace: phone.length < 6 && /[^\d]+/.test(phone[3]) ? undefined : function (v) {
      return v.length >= 14;
    },
    format: formatPhone,
    value: formatPhone(phone),
    onChange: setPhone,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, renderInput)));
};

var renderInput = function renderInput(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange;
  return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("input", {
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
      lineNumber: 42
    },
    __self: this
  });
};

var Grid = function Grid(_ref2) {
  var children = _ref2.children;
  return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    style: {
      display: 'grid',
      padding: 16,
      gap: 24,
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      alignItems: 'end'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  }, children);
};

if (typeof document !== 'undefined') {
  var root = document.getElementById('root');

  if (root) {
    react_dom__WEBPACK_IMPORTED_MODULE_2__["render"](react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Example, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 73
      },
      __self: undefined
    }), root);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Example);

/***/ })

})
//# sourceMappingURL=phone-format.js.f0ffb070ba911a53ccd4.hot-update.js.map