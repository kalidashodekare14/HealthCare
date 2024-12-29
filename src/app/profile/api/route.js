import { connectDB } from "@/lib/connectDB";

export const GET = async (request) => {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const email = searchParams.get('email')

    try {
        const db = await connectDB()
        const userCollection =  db.collection('users')
        const check = await userCollection.findOne({ email: email })
        return Response.json(check)
    } catch (error) {
        console.log(error)
    }

}