import DashboardNavigation from '@/components/Dashboards/DashboardNavigation'
import React from 'react'

const LayoutPage = ({ children }) => {
    return (
        <div className='flex'>
            <DashboardNavigation />
            <div className='w-full'>
                {children}
            </div>
        </div>
    )
}

export default LayoutPage