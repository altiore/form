import Enzyme from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import jsdom from 'jsdom';

Enzyme.configure({adapter: new Adapter()});

const doc = new jsdom.JSDOM('<!doctype html><html><body></body></html>');
global.document = doc.window.document;
global.window = doc.window;
