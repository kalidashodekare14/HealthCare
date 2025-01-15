import { connectDB } from "@/lib/connectDB"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export const GET = async (reqest) => {
    const url = new URL(reqest.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const id = searchParams.get("id")
    try {
        const db = await connectDB()
        const doctorsCollection = db.collection('doctors')
        const matched = { _id: new ObjectId(id) }
        const result = await doctorsCollection.findOne(matched)
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }
}