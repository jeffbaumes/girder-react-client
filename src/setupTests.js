import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { URLSearchParams } from 'url';

global.URLSearchParams = URLSearchParams;

configure({ adapter: new Adapter() });
