import React from 'react';
import LessonService from '../services/LessonService';

export default class LessonRow extends React.Component {
    constructor(props) {
        super(props);
        this.lessonService = LessonService.instance;
        this.deleteLesson = this.deleteLesson.bind(this);
    }

    deleteLesson() {
        this.lessonService.deleteLesson(this.props.lesson.id)
            .then(this.props.handler);

    }

    render() {
        return (
            <li className="nav-item, row" style={{paddingLeft: 15, paddingRight: 15}}>
                <div className="nav-link" style={{alignItems: "center",
                    justifyContent: "center", display: "flex", padding: 0}}>
                    <div className="list-group-item">
                        <a style={{paddingRight: 10}} href="#">
                            {this.props.lesson.title}
                        </a>
                        <span>
                            <button onClick={this.deleteLesson}>
                                <i className="fa fa-trash"></i>
                            </button>
                            <button>
                                <i className="fa fa-pencil"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </li>
        )
    }
}