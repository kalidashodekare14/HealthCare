import ProfilePage from '@/components/ProfilePage/ProfilePage'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'

const profilePage = async () => {

  return (
    <div>
      <ProfilePage   />
    </div>
  )
}

export default profilePage