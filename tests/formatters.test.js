import Alea from 'alea';
import { currencyFormat, formatNumber } from './format';

test('currencyFormat', async () => {
  expect(currencyFormat('0', true)).toEqual('0.00');
  expect(currencyFormat('10', true)).toEqual('10.00');
  expect(currencyFormat('100', true)).toEqual('100.00');
  expect(currencyFormat('100', true)).toEqual('100.00');
  expect(currencyFormat('100')).toEqual('1.00');

  const prng = new Alea(1000);

  for (let i = 0; i != 1000; ++i) {
    const val = prng() * i;
    expect(currencyFormat(currencyFormat(`${val}`, true))).toEqual(currencyFormat(`${val}`, true));
  }
});

test('formatNumber check that format(format(v)) === format(v) in case of parse is identity', () => {
  const prng = new Alea(1000);

  for (let scale = 0; scale !== 5; ++scale) {
    const formatNonFixed = v => formatNumber(v, scale, false);
    const formatFixed = v => formatNumber(v, scale, true);

    for (let i = 0; i != 1000; ++i) {
      const val = prng() * i;
      expect(formatNonFixed(formatNonFixed(`${val}`))).toEqual(formatNonFixed(`${val}`));
      expect(formatFixed(formatFixed(`${val}`))).toEqual(formatFixed(`${val}`));
    }
  }
});

test("formatNumber check that format doesn't change original value", () => {
  const prng = new Alea(1000);
  const parse = str => str.replace(/[^\d.]+/g, '');

  for (let scale = 0; scale !== 5; ++scale) {
    const formatNonFixed = v => formatNumber(v, scale, false);
    const formatFixed = v => formatNumber(v, scale, true);
    for (let i = 0; i != 1000; ++i) {
      const val = prng() * i;
      const [head, tail] = val.toString().split('.');
      const expectVal = Number.parseFloat(`${head}.${tail != null ? tail.slice(0, scale) : ''}`);

      expect(Number.parseFloat(parse(formatNonFixed(`${val}`)))).toEqual(expectVal);
      expect(Number.parseFloat(parse(formatFixed(`${val}`)))).toEqual(expectVal);
    }
  }
});

test('formatNumber fixed must return equal to scale amount of digits at fractional part', () => {
  const prng = new Alea(100230);
  for (let scale = 0; scale !== 5; ++scale) {
    const formatFixed = v => formatNumber(v, scale, true);
    for (let i = 0; i !== 1000; ++i) {
      const val = prng() * i;
      const [, tail] = formatFixed(`${val}`)
        .toString()
        .split('.');
      expect(tail != null ? tail.length : 0).toEqual(scale);
    }
  }
});

test('formatNumber non fixed must not allow 0 as scale position', () => {
  // because parseFloat will always remove that 0, and at least at scale position we can prevent it
  const formatNonFixed1 = v => formatNumber(v, 1, false);
  const formatNonFixed2 = v => formatNumber(v, 2, false);
  const formatNonFixed3 = v => formatNumber(v, 3, false);
  const formatNonFixed4 = v => formatNumber(v, 4, false);
  expect(formatNonFixed1('0.0')).toEqual('0.');
  expect(formatNonFixed2('0.10')).toEqual('0.1');
  expect(formatNonFixed3('0.110')).toEqual('0.11');
  expect(formatNonFixed4('0.1110')).toEqual('0.111');
});

test('formatNumber non fixed must allow 0 otherwise impossible to enter 0.101', () => {
  const formatNonFixed = v => formatNumber(v, 3, false);
  expect(formatNonFixed('0.1')).toEqual('0.10');
});
