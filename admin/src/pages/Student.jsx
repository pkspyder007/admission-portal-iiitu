import React from 'react'
import StudentInfo from '../components/StudentInfo'

const Student = ({match}) => {
    return (
        <div>
            <StudentInfo id={match.params.id} />
        </div>
    )
}

export default Student
