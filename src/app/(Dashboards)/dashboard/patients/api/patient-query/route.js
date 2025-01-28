import { connectDB } from "@/lib/connectDB"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const id = searchParams.get('id')
    try {
        const db = await connectDB()
        const usersCollection = db.collection('users')
        const query = { _id: new ObjectId(id), role: 'patient', status: "approved" }
        const result = await usersCollection.findOne(query)
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }

}