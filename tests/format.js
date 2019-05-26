/* @flow */
/* simple fomtatters without number overflow checks etc */

import { AsYouType } from 'libphonenumber-js';

const numberAccept = /[\d.]+/g;

const parseNumber = string => (string.match(numberAccept) || []).join('');

export const formatNumber = (
  string: string,
  scale: number,
  fixed: boolean
): string => {
  const parsed = parseNumber(string);
  const [head, tail] = parsed.split('.');
  const tl = tail != null ? tail.slice(0, scale) : '';

  let number = Number.parseFloat(`${head}.${tl}`);

  if (scale > 0 && fixed && tail == null) {
    const headPad = head.padStart(scale + 1 - head.length, '0');
    number = Number.parseFloat(
      `${headPad.slice(0, -scale)}.${headPad.slice(-scale)}`
    );
  }

  if (Number.isNaN(number)) {
    return '';
  }

  const formatted = number.toLocaleString('de-CH', {
    minimumFractionDigits: fixed ? scale : 0,
    maximumFractionDigits: scale,
  });

  // non fixed part can be removed for fixed floats
  if (!fixed && parsed.includes('.')) {
    return (
      formatted.split('.')[0] +
      '.' +
      // skip zero at scale position for non fixed floats
      (tl !== '' && tl[scale - 1] === '0' ? tl.slice(0, -1) : tl)
    );
  }
  return formatted;
};

export const negNumberFormat = (str: string) => {
  const clean = str.replace(/[^\d-]+/gi, '');
  if (clean === '-') return '-';
  const r = parseInt(clean, 10);

  return r ? r.toLocaleString('en') : '';
};

export const dateFormat = (str: string) => {
  const clean = str.replace(/[^\d]+/gi, '');
  const chars = clean.split('');
  return chars.reduce(
    (r, v, index) =>
      (index === 2 || index === 4 ? `${r}-${v}` : `${r}${v}`).substr(0, 10),
    ''
  );
};

const dtSym = '__-__-____';

export const dateFormatSym = (str: string) => {
  const clean = str.replace(/[^\d]+/gi, '');
  const chars = clean.split('');
  const r = chars.reduce(
    (r, v, index) =>
      (index === 2 || index === 4 ? `${r}-${v}` : `${r}${v}`).substr(0, 10),
    ''
  );

  if (r.length === 0) return r;

  return `${r}${dtSym.substr(r.length)}`;
};

const usPhone = new AsYouType('US');

export const formatPhone = (str: string) => {
  const clean = str.replace(/[^\d]+/gi, '').substr(0, 10);
  const r = usPhone.input(clean);
  usPhone.reset();

  return r;
};
