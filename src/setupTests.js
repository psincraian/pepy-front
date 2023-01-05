const Enzyme = require('enzyme');
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new Adapter() });

document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});
