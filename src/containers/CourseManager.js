import React, {Component} from 'react';
import CourseDeck from './CourseDeck';
import CourseEditor from './CourseEditor';

export default class CourseManager extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Course Manager</h1>
                <CourseEditor/>
                <CourseDeck/>
            </div>
        )
    }
}