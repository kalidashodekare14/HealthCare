import { connectDB } from "@/lib/connectDB"

export const PATCH = async (request) => {
    const updateImae = await request.json()
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const email = searchParams.get("email")
    // console.log("email check", email)
    // console.log("body check", updateImae)
    try {
        const db = await connectDB()
        const userCollection = db.collection('users')
        const filer = { email: email }
        const option = { upsert: true }
        const updateDoc = {
            $set: {
                image: updateImae.image
            }
        }
        const result = await userCollection.updateOne(filer, updateDoc, option)
        return Response.json(result)
    } catch (error) {
        console.log(error)
    }
}