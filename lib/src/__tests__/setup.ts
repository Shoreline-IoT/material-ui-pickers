import '@testing-library/jest-dom';

const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

// Fix popper mount https://github.com/mui-org/material-ui/issues/15726
// TODO, upgrade jsdom to 16.0.0 and remove this line.
document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  // @ts-ignore
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});

// Convert any console error into a thrown error
const error = console.error;
console.error = (...args: any[]) => {
  error.apply(console, args as any);
  if (args[0] instanceof Error) {
    throw args[0];
  } else {
    // combine multi args into a string
    const message = args
      .map(value => {
        if (typeof value === 'object') {
          return JSON.stringify(value);
        } else {
          return value;
        }
      })
      .join(' ');
    throw new Error(message);
  }
};
