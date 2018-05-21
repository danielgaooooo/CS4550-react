import React from 'react';
import LessonService from '../services/LessonService';
import {Link} from 'react-router-dom';

export default class LessonRow extends React.Component {
    constructor(props) {
        super(props);
        this.lessonService = LessonService.instance;
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    deleteCourse() {
        this.lessonService.deleteCourse(this.props.lesson.id)
            .then(this.props.handler);

    }

    render() {
        return (
            <div>
                <li className="nav-item">
                    <a className="nav-link"
                       href="#">{this.props.lesson.title}</a>
                </li>
            </div>
        )
    }
}