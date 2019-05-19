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

    // The main trick is to update underlying input with new value
    // then get input.selectionStart after, then calculate selectionStart/End positions
    // needed to get that positions afterwards
    // then call props.onChange with masked/formatted value and set calulated positions
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

        // trying to find same symbols as in valueBeforeSelectionStart inside value.
        // In just format mode (without mask) it will be needed cursor position - 1/
        // It wroks because we assume that format doesn't change the order of non refused symbols and
        // this assumption allows us to detect final cursor position:
        // for example we had input = 12|4 (| cursor position) then user entered '3' symbol
        // inputValue = 123|4 so valueBeforeSelectionStart = 123
        // so cursor + 1 if we pass as val something formatted like 1'2'3'4 will be at
        // right position 1'2'3|'4
        const getStart = val => {
          let start = -1;
          for (let i = 0; i !== valueBeforeSelectionStart.length; ++i) {
            start = Math.max(
              start,
              val.toLowerCase().indexOf(valueBeforeSelectionStart[i], start + 1)
            );
          }
          return start;
        };

        if (
          props.replace &&
          props.replace(props.value) &&
          isSizeIncreaseOperation &&
          !isNoOperation
        ) {
          // Masking part, for masks if size of mask is above some value (props.replace checks that)
          // we need to replace symbols instead of do nothing as like in format
          let start = getStart(eventValue);

          const c = eventValue.substr(start + 1).replace(refuse, '')[0];
          start = eventValue.indexOf(c, start + 1);

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
          let start = getStart(formattedValue);

          // Visually improves working with masked values,
          // like cursor jumping over refused symbols
          if (
            props.replace &&
            (isSizeIncreaseOperation ||
              (isDeleleteButtonDown && !deleteWasNoOp))
          ) {
            while (
              formattedValue[start + 1] &&
              refuse.test(formattedValue[start + 1])
            ) {
              start += 1;
            }
          }

          input.selectionStart = input.selectionEnd =
            start + 1 + (deleteWasNoOp ? 1 : 0);
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
