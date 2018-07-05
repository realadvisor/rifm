/* @flow */

export const numberFormat = (str: string) => {
  const r = parseInt(str.replace(/[^\d]+/gi, ''), 10);

  return r ? r.toLocaleString('en') : '';
};

export const currencyFormat = (str: string) => {
  const clean = str.replace(/[^\d.]+/gi, '');

  const beautify =
    clean.length > 2
      ? clean.indexOf('.') === -1
        ? `${clean.substr(0, clean.length - 2)}.${clean.substr(-2)}`
        : `${clean.split('.')[0]}.${clean.split('.')[1].substr(0, 2)}`
      : clean;

  const r = parseFloat(beautify);

  return r
    ? r.toLocaleString('de-CH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : '';
};

export const dateFormat = (str: string) => {
  const clean = str.replace(/[^\d]+/gi, '');
  return [...clean].reduce(
    (r, v, index) =>
      (index === 2 || index === 4 ? `${r}-${v}` : `${r}${v}`).substr(0, 10),
    ''
  );
};

const dtSym = '__-__-____';

export const dateFormatSym = (str: string) => {
  const clean = str.replace(/[^\d]+/gi, '');
  const r = [...clean].reduce(
    (r, v, index) =>
      (index === 2 || index === 4 ? `${r}-${v}` : `${r}${v}`).substr(0, 10),
    ''
  );

  if (r.length === 0) return r;

  return `${r}${dtSym.substr(r.length)}`;
};
