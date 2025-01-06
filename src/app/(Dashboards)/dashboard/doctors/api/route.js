import { connectDB } from "@/lib/connectDB"

export const GET = async (request) => {
    try {
        const db = await connectDB()
        const doctorsCollection = db.collection('doctors')
        const result = await doctorsCollection.find().toArray()
        return Response.json(result)
    } catch (error) {
        console.log(error)
    }
}