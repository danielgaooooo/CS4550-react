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
            courseTitle: ''
        };
        this.courseService = CourseService.instance;
        this.selectCourse = this.selectCourse.bind(this);
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
                this.setState({courseTitle: course.title})
            });
    }

    render() {
        return (
            <div>
                <h1>Editing course {this.state.courseId}: {this.state.courseTitle}</h1>
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