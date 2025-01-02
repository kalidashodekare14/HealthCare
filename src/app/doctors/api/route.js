import { connectDB } from "@/lib/connectDB"

export const GET = async (request) => {
    try {
        const db = await connectDB()
        const userCollection = db.collection('doctors')
        const result = await userCollection.find().toArray()
        return Response.json(result)
    } catch (error) {
        console.log(error)
    }
}