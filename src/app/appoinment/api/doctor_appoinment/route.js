import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        const db = await connectDB()
        const usersCollection = db.collection('users')
        const query = { role: 'doctor', status: 'approved' }
        const doctors = await usersCollection.find(query, { projection: { name: 1, _id: 0 } }).toArray()
        const doctosName = doctors.map(doctor => doctor.name)

        return Response.json({ doctorsName: doctosName })

    } catch (error) {
        console.log(error)
    }
}


export const POST = async (request) => {
    const appoinmentDatas = await request.json()
    try {
        const db = await connectDB()
        const doctorsCollection = db.collection('appoinments')
        const appoinmentInfo = {
            ...appoinmentDatas,
            status: "Pending",
            createdAt: new Date()
        }
        const result = await doctorsCollection.insertOne(appoinmentInfo)
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }
}