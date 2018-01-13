import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from 'girder-react-client';
import 'girder-plugin-table-view';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
