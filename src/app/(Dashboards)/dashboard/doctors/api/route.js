import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        const db = await connectDB()
        const doctorsCollection = db.collection('users')
        const query = { role: 'doctor', status: 'approved' }
        const result = await doctorsCollection.find(query).toArray()
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }
}