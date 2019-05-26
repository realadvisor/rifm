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
