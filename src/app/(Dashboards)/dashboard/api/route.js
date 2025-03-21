import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        const db = await connectDB()
        const usersCollection = db.collection('users')
        const appoinmentCollection = db.collection('appoinments')
        const totalPatients = await usersCollection.aggregate([
            {
                $match: {
                    role: 'patient',
                    status: 'approved'
                }
            },
            {
                $group: {
                    _id: null,
                    totalPatient: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray()
        const totalDoctors = await usersCollection.aggregate([
            {
                $match: {
                    role: 'doctor',
                    status: 'approved'
                }
            },
            {
                $group: {
                    _id: null,
                    totalDoctors: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray()
        const totalAppoinments = await appoinmentCollection.aggregate([
            {
                $match: {
                    status: 'Success'
                }
            },
            {
                $group: {
                    _id: null,
                    totalAppoinments: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray()
        const totalRevenues = await appoinmentCollection.aggregate([
            {
                $addFields: {
                    amountAsNumber: { $toDouble: "$amount" }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenues: { $sum: "$amountAsNumber" }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray()

        return NextResponse.json({
            totalPatients: totalPatients,
            totalDoctors: totalDoctors,
            totalAppoinments: totalAppoinments,
            totalRevenues: totalRevenues
        },)
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }
}