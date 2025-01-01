"use client"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'

const UserData = () => {
    const session = useSession()
    const sessionEmail = session?.data?.user?.email
    console.log(sessionEmail)
    const { data: user_bio = [], refetch, isLoading: userLoading } = useQuery({
        queryKey: ["user_bio", sessionEmail],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/profile/api?email=${sessionEmail}`)
            console.log(res.data)
            return res.data
        }
    })
    return [user_bio, refetch, userLoading]
}

export default UserData