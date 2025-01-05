import AppoinmentForDoctor from '@/components/AppoinmentForDoctor/AppoinmentForDoctor'
import React from 'react'

const DoctorAppoinment = async ({ params }) => {
    const { id } = await params
    return (
        <div>
            <AppoinmentForDoctor doctorId={id} />
        </div>
    )
}

export default DoctorAppoinment