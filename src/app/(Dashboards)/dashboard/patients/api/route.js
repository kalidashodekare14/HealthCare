import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        const db = await connectDB()
        const patientCollections = db.collection('users')
        const result = await patientCollections.find().toArray()
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }
}