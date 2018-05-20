import React, {Component} from 'react';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';
import {BrowserRouter as Router} from 'react-router-dom';


export default class CourseManager extends Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <h1>Course Manager</h1>
                    <CourseEditor/>
                    <CourseList/>
                </div>
            </Router>
        )
    }
}