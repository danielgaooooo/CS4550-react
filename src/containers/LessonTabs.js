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
        // this.lessonChanged = this.lessonChanged.bind(this);
    }

    moduleChanged = (moduleId) => {
        this.setState({moduleId: moduleId});
        this.findAllLessons();
    };

    findAllLessons() {
        this.lessonService.findAllLessonsForModule(this.props.match.params.courseId,
            this.props.match.params.moduleId)
            .then((lessons) => {
                this.setState({lessons: lessons});
            });
    }

    componentDidMount() {
        this.moduleChanged(this.props.moduleId)
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        this.moduleChanged(newProps.match.params.moduleId)
    }

    // componentDidUpdate() {
    //     this.findAllLessons();
    // }

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
        var handleDelete = this.handleDelete;
        var handleUpdate = this.handleUpdate;
        let courses = null;
        if (this.state) {
            courses = this.state.lessons.map(
                function (lesson) {
                    return <LessonRow key={lesson.id}
                                      lesson={lesson} handler={handleDelete}
                                      handleUpdate={handleUpdate}/>
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
                                    className="form-control"/>
                                <span>
                                    <button className="btn-block btn-primary" onClick={this.createLesson}>
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
