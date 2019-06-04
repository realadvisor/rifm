webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");



var EmbedCodesandbox = function EmbedCodesandbox(_ref) {
  var title = _ref.title,
      href = _ref.href;
  var iframeStyle = {
    width: '100%',
    height: 500,
    border: 0,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 16,
    marginBottom: 64
  };
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("iframe", {
    src: "https://codesandbox.io/embed/" + href + "?fontsize=14",
    title: title,
    style: iframeStyle,
    sandbox: "allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
  });
};

var GithubIcon = function GithubIcon(_ref2) {
  var size = _ref2.size;
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", {
    width: size,
    height: size,
    role: "img",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("title", null, "GitHub icon"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
    d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
  }));
};

var H1 = function H1(_ref3) {
  var children = _ref3.children;
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
    variant: "h2",
    gutterBottom: true
  }, children);
};

var H2 = function H2(_ref4) {
  var children = _ref4.children;
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
    variant: "h4",
    gutterBottom: true
  }, children);
};

var P = function P(_ref5) {
  var children = _ref5.children;
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
    variant: "body1",
    gutterBottom: true
  }, children);
};

var Index = function Index() {
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    style: {
      marginTop: 64,
      marginBottom: 64
    }
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("section", {
    style: {
      marginBottom: 32
    }
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](H1, null, "RIFM - React Input Format & Mask", react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    target: "_blank",
    href: "https://github.com/istarkov/rifm",
    style: {
      marginLeft: 16
    }
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](GithubIcon, {
    size: 40
  }))), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](P, null, "Is a tiny (\u2248 650-750b) component to transform any input component into formatted or masked input.")), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](H2, {
    id: "case-enforcement"
  }, "Case enforcement"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](EmbedCodesandbox, {
    title: "istarkob/rifm: case-enforcement",
    href: "github/istarkov/rifm/tree/gh-pages/codesandboxes/case-enforcement"
  }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](H2, {
    id: "number-format"
  }, "Number format"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](P, null, "Note: to prevent parseInt overflow you can use ", react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("code", null, "maxLength"), " on input field or write your own numberFormat."), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](EmbedCodesandbox, {
    title: "istarkob/rifm: number-format",
    href: "github/istarkov/rifm/tree/gh-pages/codesandboxes/number-format"
  }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](H2, {
    id: "date-format"
  }, "Date format"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](P, null, "Mask mostly the same as format, the difference that at some moment when you enter symbols replace operation used instead of insert for example when field value reached maximum length."), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](P, null, "Use ", react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("code", null, "replace"), " to inform field to use replace operation."), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](EmbedCodesandbox, {
    title: "istarkob/rifm: date-format",
    href: "github/istarkov/rifm/tree/gh-pages/codesandboxes/date-format"
  }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](H2, {
    id: "phone-format"
  }, "Phone format"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](P, null, "Example of usage with", ' ', react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    href: "https://github.com/catamphetamine/libphonenumber-js"
  }, "libphonenumber-js"), ' ', "formatter"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](EmbedCodesandbox, {
    title: "istarkob/rifm: phone-format",
    href: "github/istarkov/rifm/tree/gh-pages/codesandboxes/phone-format"
  }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](H2, {
    id: "material-ui"
  }, "Format Material UI text field"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](P, null, "It can work with 3rd party Inputs without pain"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](EmbedCodesandbox, {
    title: "istarkob/rifm: material-ui",
    href: "github/istarkov/rifm/tree/gh-pages/codesandboxes/material-ui"
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ })

})
//# sourceMappingURL=index.js.c3f788e6ac2355ab3574.hot-update.js.map