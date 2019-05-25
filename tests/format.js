/* @flow */
/* simple fomtatters without number overflow checks etc */

import { AsYouType } from 'libphonenumber-js';

export const numberFormat = (str: string) => {
  const r = parseInt(str.replace(/[^\d]+/gi, ''), 10);

  return r ? r.toLocaleString('en') : '';
};

export const negNumberFormat = (str: string) => {
  const clean = str.replace(/[^\d-]+/gi, '');
  if (clean === '-') return '-';
  const r = parseInt(clean, 10);

  return r ? r.toLocaleString('en') : '';
};

export const currencyFormat = (str: string, isInitial?: boolean) => {
  const clean = str.replace(/[^\d.]+/gi, '');

  const beautify =
    clean.indexOf('.') === -1
      ? clean.length > 2 && isInitial !== true
        ? `${clean.substr(0, clean.length - 2)}.${clean.substr(-2)}`
        : clean
      : `${clean.split('.')[0]}.${clean.split('.')[1].substr(0, 2)}`;

  const r = parseFloat(beautify);

  return !Number.isNaN(r)
    ? r.toLocaleString('de-CH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : '';
};

const prepareFraction = (fraction, maximumFractionDigits) => {
  const removeTrailingZero = false;
  const substrFrac = fraction.substr(
    0,
    maximumFractionDigits -
      (removeTrailingZero && fraction[maximumFractionDigits - 1] === '0'
        ? 1
        : 0)
  );

  return substrFrac;
};

// poor raw prototype for future universal number format
export const currencyFormat2 = (str: string, isInitial?: boolean) => {
  const maximumFractionDigits = 2;
  const minimumFractionDigits = 0;

  const clean = str.replace(/[^\d.]+/gi, ''); // .replace(/0+$/, '');

  const [base, fract = ''] = clean.split('.');
  const fraction = prepareFraction(fract, maximumFractionDigits);
  const preventRounding = !fraction
    ? clean.length > minimumFractionDigits &&
      minimumFractionDigits > 0 &&
      isInitial !== true
      ? `${clean.substr(
          0,
          clean.length - minimumFractionDigits
        )}.${clean.substr(-minimumFractionDigits)}`
      : clean
    : `${base}.${fraction}`;

  const r = parseFloat(preventRounding);

  const formatted = r.toLocaleString('de-CH', {
    minimumFractionDigits,
    maximumFractionDigits,
  });
  const [, formattedFraction = ''] = formatted.split('.');

  const res = Number.isNaN(r)
    ? ''
    : formatted +
      (isInitial === true
        ? ''
        : (formattedFraction.length === 0 && clean.indexOf('.') > -1
            ? '.'
            : '') +
          (formattedFraction.length < maximumFractionDigits &&
          fraction.length > formattedFraction.length
            ? fraction.substring(
                formattedFraction.length,
                maximumFractionDigits
              )
            : ''));

  return res;
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
