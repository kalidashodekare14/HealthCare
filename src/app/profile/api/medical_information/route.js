import { connectDB } from "@/lib/connectDB"

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
        return Response.json(result)
    } catch (error) {
        console.log(error)
    }
}