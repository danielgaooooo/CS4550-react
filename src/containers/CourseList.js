import React from 'react'
import CourseRow from '../components/CourseRow'
import CourseService from "../services/CourseService";

export default class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    createCourse() {
        if (this.state.course.title !== "") {
            this.courseService.createCourse(this.state.course)
                .then(() => this.findAllCourses());
        } else {
            window.alert('Please give your course a name.');
        }
    }

    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
                this.setState({
                    course: {
                        title: '',
                        owner: ''
                    }
                });
            })
    }

    componentDidMount() {
        this.findAllCourses();
    }

    titleChanged(event) {
        this.setState({
            course: {
                title: event.target.value,
                owner: "Daniel Gao"
            }
        });
    }

    handleDelete() {
        this.findAllCourses();
    }

    renderCourseRows() {
        var handleDelete = this.handleDelete;
        let courses = null;
        if (this.state) {
            courses = this.state.courses.map(
                function (course) {
                    return <CourseRow key={course.id} course={course} handler={handleDelete}/>
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
                <div className="card-header">
                    <h1>Course Manager</h1>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Owner</th>
                        <th>Last modified</th>
                        <th>&nbsp;</th>
                    </tr>
                    <tr>
                        <th>
                            <input
                                onChange={this.titleChanged}
                                className="form-control"
                                id="titleFld"
                                placeholder="CS4550"/>
                        </th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>
                            <button
                                onClick={this.createCourse}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderCourseRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}