import React, {Component} from 'react'
import CourseDeck from '../component/CourseDeck'

export default class CourseManager extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Course Manager</h1>
                <CourseDeck/>
            </div>
        )
    }
}