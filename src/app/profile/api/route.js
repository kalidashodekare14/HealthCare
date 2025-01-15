import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const email = searchParams.get('email')

    try {
        const db = await connectDB()
        const userCollection = db.collection('users')
        const check = await userCollection.findOne({ email: email })
        return NextResponse.json(check)
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }

}