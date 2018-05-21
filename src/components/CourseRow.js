import React from 'react';
import CourseService from '../services/CourseService';
import {Link} from 'react-router-dom';

export default class CourseRow extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    deleteCourse() {
        this.courseService.deleteCourse(this.props.course.id)
            .then(this.props.handler);

    }

    render() {
        return (
            <tr>
                <td>
                    <Link to={`/course/${this.props.course.id}`}>
                        {this.props.course.title}
                    </Link>
                </td>
                <td>{this.props.course.owner}</td>
                <td>{this.props.course.created}</td>
                <td>{this.props.course.created}</td>
                <td>
                    <button
                        onClick={this.deleteCourse}
                        className="btn btn-danger">
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
}