import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import CourseManager from './containers/CourseManager';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import widgetReducer from './reducers/WidgetReducer';


let store = createStore(widgetReducer);

ReactDOM.render(
    <Provider store={store}>
        <div className="container-fluid">
            <CourseManager/>
        </div>
    </Provider>,
    document.getElementById('root')
);
