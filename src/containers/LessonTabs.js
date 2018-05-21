import React from 'react'
import LessonService from "../services/LessonService";
import LessonRow from "../components/LessonRow";

export default class LessonTabs
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lesson: {title: ''},
            lessons: []
        };
        this.lessonService = LessonService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    findAllLessons() {
        this.lessonService.findAllLessons()
            .then((lessons) => {
                this.setState({lessons: lessons});
            })
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    titleChanged(event) {
        this.setState({
            lesson: {
                title: event.target.value
            }
        })
    }

    createLesson() {
        this.lessonService.createLesson(this.state.courseId, this.state.lesson)
            .then(this.findAllLessons());
    }

    handleDelete() {
        this.findAllLessons();
    }

    renderLessonTabs() {
        var handleDelete = this.handleDelete;
        let courses = null;
        if (this.state) {
            courses = this.state.lessons.map(
                function (lesson) {
                    return <LessonRow key={lesson.id} lesson={lesson} handler={handleDelete}/>
                }
            );
        }
        return (
            courses
        )
    }

    render() {
        return (
            <div>
                <input onChange={this.titleChanged}
                       value={this.state.lesson.title}
                       placeholder="New Lesson"
                       className="form-control"/>
                <button onClick={this.createLesson} className="btn btn-primary btn-block">
                    <i className="fa fa-plus"></i>
                </button>
                <ul className="nav nav-tabs">
                    {this.renderLessonTabs()}
                </ul>
            </div>
        );
    }
}
