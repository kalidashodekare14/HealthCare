"use client"
import DashboardHeader from '@/components/Dashboards/DashboardHeader/DashboardHeader'
import DashboardNavigation from '@/components/Dashboards/DashboardNavigation'
import React, { useState } from 'react'

const LayoutPage = ({ children }) => {

    const [isToggle, setIstoggle] = useState(false)

    const handleToggle = () => {
        setIstoggle(!isToggle)
    }

    return (
        <div className='flex'>
            <DashboardNavigation isToggle={isToggle} />
            <div className='w-full'>
                <DashboardHeader isToggle={isToggle} handleToggle={handleToggle} />
                {children}
            </div>
        </div>
    )
}

export default LayoutPage