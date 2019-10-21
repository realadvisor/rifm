webpackHotUpdate("static/development/pages/date-format.js",{

/***/ "./src/Rifm.js":
/*!*********************!*\
  !*** ./src/Rifm.js ***!
  \*********************/
/*! exports provided: Rifm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rifm", function() { return Rifm; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var Rifm = function Rifm(props) {
  var _React$useReducer = react__WEBPACK_IMPORTED_MODULE_1__["useReducer"](function (c) {
    return c + 1;
  }, 0),
      _React$useReducer2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$useReducer, 2),
      refresh = _React$useReducer2[1];

  var valueRef = react__WEBPACK_IMPORTED_MODULE_1__["useRef"](null);
  var _props$replace = props.replace,
      replace = _props$replace === void 0 ? function (v) {
    return v;
  } : _props$replace,
      _props$append = props.append,
      append = _props$append === void 0 ? function (v) {
    return v;
  } : _props$append;
  var userValue = replace ? replace(props.format(props.value)) : props.format(props.value); // state of delete button see comments below about inputType support

  var isDeleleteButtonDownRef = react__WEBPACK_IMPORTED_MODULE_1__["useRef"](false);

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


  if (true) {
    react__WEBPACK_IMPORTED_MODULE_1__["useLayoutEffect"](function () {
      if (valueRef.current == null) return;

      var _valueRef$current = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(valueRef.current, 5),
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
      }; // Masking part, for masks if size of mask is above some value
      // we need to replace symbols instead of do nothing as like in format


      if (props.mask === true && isSizeIncreaseOperation && !isNoOperation) {
        var start = getCursorPosition(eventValue);
        var c = clean(eventValue.substr(start))[0];
        start = eventValue.indexOf(c, start);
        eventValue = "".concat(eventValue.substr(0, start)).concat(eventValue.substr(start + 1));
      }

      var formattedValue = props.format(eventValue);

      if (append != null && // cursor at the end
      input.selectionStart === eventValue.length && !isNoOperation) {
        if (isSizeIncreaseOperation) {
          formattedValue = append(formattedValue);
        } else {
          // If after delete last char is special character and we use append
          // delete it too
          // was: "12-3|" backspace pressed, then should be "12|"
          if (clean(formattedValue.slice(-1)) === '') {
            formattedValue = formattedValue.slice(0, -1);
          }
        }
      }

      var replacedValue = replace ? replace(formattedValue) : formattedValue;

      if (userValue === replacedValue) {
        // if nothing changed for formatted value, just refresh so userValue will be used at render
        refresh();
      } else {
        props.onChange(replacedValue);
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

  react__WEBPACK_IMPORTED_MODULE_1__["useEffect"](function () {
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
//# sourceMappingURL=date-format.js.41077dc8c0ab5be1b979.hot-update.js.map