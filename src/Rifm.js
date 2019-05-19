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
  const delRef = React.useRef(false);

  const onChange = (
    evt: SyntheticInputEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = props.value;
    const evtValue = evt.target.value;

    valueRef.current = [
      evtValue, // target value
      evt.target, // target itself
      evtValue.length > value.length, // insert operation
      delRef.current,
      value === props.format(evtValue), // noOp
    ];
    // The main trick is to update underlying input with new value
    // then get right input.selectionStart calculate there it should be
    // and reupdate with masked/formatted value
    refresh();
  };

  React.useLayoutEffect(() => {
    if (valueRef.current != null) {
      let [evtValue, input, op, del, noOp] = valueRef.current;
      valueRef.current = null;

      // this usually occurs on deleting special symbols like ' here 123'123.00
      // in case of del cursor should move differently vs backspace
      const delWasNoOp = del && noOp;

      const refuse = props.refuse || /[^\d]+/g;

      const before = evtValue
        .substr(0, input.selectionStart)
        .replace(refuse, '')
        .toLowerCase();

      const getStart = val => {
        let start = -1;
        for (let i = 0; i !== before.length; ++i) {
          start = Math.max(
            start,
            val.toLowerCase().indexOf(before[i], start + 1)
          );
        }
        return start;
      };

      if (props.replace && props.replace(props.value) && op && !noOp) {
        let start = getStart(evtValue);

        const c = evtValue.substr(start + 1).replace(refuse, '')[0];
        start = evtValue.indexOf(c, start + 1);

        evtValue = `${evtValue.substr(0, start)}${evtValue.substr(start + 1)}`;
      }

      const formattedValue = props.format(evtValue);

      if (props.value === formattedValue) {
        refresh();
      } else {
        props.onChange(formattedValue);
      }

      return () => {
        let start = getStart(formattedValue);

        // format usually looks better without this
        if (props.replace && (op || (del && !delWasNoOp))) {
          while (
            formattedValue[start + 1] &&
            refuse.test(formattedValue[start + 1])
          ) {
            start += 1;
          }
        }

        input.selectionStart = input.selectionEnd =
          start + 1 + (delWasNoOp ? 1 : 0);
      };
    }
  });

  React.useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.code === 'Delete') {
        delRef.current = true;
      }
    };

    const handleKeyUp = (evt: KeyboardEvent) => {
      if (evt.code === 'Delete') {
        delRef.current = false;
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
