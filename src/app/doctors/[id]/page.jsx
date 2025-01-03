import PublicDoctorProfile from '@/components/PublicDoctorProfile/PublicDoctorProfile'
import React from 'react'

const page = async ({ params }) => {

    const { id } = await params

    return (
        <div>
            <PublicDoctorProfile profileId={id} />
        </div>
    )
}

export default page