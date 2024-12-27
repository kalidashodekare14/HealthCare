import { connectDB } from "@/lib/connectDB"

export const GET = async (request) => {
    // TODO:
    // const url = new URL(request.url)
    // const email = url.searchParams.get('email')
    try {
        const db = await connectDB()
        const usersCollection = db.collection("users")
        const userData = await usersCollection.findOne({ email: email })
        return Response.json({userData})
    } catch (error) {
        console.log(error)
    }
}