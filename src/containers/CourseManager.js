import React, {Component} from 'react';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class CourseManager extends Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <h1>Welcome to Course Manager!</h1>
                    <Link to='/courses'>Click here to see the your list of courses.</Link>
                    <Route exact path="/courses" component={CourseList}>
                    </Route>
                    <Route path="/course/:courseId"
                           component={CourseEditor}>
                    </Route>
                </div>
            </Router>
        )
    }
}