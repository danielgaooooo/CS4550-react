import React, {Component} from 'react';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';
import HomePage from './HomePage';
import {BrowserRouter as Router, Route} from 'react-router-dom';


export default class CourseManager extends Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <Route exact path="/courses" component={CourseList}>
                    </Route>
                    <Route path="/course/:courseId"component={CourseEditor}>
                    </Route>
                    <a href="/courses">Course List</a>
                </div>
            </Router>
        )
    }
}