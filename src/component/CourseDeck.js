import React from 'react'
import CourseCard from './CourseCard'

export default class CourseDeck extends React.Component {
    render() {
        return (
            <div className="card-deck">
                <CourseCard/>
                <CourseCard/>
                <CourseCard/>
                <CourseCard/>
                <CourseCard/>
            </div>
        )
    }
}