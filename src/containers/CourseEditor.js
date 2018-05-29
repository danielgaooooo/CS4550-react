import React from 'react'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'
import {Route} from 'react-router-dom';
import CourseService from "../services/CourseService";
import App from './WidgetList';

export default class CourseEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            title: ''
        };
        this.courseService = CourseService.instance;
        this.selectCourse = this.selectCourse.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
        this.getCourseName();
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    getCourseName() {
        this.courseService.findCourseById(this.props.match.params.courseId)
            .then((course) => {
                this.setState({title: course.title})
            });
    }

    titleChanged(event) {
        this.setState({
            title: event.target.value,
        });
    }

    updateCourse() {
        this.courseService.updateCourse(this.props.match.params.courseId, this.state)
            .then(this.props.handler);
    }

    render() {
        return (
            <div>
                <div className="card-header">
                    <h1>Course Editor</h1>
                    <div className="row" style={{paddingLeft: 15}}>
                        <input onChange={this.titleChanged}
                               className="form-control"
                               id="titleFld"
                               style={{width: 200}}
                               value={this.state.title}/>
                        <button className="btn btn-outline-secondary"
                                onClick={this.updateCourse}>
                            <i className="fa fa-check">
                            </i>
                        </button>
                    </div>
                </div>
                <div className="row" style={{paddingTop: 20}}>
                    <div className="col-4">
                        <ModuleList courseId={this.state.courseId}/>
                    </div>
                    <div className="col-8">
                        <Route path="/course/:courseId/module/:moduleId"
                               component={LessonTabs}>
                        </Route>
                        <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId"
                               component={App}>
                        </Route>
                    </div>
                </div>
                <div>
                    <br></br>
                </div>
            </div>
        );
    }
}