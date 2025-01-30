import { connectDB } from "@/lib/connectDB"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const email = searchParams.get('email')
    try {
        const db = await connectDB()
        const appoinemntCollection = db.collection('appoinments')
        const query = {
            "doctorInfo.doctor_email": email
        }
        const result = await appoinemntCollection.find(query).toArray()
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }

}