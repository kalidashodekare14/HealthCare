import { connectDB } from "@/lib/connectDB"

export const GET = async (request) => {
    try {
        const db = await connectDB()
        const appoinmentCollection = db.collection("appoinments")
        const result = await appoinmentCollection.find().toArray()
        return Response.json(result)
    } catch (error) {
        console.log(error)
    }
}