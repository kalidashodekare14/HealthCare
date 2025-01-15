import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        const db = await connectDB()
        const appoinmentCollection = db.collection("appoinments")
        const result = await appoinmentCollection.find().toArray()
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }
}