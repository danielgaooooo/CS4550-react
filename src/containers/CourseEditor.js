import React from 'react'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default class CourseEditor
    extends React.Component {

    constructor(props) {
        super(props);
        this.state = {courseId: ''};
        this.selectCourse = this.selectCourse.bind(this);
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    render() {
        return (
            <div>
                <h1>Editing course {this.state.courseId}</h1>
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