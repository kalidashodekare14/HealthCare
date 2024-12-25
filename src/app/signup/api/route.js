import { connectDB } from "@/lib/connectDB"
import bcrypt from "bcrypt";

export const POST = async (request) => {
    const newUser = await request.json()
    try {
        const db = await connectDB()
        const userCollection = db.collection("users")
        const exits = await userCollection.findOne({ email: newUser.email })
        if (exits) {
            return Response.json({ message: "New User Exists" }, { status: 304 })
        }
        const hashPassword = bcrypt.hashSync(newUser.password, 14);
        const res = await userCollection.insertOne({ ...newUser, password: hashPassword })
        return Response.json({ message: "New User Registration Success" }, { status: 200 })
    } catch (error) {
        console.log({ message: "something is rong", error }, { status: 500 })
    }
}