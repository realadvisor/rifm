/* @flow */

export const numberFormat = (str: string) => {
  const r = parseInt(str.replace(/[^\d]+/gi, ''), 10);
  return r ? r.toLocaleString('en') : '';
};

export const currencyFormat = (str: string) => {
  const clean = str.replace(/[^\d.]+/gi, '');
  const restoreDigits =
    clean.length > 2 && clean.indexOf('.') === -1
      ? `${clean.substr(0, clean.length - 2)}.${clean.substr(-2)}`
      : clean;
  const r = parseFloat(restoreDigits);
  return r
    ? r.toLocaleString('de-CH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : '';
};
