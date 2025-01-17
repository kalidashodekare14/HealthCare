import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        const db = await connectDB()
        const userCollection = db.collection('users')
        const query = { role: 'doctor', status: 'pending' }
        const checkData = await userCollection.find(query).toArray()
        if (checkData.length > 0) {
            return NextResponse.json(checkData)
        }
        return NextResponse.json({ message: 'no data' })
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }
}