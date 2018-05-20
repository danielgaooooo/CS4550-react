import React from 'react'
import CourseRow from '../components/CourseRow'
import CourseService from "../services/CourseService";

export default class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
    }

    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
            })
    }

    componentDidMount() {
        this.findAllCourses();
    }

    titleChanged(event) {
        this.setState({
            course: {
                title: event.target.value
            }
        })
    }

    createCourse() {
        console.log(this.state);
        this.courseService.createCourse(this.state.course)
            .then(this.findAllCourses());
    }

    renderCourseRows() {
        let courses = null;
        if (this.state) {
            courses = this.state.courses.map(
                function (course) {
                    return <CourseRow key={course.id} course={course}/>
                }
            );
        }
        return (
            courses
        )
    }

    render() {
        return (
            <div className="card-deck">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
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
                        <th>
                            <button
                                onClick={this.createCourse}
                                className="btn btn-primary">Add
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