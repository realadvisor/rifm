# RIFM - React Input Format & Mask

Is a tiny (≈ 800b) component to transform any input component
into formatted or masked input.

[Demo](https://istarkov.github.io/rifm)

## Highlights

- Requires React 16.8+
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

Rifm is based on few simple ideas (**\***):

- format operation doesn't change the order of some symbols after edit
- all that symbols are placed before input cursor position

**\*** _These ideas are not always true, but we solve some edge cases where it's not._

Example:
_In all examples "|" shows current cursor position_

- Imagine you have simple integer number formatter with **\`** as thousands separator
  and current input state is _123\`4_**|**_67_.

  Then user press _5_ button and then formatted input must be equal to _1\`234\`5_**|**_67_.

  Even the overall order of elements has changed
  (was _1->2->3->\`->4->..._
  became _1->\`->2->3->4..._)
  the order of digits before cursor hasn't changed
  (was _1->2->3->4_ and hasn't changed).

The same is true for float numbers formatting, dates and more.
Just symbols with preserved order are different and depends on format.
We call this kind of symbols - **"accepted"** symbols.

Rifm solves only one task -
find the right place for cursor after formatting.

Knowledge about what symbols are **"accepted"**
_or in other words doesn't change order after formatting_
and cursor position in input after any user action
is enough to find the final cursor position.

Other simple idea that mask usually is nothing more
than editing mode. Instead of insert symbol mode, in some edit cases masks use replace.

### Props

| Prop         | type                          | default | Description                                                                         |
| ------------ | :---------------------------- | :------ | :---------------------------------------------------------------------------------- |
| **accept**   | RegExp (optional)             | /\d/g   | Regular expression to detect **"accepted"** symbols                                 |
| **format**   | string => string              |         | format function                                                                     |
| **value**    | string                        |         | input value                                                                         |
| **onChange** | string => void                |         | event fired on input change                                                         |
| **children** | ({ value, onChange }) => Node |         | value and onChange handler you need to pass to underlying input element             |
| **mask**     | boolean (optional)            |         | switch on replace input mode                                                        |
| **replace**  | string => string (optional)   |         | format postprocessor allows you to fully replace any/all symbol/s preserving cursor |

## Thanks

[@TrySound](https://github.com/TrySound) for incredible help and support on this
