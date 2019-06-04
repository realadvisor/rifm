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

var formatDateOther = function formatDateOther(string) {
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
}; // const addMaskedSymbols = string => string + '________';


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

  return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Grid, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, "Date format"), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](rifm__WEBPACK_IMPORTED_MODULE_3__["Rifm"], {
    accept: /\d/g,
    mask: 10 <= formatted.length,
    format: formatDate,
    value: formatted,
    onChange: setFormatted,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, renderInput)), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    },
    __self: this
  }, "Date format another"), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](rifm__WEBPACK_IMPORTED_MODULE_3__["Rifm"], {
    accept: /[\d-]+/g,
    mask: 10 <= formatted.length,
    format: formatDateOther,
    value: formattedA,
    onChange: setFormattedA,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: this
  }, renderInput)), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: this
  }, "Date format with mask"), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](rifm__WEBPACK_IMPORTED_MODULE_3__["Rifm"], {
    accept: /[\d]/g,
    mask: true,
    format: formatDate,
    replace: addMask,
    value: masked,
    onChange: setMasked,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: this
  }, renderInput)));
};

var renderInput = function renderInput(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange;
  return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("input", {
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
      lineNumber: 96
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
      lineNumber: 112
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
        lineNumber: 129
      },
      __self: undefined
    }), root);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Example);

/***/ }),

/***/ "./src/Rifm.js":
/*!*********************!*\
  !*** ./src/Rifm.js ***!
  \*********************/
