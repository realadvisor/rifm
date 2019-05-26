/* @flow */
/* simple fomtatters without number overflow checks etc */

import { AsYouType } from 'libphonenumber-js';

const numberAccept = /[\d.]+/g;

const parseNumber = string => (string.match(numberAccept) || []).join('');

const formatNumber = (string, scale, fixed) => {
  const parsed = parseNumber(string);
  const [head, tail] = parsed.split('.');
  const scaledTail = tail != null ? tail.slice(0, scale) : '';

  let number = Number.parseFloat(`${head}.${scaledTail}`);

  // For fixed format numbers deleting "." must be no-op
  // as imagine u have 123.45 then delete "." and get 12345.00 looks bad in UI
  // so we transform here 12345 into 123.45 instead of 12345.00.
  // The main disadvantage of this, that you need carefully check input value
  // that it always has fractional part
  if (scale > 0 && fixed && tail == null) {
    const paddedHead = head.padStart(scale + 1 - head.length, '0');
    number = Number.parseFloat(
      `${paddedHead.slice(0, -scale)}.${paddedHead.slice(-scale)}`
    );
  }

  if (Number.isNaN(number)) {
    return '';
  }

  const formatted = number.toLocaleString('de-CH', {
    minimumFractionDigits: fixed ? scale : 0,
    maximumFractionDigits: scale,
  });

  if (!fixed && parsed.includes('.')) {
    const [formattedHead] = formatted.split('.');
    return `${formattedHead}.${
      // skip zero at scale position for non fixed floats
      // as at scale 2 for non fixed floats numbers like 1.50 has no sense, just 1.5 allowed
      // but 1.0 has sense as otherwise you will not be able to enter 1.05 for example
      scaledTail !== '' && scaledTail[scale - 1] === '0'
        ? scaledTail.slice(0, -1)
        : scaledTail
    }`;
  }
  return formatted;
};

export const formatFixedPointNumber = (
  value: string,
  scale: number
): string => {
  return formatNumber(value, scale, true);
};

export const formatFloatingPointNumber = (
  value: string,
  maxScale: number
): string => {
  return formatNumber(value, maxScale, false);
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
