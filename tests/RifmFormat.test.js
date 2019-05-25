// @flow

import { numberFormat, currencyFormat, currencyFormat2 } from './format';
import { createExec } from './utils/exec';

test('format works', async () => {
  const exec = createExec({ format: numberFormat });

  exec({ type: 'PUT_SYMBOL', payload: '1' }).toMatchInlineSnapshot(`"1|"`);
  exec({ type: 'PUT_SYMBOL', payload: '46' }).toMatchInlineSnapshot(`"146|"`);

  exec({ type: 'MOVE_CARET', payload: -2 }).toMatchInlineSnapshot(`"1|46"`);
  exec({ type: 'PUT_SYMBOL', payload: '23' }).toMatchInlineSnapshot(`"12,3|46"`);

  exec({ type: 'MOVE_CARET', payload: 1 }).toMatchInlineSnapshot(`"12,34|6"`);
  exec({ type: 'PUT_SYMBOL', payload: '5' }).toMatchInlineSnapshot(`"123,45|6"`);

  exec({ type: 'MOVE_CARET', payload: -2 }).toMatchInlineSnapshot(`"123,|456"`);
  exec({ type: 'PUT_SYMBOL', payload: '9' }).toMatchInlineSnapshot(`"1,239|,456"`);
  exec({ type: 'PUT_SYMBOL', payload: '8' }).toMatchInlineSnapshot(`"12,398|,456"`);

  exec({ type: 'BACKSPACE' }).toMatchInlineSnapshot(`"1,239|,456"`);
  exec({ type: 'BACKSPACE' }).toMatchInlineSnapshot(`"123|,456"`);
  exec({ type: 'MOVE_CARET', payload: 1 }).toMatchInlineSnapshot(`"123,|456"`);

  exec({ type: 'BACKSPACE' }).toMatchInlineSnapshot(`"123|,456"`);
  exec({ type: 'MOVE_CARET', payload: 100 }).toMatchInlineSnapshot(`"123,456|"`);
  exec({ type: 'BACKSPACE' }).toMatchInlineSnapshot(`"12,345|"`);
  exec({ type: 'MOVE_CARET', payload: -100 }).toMatchInlineSnapshot(`"|12,345"`);
  exec({ type: 'MOVE_CARET', payload: 1 }).toMatchInlineSnapshot(`"1|2,345"`);
  exec({ type: 'BACKSPACE' }).toMatchInlineSnapshot(`"|2,345"`);
  exec({ type: 'PUT_SYMBOL', payload: '1' }).toMatchInlineSnapshot(`"1|2,345"`);
  exec({ type: 'PUT_SYMBOL', payload: 'x' }).toMatchInlineSnapshot(`"1|2,345"`);
});

