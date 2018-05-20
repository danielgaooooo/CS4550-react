import React from 'react';
import CourseService from '../services/CourseService';
import {Link} from 'react-router-dom';

export default class CourseRow extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
    }

    // deleteCourse(courseId) {
    //     this.courseService.deleteCourse(courseId).then()
    // }

    render() {
        return (
            <tr>
                <td>
                    <Link to={`/course/${this.props.course.id}`}>
                        {this.props.course.title}
                    </Link>
                </td>
                <td>
                    <button
                            className="btn btn-danger">
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
}