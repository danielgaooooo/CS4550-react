import React from 'react'
import LessonService from "../services/LessonService";
import LessonRow from "../components/LessonRow";
import ModuleService from "../services/ModuleService";

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
        this.moduleService = ModuleService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.moduleChanged = this.moduleChanged.bind(this);
    }

    moduleChanged = (moduleId) => {
        this.setState({moduleId: moduleId}, () => this.findAllLessons());
    };

    findAllLessons() {

        this.lessonService.findAllLessonsForModule(this.props.match.params.courseId,
            this.state.moduleId)
            .then((lessons) => {
                this.setState({lessons: lessons});
            });
    }

    componentDidMount() {
        this.moduleChanged(this.props.match.params.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.moduleChanged(newProps.match.params.moduleId)
    }

    titleChanged(event) {
        this.setState({
            lesson: {
                title: event.target.value
            }
        })
    }

    createLesson() {
        this.lessonService.createLesson(this.props.match.params.courseId, this.props.match.params.moduleId,
            this.state.lesson)
            .then(() => this.findAllLessons());
    }

    handleDelete() {
        this.findAllLessons();
    }


    renderLessonTabs() {
        var self = this;
        var state = this.state;
        var handleDelete = this.handleDelete;
        let courses = null;
        if (state) {
            courses = state.lessons.map(
                function (lesson) {
                    return <LessonRow key={lesson.id}
                                      courseId={self.props.match.params.courseId}
                                      moduleId={state.moduleId}
                                      lesson={lesson}
                                      handler={handleDelete}/>
                }
            );
        }
        return (courses)
    }

    render() {
        return (
            <div>
                <h3>Lessons</h3>
                <ul className="nav nav-tabs">
                    {this.renderLessonTabs()}
                    <li className="nav-item, row" style={{paddingLeft: 15}}>
                        <div className="nav-link active" style={{padding: 0}}>
                            <div className="list-group-item">
                                <input
                                    onChange={this.titleChanged}
                                    value={this.state.lesson.title}
                                    placeholder="New Lesson"
                                    className="form-control"
                                    style={{width: 120}}/>
                                <span>
                                    <button className="btn-block btn-primary"
                                            onClick={this.createLesson}
                                            style={{width: 120}}>
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