test('format with custom accept works', async () => {
  const exec = createExec({
    accept: /[\d.]/gi,
    format: currencyFormat2,
  });

  exec({ type: 'PUT_SYMBOL', payload: '1' }).toMatchInlineSnapshot(`"1|"`);
  exec({ type: 'PUT_SYMBOL', payload: '46' }).toMatchInlineSnapshot(`"146|"`);
  exec({ type: 'MOVE_CARET', payload: -2 }).toMatchInlineSnapshot(`"1|46"`);
  exec({ type: 'PUT_SYMBOL', payload: '23' }).toMatchInlineSnapshot(`"12’3|46"`);
  exec({ type: 'MOVE_CARET', payload: 1 }).toMatchInlineSnapshot(`"12’34|6"`);
  exec({ type: 'PUT_SYMBOL', payload: '5' }).toMatchInlineSnapshot(`"123’45|6"`);

  exec({ type: 'MOVE_CARET', payload: -2 }).toMatchInlineSnapshot(`"123’|456"`);
  exec({ type: 'PUT_SYMBOL', payload: '9' }).toMatchInlineSnapshot(`"1’239|’456"`);
  exec({ type: 'PUT_SYMBOL', payload: '8' }).toMatchInlineSnapshot(`"12’398|’456"`);

  exec({ type: 'BACKSPACE' }).toMatchInlineSnapshot(`"1’239|’456"`);
  exec({ type: 'BACKSPACE' }).toMatchInlineSnapshot(`"123|’456"`);
  exec({ type: 'MOVE_CARET', payload: 1 }).toMatchInlineSnapshot(`"123’|456"`);
  exec({ type: 'BACKSPACE' }).toMatchInlineSnapshot(`"123|’456"`);
  exec({ type: 'MOVE_CARET', payload: 100 }).toMatchInlineSnapshot(`"123’456|"`);
  exec({ type: 'BACKSPACE' }).toMatchInlineSnapshot(`"12’345|"`);
  exec({ type: 'MOVE_CARET', payload: -100 }).toMatchInlineSnapshot(`"|12’345"`);
  exec({ type: 'MOVE_CARET', payload: 1 }).toMatchInlineSnapshot(`"1|2’345"`);
  exec({ type: 'BACKSPACE' }).toMatchInlineSnapshot(`"|2’345"`);
  exec({ type: 'PUT_SYMBOL', payload: '1' }).toMatchInlineSnapshot(`"1|2’345"`);
  exec({ type: 'PUT_SYMBOL', payload: 'x' }).toMatchInlineSnapshot(`"1|2’345"`);
  exec({ type: 'MOVE_CARET', payload: 100 }).toMatchInlineSnapshot(`"12’345|"`);
  exec({ type: 'PUT_SYMBOL', payload: '.' }).toMatchInlineSnapshot(`"12’345.|"`);
  exec({ type: 'PUT_SYMBOL', payload: '0' }).toMatchInlineSnapshot(`"12’345.0|"`);
  exec({ type: 'PUT_SYMBOL', payload: '0' }).toMatchInlineSnapshot(`"12’345.00|"`);
  exec({ type: 'MOVE_CARET', payload: -2 }).toMatchInlineSnapshot(`"12’345.|00"`);
  exec({ type: 'BACKSPACE' }).toMatchInlineSnapshot(`"1’234’5|00"`);
  exec({ type: 'MOVE_CARET', payload: -1 }).toMatchInlineSnapshot(`"1’234’|500"`);
  exec({ type: 'PUT_SYMBOL', payload: '.' }).toMatchInlineSnapshot(`"1’234.|50"`);
  exec({ type: 'MOVE_CARET', payload: -3 }).toMatchInlineSnapshot(`"1’2|34.50"`);
  exec({ type: 'PUT_SYMBOL', payload: '.' }).toMatchInlineSnapshot(`"12.|34"`);
  exec({ type: 'MOVE_CARET', payload: -1 }).toMatchInlineSnapshot(`"12|.34"`);
  exec({ type: 'BACKSPACE' }).toMatchInlineSnapshot(`"1|.34"`);
  exec({ type: 'BACKSPACE' }).toMatchInlineSnapshot(`"|0.34"`);

  exec({ type: 'DELETE' }).toMatchInlineSnapshot(`"0|.34"`);
  exec({ type: 'DELETE' }).toMatchInlineSnapshot(`"|34"`);
  exec({ type: 'DELETE' }).toMatchInlineSnapshot(`"|4"`);
  exec({ type: 'DELETE' }).toMatchInlineSnapshot(`"|"`);

  exec({ type: 'PUT_SYMBOL', payload: '123456789.12' }).toMatchInlineSnapshot(`"123’456’789.12|"`);
  exec({ type: 'MOVE_CARET', payload: -11 }).toMatchInlineSnapshot(`"123|’456’789.12"`);
  exec({ type: 'DELETE' }).toMatchInlineSnapshot(`"123’|456’789.12"`);
  exec({ type: 'DELETE' }).toMatchInlineSnapshot(`"12’3|56’789.12"`);
  exec({ type: 'DELETE' }).toMatchInlineSnapshot(`"1’23|6’789.12"`);
  exec({ type: 'DELETE' }).toMatchInlineSnapshot(`"123|’789.12"`);
  exec({ type: 'MOVE_CARET', payload: 1 }).toMatchInlineSnapshot(`"123’|789.12"`);
  exec({ type: 'BACKSPACE' }).toMatchInlineSnapshot(`"123|’789.12"`);
  exec({ type: 'MOVE_CARET', payload: 4 }).toMatchInlineSnapshot(`"123’789|.12"`);
  exec({ type: 'DELETE' }).toMatchInlineSnapshot(`"12’378’9|12"`);
});

test('format with fixed point delete backspace', async () => {
  const exec = createExec({
    accept: /[\d.]/gi,
    format: currencyFormat,
  });

  exec({ type: 'PUT_SYMBOL', payload: '123' }).toMatchInlineSnapshot(`"1.23|"`);
  exec({ type: 'MOVE_CARET', payload: -2 }).toMatchInlineSnapshot(`"1.|23"`);
  exec({ type: 'BACKSPACE' }).toMatchInlineSnapshot(`"1|.23"`);
  exec({ type: 'DELETE' }).toMatchInlineSnapshot(`"1.|23"`);
});

test('format works even if state is not updated on equal vals', async () => {
  const exec = createExec({
    format: numberFormat,
  });
  exec({ type: 'PUT_SYMBOL', payload: '123456' }).toMatchInlineSnapshot(`"123,456|"`);
  exec({ type: 'MOVE_CARET', payload: -3 }).toMatchInlineSnapshot(`"123,|456"`);
  exec({ type: 'BACKSPACE' }).toMatchInlineSnapshot(`"123|,456"`);
  exec({ type: 'DELETE' }).toMatchInlineSnapshot(`"123,|456"`);
  exec({ type: 'PUT_SYMBOL', payload: 'x' }).toMatchInlineSnapshot(`"123|,456"`);
  exec({ type: 'PUT_SYMBOL', payload: 'x' }).toMatchInlineSnapshot(`"123|,456"`);
});
