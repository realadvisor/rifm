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

## Thanks

[@TrySound](https://github.com/TrySound) for incredible help and support on this
