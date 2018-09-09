import Alea from 'alea';
import { currencyFormat } from '../docs/format';

test('currencyFormat', async () => {
  expect(currencyFormat('0', true)).toEqual('0.00');
  expect(currencyFormat('10', true)).toEqual('10.00');
  expect(currencyFormat('100', true)).toEqual('100.00');
  expect(currencyFormat('100', true)).toEqual('100.00');
  expect(currencyFormat('100')).toEqual('1.00');

  const prng = new Alea(1000);

  for (let i = 0; i != 1000; ++i) {
    const val = prng() * i;
    expect(currencyFormat(currencyFormat(`${val}`, true))).toEqual(
      currencyFormat(`${val}`, true)
    );
  }
});