/*! exports provided: Rifm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rifm", function() { return Rifm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var Rifm = function Rifm(props) {
  var _React$useReducer = react__WEBPACK_IMPORTED_MODULE_0__["useReducer"](function (c) {
    return c + 1;
  }, 0),
      refresh = _React$useReducer[1];

  var valueRef = react__WEBPACK_IMPORTED_MODULE_0__["useRef"](null);
  var replace = props.replace;
  var userValue = replace ? replace(props.format(props.value)) : props.format(props.value); // state of delete button see comments below about inputType support

  var isDeleleteButtonDownRef = react__WEBPACK_IMPORTED_MODULE_0__["useRef"](false);

  var onChange = function onChange(evt) {
    if (true) {
      if (evt.target.type === 'number') {
        console.error('Rifm does not support input type=number, use type=tel instead.');
        return;
      }
    }

    var eventValue = evt.target.value;
    valueRef.current = [eventValue, // eventValue
    evt.target, // input
    eventValue.length > userValue.length, // isSizeIncreaseOperation
    isDeleleteButtonDownRef.current, // isDeleleteButtonDown
    userValue === props.format(eventValue)];

    if (true) {
      var formattedEventValue = props.format(eventValue);

      if (eventValue !== formattedEventValue && eventValue.toLowerCase() === formattedEventValue.toLowerCase()) {
        console.warn('Case enforcement does not work with format. Please use replace={value => value.toLowerCase()} instead');
      }
    } // The main trick is to update underlying input with non formatted value (= eventValue)
    // that allows us to calculate right cursor position after formatting (see getCursorPosition)
    // then we format new value and call props.onChange with masked/formatted value
    // and finally we are able to set cursor position into right place


    refresh();
  }; // React prints warn on server in non production mode about useLayoutEffect usage
  // in both cases it's noop


  if ( false || typeof window !== 'undefined') {
    react__WEBPACK_IMPORTED_MODULE_0__["useLayoutEffect"](function () {
      if (valueRef.current == null) return;
      var _valueRef$current = valueRef.current,
          eventValue = _valueRef$current[0],
          input = _valueRef$current[1],
          isSizeIncreaseOperation = _valueRef$current[2],
          isDeleleteButtonDown = _valueRef$current[3],
          // No operation means that value itself hasn't been changed, BTW cursor, selection etc can be changed
      isNoOperation = _valueRef$current[4];
      valueRef.current = null; // this usually occurs on deleting special symbols like ' here 123'123.00
      // in case of isDeleleteButtonDown cursor should move differently vs backspace

      var deleteWasNoOp = isDeleleteButtonDown && isNoOperation; // Create string from only accepted symbols

      var clean = function clean(str) {
        return (str.match(props.accept || /\d/g) || []).join('');
      };

      var valueBeforeSelectionStart = clean(eventValue.substr(0, input.selectionStart)); // trying to find cursor position in formatted value having knowledge about valueBeforeSelectionStart
      // This works because we assume that format doesn't change the order of accepted symbols.
      // Imagine we have formatter which adds ' symbol between numbers, and by default we refuse all non numeric symbols
      // for example we had input = 1'2|'4 (| means cursor position) then user entered '3' symbol
      // inputValue = 1'23'|4 so valueBeforeSelectionStart = 123 and formatted value = 1'2'3'4
      // calling getCursorPosition("1'2'3'4") will give us position after 3, 1'2'3|'4
      // so for formatting just this function to determine cursor position after formatting is enough
      // with masking we need to do some additional checks see `mask` below

      var getCursorPosition = function getCursorPosition(val) {
        var start = 0;
        var cleanPos = 0;

        for (var i = 0; i !== valueBeforeSelectionStart.length; ++i) {
          var newPos = val.indexOf(valueBeforeSelectionStart[i], start) + 1;
          var newCleanPos = clean(val).indexOf(valueBeforeSelectionStart[i], cleanPos) + 1; // this skips position change if accepted symbols order was broken
          // For example fixes edge case with fixed point numbers:
          // You have '0|.00', then press 1, it becomes 01|.00 and after format 1.00, this breaks our assumption
          // that order of accepted symbols is not changed after format,
          // so here we don't update start position if other accepted symbols was inbetween current and new position

          if (newCleanPos - cleanPos > 1) {
            newPos = start;
            newCleanPos = cleanPos;
          }

          cleanPos = Math.max(newCleanPos, cleanPos);
          start = Math.max(start, newPos);
        }

        return start;
      }; // Masking part, for masks if size of mask is above some value (props.replace checks that)
      // we need to replace symbols instead of do nothing as like in format


      if (props.mask === true && isSizeIncreaseOperation && !isNoOperation) {
        var start = getCursorPosition(eventValue);
        var c = clean(eventValue.substr(start))[0];
        start = eventValue.indexOf(c, start);
        eventValue = "" + eventValue.substr(0, start) + eventValue.substr(start + 1);
      }

      var formattedValue = props.format(eventValue);

      if (userValue === formattedValue) {
        // if nothing changed for formatted value, just refresh so userValue will be used at render
        refresh();
      } else {
        if (true) {
          var replaceValue = replace ? replace(formattedValue) : formattedValue;

          if (replaceValue.length !== formattedValue.length) {
            console.warn('replace must preserve length');
          }
        }

        props.onChange(replace ? replace(formattedValue) : formattedValue);
      }

      return function () {
        var start = getCursorPosition(formattedValue); // Visually improves working with masked values,
        // like cursor jumping over refused symbols
        // as an example date mask: was "5|1-24-3" then user pressed "6"
        // it becomes "56-|12-43" with this code, and "56|-12-43" without

        if (props.mask != null && (isSizeIncreaseOperation || isDeleleteButtonDown && !deleteWasNoOp)) {
          while (formattedValue[start] && clean(formattedValue[start]) === '') {
            start += 1;
          }
        }

        input.selectionStart = input.selectionEnd = start + (deleteWasNoOp ? 1 : 0);
      };
    });
  }

  react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
    // until https://developer.mozilla.org/en-US/docs/Web/API/InputEvent/inputType will be supported
    // by all major browsers (now supported by: +chrome, +safari, ?edge, !firefox)
    // there is no way I found to distinguish in onChange
    // backspace or delete was called in some situations
    // firefox track https://bugzilla.mozilla.org/show_bug.cgi?id=1447239
    var handleKeyDown = function handleKeyDown(evt) {
      if (evt.code === 'Delete') {
        isDeleleteButtonDownRef.current = true;
      }
    };

    var handleKeyUp = function handleKeyUp(evt) {
      if (evt.code === 'Delete') {
        isDeleleteButtonDownRef.current = false;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return function () {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  return props.children({
    value: valueRef.current != null ? valueRef.current[0] : userValue,
    onChange: onChange
  });
};

/***/ })

})
//# sourceMappingURL=date-format.js.7e121b5ca276cb08edb0.hot-update.js.map