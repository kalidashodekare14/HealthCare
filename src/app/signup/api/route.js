import { connectDB } from "@/lib/connectDB"
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

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
        const patientId = new ObjectId().toString().slice(0, 6)
        const res = await userCollection.insertOne({ ...newUser, password: hashPassword, patiend_id: patientId, createdAt: new Date() })
        return NextResponse.json({ message: "New User Registration Success" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }
}