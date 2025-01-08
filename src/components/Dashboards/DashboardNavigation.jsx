"use client"
import Link from 'next/link'
import React from 'react'
import logo from '../../../public/logo.png'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const DashboardNavigation = ({ isToggle }) => {

  const pathname = usePathname()

  const dashboardLinks = [
    {
      id: "1",
      name: "Dashboard",
      path: "/dashboard"
    },
    {
      id: "2",
      name: "Doctors",
      path: "/dashboard/doctors"
    },
    {
      id: "3",
      name: "Patients",
      path: "/dashboard/patients"
    },
    {
      id: "4",
      name: "Appoinments",
      path: "/dashboard/appoinments"
    },
    {
      id: "5",
      name: "Reviews",
      path: "/dashboard/reviews"
    },
  ]

  return (
    <div className='relative'>
      <div className={`${isToggle ? "translate-y-20 translate-x-0 duration-300" : "-translate-x-full translate-y-20 duration-300"} z-50 absolute lg:static lg:translate-y-0 lg:translate-x-0  left-0  bg-white w-52 border h-screen`}>
        <div className='flex flex-col gap-5 text-[18px] pr-3 font-rubik'>
          <div className='hidden lg:flex py-5 px-3'>
            <Image
              src={logo}
              width={500}
              height={300}
              alt='logo'
            />
          </div>
          {
            dashboardLinks.map(navi => (
              <Link key={navi.id} href={navi.path} className={`${pathname == navi.path ? "bg-[#307bc4] text-white rounded-br-full rounded-tr-xl p-2" : "hover:bg-[#307bc4] hover:rounded-br-full hover:rounded-tr-xl hover:text-white p-2"}`} >
                <p>{navi.name}</p>
              </Link>
            ))
          }
          <div className="divider">OR</div>
          <Link href={'/'} className={`hover:bg-[#307bc4] hover:rounded-br-full hover:rounded-tr-xl hover:text-white p-2`}>
            <p>Home</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardNavigation