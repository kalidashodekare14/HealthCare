import { connectDB } from "@/lib/connectDB"
import { ObjectId } from "mongodb"

export const GET = async (reqest) => {
    const url = new URL(reqest.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const id = searchParams.get("id")
    try {
        const db = await connectDB()
        const doctorsCollection = db.collection('doctors')
        const matched = { _id: new ObjectId(id) }
        const result = await doctorsCollection.findOne(matched)
        return Response.json(result)
    } catch (error) {
        console.log(error)
    }
}