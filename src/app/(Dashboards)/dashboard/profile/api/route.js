import { connectDB } from "@/lib/connectDB"

export const GET = async (request) => {
    try {
        const db = await connectDB()
        const userCollection = db.collection('users')
        const query = { role: 'admin' }
        const result = await userCollection.findOne(query)
        return Response.json(result)
    } catch (error) {
        console.log(error)
    }
}