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
    onChange: (
      evt: SyntheticInputEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void,
  }) => React.Node,
|};

export const Rifm = (props: Props) => {
  const [, refresh] = React.useReducer(c => c + 1, 0);
  const valueRef = React.useRef(null);

  // state of delete button see comments below about inputType support
  const isDeleleteButtonDownRef = React.useRef(false);

  const onChange = (
    evt: SyntheticInputEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (process.env.NODE_ENV !== 'production') {
      if (evt.target.type === 'number') {
        console.error(
          'Rifm does not support input type=number, use type=tel instead.'
        );
        return;
      }
    }

    const value = props.value;
    const eventValue = evt.target.value;

    valueRef.current = [
      eventValue, // eventValue
      evt.target, // input
      eventValue.length > value.length, // isSizeIncreaseOperation
      isDeleleteButtonDownRef.current, // isDeleleteButtonDown
      value === props.format(eventValue), // isNoOperation
    ];

    // The main trick is to update underlying input with non formatted value (= eventValue)
    // that allows us to calculate right cursor position after formatting (see getCursorPosition)
    // then we format new value and call props.onChange with masked/formatted value
    // and finally we are able to set cursor position into right place
    refresh();
  };

  // React prints warn on server in non production mode about useLayoutEffect usage
  // in both cases it's noop
  if (process.env.NODE_ENV === 'production' || typeof window !== 'undefined') {
    React.useLayoutEffect(() => {
      if (valueRef.current != null) {
        let [
          eventValue,
          input,
          isSizeIncreaseOperation,
          isDeleleteButtonDown,
          // No operation means that value itself hasn't been changed, BTW cursor, selection etc can be changed
          isNoOperation,
        ] = valueRef.current;
        valueRef.current = null;

        // this usually occurs on deleting special symbols like ' here 123'123.00
        // in case of isDeleleteButtonDown cursor should move differently vs backspace
        const deleteWasNoOp = isDeleleteButtonDown && isNoOperation;

        const refuse = props.refuse || /[^\d]+/g;

        const valueBeforeSelectionStart = eventValue
          .substr(0, input.selectionStart)
          .replace(refuse, '')
          .toLowerCase();

        // trying to find cursor position in formatted value having knowledge about valueBeforeSelectionStart
        // This works because we assume that format doesn't change the order of non refused symbols.
        // Imagine we have formatter which adds ' symbol between numbers, and by default we refuse all non numeric symbols
        // for example we had input = 1'2|'4 (| means cursor position) then user entered '3' symbol
        // inputValue = 1'23'|4 so valueBeforeSelectionStart = 123 and formatted value = 1'2'3'4
        // calling getCursorPosition("1'2'3'4") will give us position after 3, 1'2'3|'4
        // so for formatting just this function to determine cursor position after formatting is enough
        // with masking we need to do some additional checks see `replace` below
        const getCursorPosition = val => {
          let start = 0;
          for (let i = 0; i !== valueBeforeSelectionStart.length; ++i) {
            start = Math.max(
              start,
              val.toLowerCase().indexOf(valueBeforeSelectionStart[i], start) + 1
            );
          }
          return start;
        };

        // Masking part, for masks if size of mask is above some value (props.replace checks that)
        // we need to replace symbols instead of do nothing as like in format
        if (
          props.replace &&
          props.replace(props.value) &&
          isSizeIncreaseOperation &&
          !isNoOperation
        ) {
          let start = getCursorPosition(eventValue);

          const c = eventValue.substr(start).replace(refuse, '')[0];
          start = eventValue.indexOf(c, start);

          eventValue = `${eventValue.substr(0, start)}${eventValue.substr(
            start + 1
          )}`;
        }

        const formattedValue = props.format(eventValue);

        if (props.value === formattedValue) {
          // if nothing changed for formatted value, just refresh so props.value will be used at render
          refresh();
        } else {
          props.onChange(formattedValue);
        }

        return () => {
          let start = getCursorPosition(formattedValue);

          // Visually improves working with masked values,
          // like cursor jumping over refused symbols
          if (
            props.replace &&
            (isSizeIncreaseOperation ||
              (isDeleleteButtonDown && !deleteWasNoOp))
          ) {
            while (
              formattedValue[start] &&
              refuse.test(formattedValue[start])
            ) {
              start += 1;
            }
          }

          input.selectionStart = input.selectionEnd =
            start + (deleteWasNoOp ? 1 : 0);
        };
      }
    });
  }

  React.useEffect(() => {
    // until https://developer.mozilla.org/en-US/docs/Web/API/InputEvent/inputType will be supported
    // by all major browsers (now supported by: +chrome, +safari, ?edge, !firefox)
    // there is no way I found to distinguish in onChange
    // backspace or delete was called in some situations
    // firefox track https://bugzilla.mozilla.org/show_bug.cgi?id=1447239
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.code === 'Delete') {
        isDeleleteButtonDownRef.current = true;
      }
    };

    const handleKeyUp = (evt: KeyboardEvent) => {
      if (evt.code === 'Delete') {
        isDeleleteButtonDownRef.current = false;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return props.children({
    value: valueRef.current != null ? valueRef.current[0] : props.value,
    onChange,
  });
};
