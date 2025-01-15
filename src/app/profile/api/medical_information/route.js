import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const PATCH = async (request) => {
    const medicalInfo = await request.json()
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const email = searchParams.get("email")
    try {
        const db = await connectDB()
        const userCollection = db.collection("users")
        const filter = { email: email }
        const option = { upsert: true }
        const updateDoc = {
            $set: {
                ...medicalInfo
            }
        }
        const result = await userCollection.updateOne(filter, updateDoc, option)
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }
}