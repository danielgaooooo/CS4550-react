import React from 'react'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'
import {BrowserRouter as Router, Route} from 'react-router-dom';

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
        const MyModuleList = () => {
            return (
                <ModuleList courseId={this.state.courseId}/>
            )
        };

        const MyLessonTabs = () => {
            return (
                <LessonTabs courseId={this.state.courseId}/>
            )
        };

        return (
            <div>
                <h2>Editing course: {this.state.courseId}</h2>
                <div className="row">
                    <div className="col-4">
                        <ModuleList courseId={this.state.courseId}/>
                        {/*<Route path="/course/:courseId"*/}
                               {/*component={MyModuleList}>*/}
                        {/*</Route>*/}
                    </div>
                    <div className="col-8">
                        <LessonTabs courseId={this.state.courseId}/>
                        {/*<Route path='/course/:courseId/module/:moduleId'*/}
                               {/*component={MyLessonTabs}>*/}
                        {/*</Route>*/}
                    </div>
                </div>
            </div>
        );
    }
}