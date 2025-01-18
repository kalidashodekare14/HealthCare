import { connectDB } from "@/lib/connectDB"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export const PATCH = async (request) => {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const id = searchParams.get('id')
    try {
        const db = await connectDB()
        const userCollection = db.collection('users')
        const query = { _id: new ObjectId(id) }
        const option = { upsert: true }
        const updateDoc = {
            $set: {
                status: 'reject'
            }
        }
        const result = await userCollection.updateOne(query, updateDoc, option)
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }
}