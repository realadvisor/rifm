// should fail on node ./tests/testLayoutWarn.js
// should not fail on NODE_ENV=production node ./tests/testLayoutWarn.js

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { Rifm } = require('../dist/rifm.cjs.js');

global.window = {};

let err_ = null;
const realErr = console.error;
console.error = str => {
  realErr(str);
  err_ = str;
};

const res = ReactDOMServer.renderToString(
  React.createElement(
    Rifm,
    {
      value: 'hello',
      onChange: () => {},
      format: () => {},
    },
    ({ value }) => value
  )
);

console.info(res);

process.exit(err_ != null ? 1 : 0);
