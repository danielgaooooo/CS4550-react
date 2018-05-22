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
        if (window.confirm('Are you sure you want to delete this course?')) {
            this.courseService.deleteCourse(this.props.course.id)
                .then(this.props.handler);
        }
    }

    render() {
        var date = this.props.course.modified.substr(0, 16);
        var dateDay = parseInt(date.substr(8, 2));
        var dateMonth = parseInt(date.substr(5, 2));
        var dateYear = parseInt(date.substr(0, 4));
        var dateHour = parseInt(date.substr(11, 13)) - 4;
        if (dateHour < dateHour % 24) {
            dateDay -= 1;
            dateHour %= 24;
        }
        return (
            <tr>
                <td>
                    {this.props.course.title}
                </td>
                <td>{this.props.course.owner}</td>
                <td>{date.substr(0, 8) + dateDay + ' at ' + dateHour + date.substr(13)}</td>
                <td>
                <span>
                    <button onClick={this.deleteCourse}>
                        <i className="fa fa-trash"></i>
                    </button>
                    <Link to={`/course/${this.props.course.id}`}>
                    <button>
                        <i className="fa fa-pencil"></i>
                    </button>
                    </Link>
                </span>
                </td>
            </tr>
        )
    }
}