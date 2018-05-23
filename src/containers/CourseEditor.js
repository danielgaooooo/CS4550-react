import React from 'react'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import CourseService from "../services/CourseService";

export default class CourseEditor
    extends React.Component {

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
                <div className="row">
                    <div className="col-6">
                        <h1>Editing course {this.state.courseId}</h1>
                    </div>
                    <div className="col-6">
                        <h1>Current name:</h1>
                        <tbody>
                        <tr>
                            <td>
                                <input onChange={this.titleChanged}
                                       className="form-control"
                                       id="titleFld"
                                       value={this.state.title}/>
                            </td>
                            <td>
                                <button className="btn btn-primary"
                                        onClick={this.updateCourse}>
                                    <i className="fa fa-check">

                                    </i></button>
                            </td>
                        </tr>
                        </tbody>
                    </div>
                </div>
                <Link to={`/courses`}>
                    <h6>Back to course list</h6>
                </Link>
                <div className="row">
                    <div className="col-4">
                        <ModuleList courseId={this.state.courseId}/>
                    </div>
                    <div className="col-8">
                        <Route path="/course/:courseId/module/:moduleId"
                               component={LessonTabs}>
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