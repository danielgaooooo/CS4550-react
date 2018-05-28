import React from 'react';
import LessonService from '../services/LessonService';
import {Link} from 'react-router-dom';

export default class LessonRow extends React.Component {
    constructor(props) {
        super(props);
        this.lessonService = LessonService.instance;
        this.deleteLesson = this.deleteLesson.bind(this);
        this.updateLesson = this.updateLesson.bind(this);
        this.state = {
            editing: false,
            title: ''
        };
        this.confirm = this.confirm.bind(this);
        this.edit = this.edit.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
    }

    titleChanged = (event) => {
        this.setState({title: event.target.value})
    };

    confirm = () => {
        this.setState({editing: false});
        this.updateLesson();
    };

    edit = () => {
        this.setState({editing: true})
    };

    deleteLesson() {
        if (window.confirm('Are you sure you want to delete this lesson?')) {
            this.lessonService.deleteLesson(this.props.lesson.id)
                .then(this.props.handler);
        }
    }

    updateLesson() {
        if (this.state.title === '') {
            window.alert('You must give your lesson a name.');
        } else {
            this.lessonService.updateLesson(this.props.lesson.id, this.state)
                .then(this.props.handler);
        }
    }

    render() {
        return (

            <div className="btn-group-vertical">
                <div hidden={this.state.editing}>
                    <li className="nav-item, row" style={{paddingLeft: 15, paddingRight: 15}}>
                        <div className="nav-link" style={{
                            alignItems: "center",
                            justifyContent: "center", display: "flex", padding: 0
                        }}>
                            <div className="list-group-item">
                                <Link
                                    to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`}
                                    style={{paddingRight: 10}}>
                                    {this.props.lesson.title}
                                </Link>
                                <span>
                                        <button className="btn"
                                                style={{width: 30, padding: 0}}
                                                onClick={this.deleteLesson}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                        <button className="btn"
                                                style={{width: 30, padding: 0}}
                                                onClick={this.edit}>
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                </span>
                            </div>
                        </div>
                    </li>
                </div>
                <div hidden={!this.state.editing}>
                    <input onChange={this.titleChanged}
                           className="form-control"
                           id="titleFld"
                           placeholder={this.props.lesson.title}/>
                    <button style={{width: 30, padding: 0}}
                            className="btn"
                            onClick={this.confirm}>
                        <i className="fa fa-check"></i>
                    </button>
                </div>
            </div>
        )
    }
}