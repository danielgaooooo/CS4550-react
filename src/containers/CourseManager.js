import React, {Component} from 'react';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CourseCard from "../components/CourseCard";


export default class CourseManager extends Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <h1>Course Manager</h1>

                    <Route path="/courses" component={CourseList}>
                    </Route>
                    <Route path="/course/:courseId"
                           component={CourseEditor}>
                    </Route>

                    {/*<Router path="/examples">*/}
                        {/*<div className="card-deck">*/}
                            {/*<CourseCard/>*/}
                            {/*<CourseCard/>*/}
                            {/*<CourseCard/>*/}
                            {/*<CourseCard/>*/}
                        {/*</div>*/}
                    {/*</Router>*/}
                </div>
            </Router>
        )
    }
}