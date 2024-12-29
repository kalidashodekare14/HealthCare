import ProfilePage from '@/components/ProfilePage/ProfilePage'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'

const profilePage = async () => {

  const session = await getServerSession(authOptions)
  console.log("server email", session)

  const res = await axios.get(`http://localhost:3000/profile/api?email=${session?.user?.email}`)
  // console.log(res.data)

  return (
    <div>
      <ProfilePage user={res.data} />
    </div>
  )
}

export default profilePage