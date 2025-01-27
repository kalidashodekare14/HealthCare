import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const DELETE = async (request) => {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const id = searchParams.get('id')
    try {
        const db = await connectDB()
        const appoinmentCollection = db.collection('users')
        const query = { _id: new ObjectId(id) }
        const result = await appoinmentCollection.deleteOne(query)
        return NextResponse(result)
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }
}