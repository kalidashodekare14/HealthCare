import { connectDB } from "@/lib/connectDB"
let jwt = require('jsonwebtoken');
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { token, password } = await req.json()
    try {
        const db = await connectDB()
        const userCollection = db.collection('users')
        const decoded = jwt.verify(token, process.env.NEXT_JWT_SECRET)
        const user = await userCollection.findOne(
            { _id: new ObjectId(decoded) }
        )
        if (!user) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 400 })
        }
        const hashedPassword = await bcrypt.hash(password, 14)
        const result = await userCollection.updateOne(
            { _id: new ObjectId(decoded) },
            { $set: { password: hashedPassword, resetToken: null } }
        )

        return NextResponse.json({ message: 'Password reset successful', status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Server Error' }, { status: 500 })
    }
}