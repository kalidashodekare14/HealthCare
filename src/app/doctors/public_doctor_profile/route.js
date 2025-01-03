import { connectDB } from "@/lib/connectDB"
import { ObjectId } from "mongodb"
// import { ObjectId } from "mongodb"

export const GET = async (request) => {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const id = searchParams.get('id')
    try {
        const db = await connectDB()
        const userCollection = db.collection('doctors')
        const query = { _id: new ObjectId(id) }
        const result = await userCollection.findOne(query)
        return Response.json(result)
    } catch (error) {
        console.log(error)
    }
}