import { connectDB } from "@/lib/connectDB"

export const GET = async (request) => {
    try {
        const db = await connectDB()
        const patientCollections = db.collection('users')
        const result = await patientCollections.find().toArray()
        return Response.json(result)
    } catch (error) {
        console.log(error)
    }
}