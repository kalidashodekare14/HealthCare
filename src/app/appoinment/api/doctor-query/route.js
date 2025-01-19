import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const doctorName = searchParams.get('name')
    try {
        const db = await connectDB()
        const doctorsCollection = db.collection('doctors')
        const query = { name: doctorName }
        const result = await doctorsCollection.findOne(query)
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }
}