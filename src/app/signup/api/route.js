import { connectDB } from "@/lib/connectDB"

export const POST = async (request) => {
    const newUser = await request.json()
    try {
        const db = await connectDB()
        const userCollection = db.collection("users")
        const exits = await userCollection.findOne({ email: newUser.email })
        if (exits) {
            return Response.json({ message: "New User Exists" }, { status: 304 })
        }
        const res = await userCollection.insertOne(newUser)
        return Response.json({ message: "New User Registration Success" }, { status: 200 })
    } catch (error) {
        console.log({ message: "something is rong", error }, { status: 500 })
    }
}