# RIFM - React Input Format & Mask

Is a tiny (≈ 800b) component to transform any input component
into formatted or masked input.

[Demo](https://istarkov.github.io/rifm)

## Highlights

- Requires React 16.4+
- Dependency free
- Tiny (≈ 800b)
- Supports any [input](https://istarkov.github.io/rifm#material-ui).
- Can mask input and format

## Example

```js
import { Rifm } from 'rifm';
import TextField from '@material-ui/core/TextField';
import { css } from 'emotion';

const numberFormat = (str: string) => {
  const r = parseInt(str.replace(/[^\d]+/gi, ''), 10);
  return r ? r.toLocaleString('en') : '';
}

...

  const [value, setValue] = React.useState('')

  <Rifm
    value={value}
    onChange={setValue}
    format={numberFormat}
  >
    {({ value, onChange }) => (
      <TextField
        value={value}
        label={'Float'}
        onChange={onChange}
        className={css({input: {textAlign:"right"}})}
        type="tel"
      />
    )}
  </Rifm>

...
```

## Install

```sh
yarn add rifm
```

## API

### Terminology

Rifm is based on a simple ideas (_\*_):

- format operation doesn't change the order of some symbols after edit
- all that symbols are placed before input cursor position

Example:
_In all examples "|" shows current cursor position_

- Imagine you have simple integer number formatter with **'** as thousands separator
  and current input state is _123'4_**|**_67_.

  Then user press _5_ button and formatted input must be equal to _1'234'5_**|**_67_.

  Even the overall order of elements has changed
  (was _1->2->3->'->4->..._ became _1->'->2->3->4..._)
  the order of few digits before cursor hasn't changed.

Same will be for float numbers formatting, etc,
just symbols with preserved oreder are different.
We call this kind of symbols - **"accepted"** symbols.

Rifm solves only one task -
find the right place for cursor after formatting.

Knowledge about what symbols are **"accepted"**
_or in other words doesn't change order after formatting_
and cursor position in input after any user action
is enough to find final cursor position.

Other simple idea that mask usually is nothing more
than format + replace symbols instead of insert in some edit cases.

So mask is just symbol editing mode in this cases.

### Props

| Prop         | type                      | default |                                  Description                                   |
| ------------ | :------------------------ | :------ | :----------------------------------------------------------------------------: |
| **accept**   | RegExp (optional)         | /\d/g   |              Regular expression to detect **"accepted"** symbols               |
| **format**   | string=> string           |         |                                format function                                 |
| **value**    | string                    |         |                                  input value                                   |
| **onChange** | string =>void             |         |                          event fired on input change                           |
| **children** | ({value,onChange})=>Node  |         |    value and onChange handler you need to pass to underlying input element     |
| **mask**     | boolean (optional)        |         |                          switch on replace input mode                          |
| **replace**  | string=> string(optional) |         | postprocess format allowing you to fully replace all symbols preserving cursor |

For

_\*_ This ideas are not always true, but we solve some edge cases where it's not.

## Thanks

[@TrySound](https://github.com/TrySound) for incredible help and support on this
