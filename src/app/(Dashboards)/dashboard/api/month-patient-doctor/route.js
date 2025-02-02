import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        const db = await connectDB()
        const usersColleciton = db.collection("users")
        const appoinmentColleciton = db.collection("appoinments")
        const doctorsColleciton = db.collection("doctors")
        // total patient monthly data
        const monthlyPatient = await usersColleciton.aggregate([
            {
                $match: {
                    role: 'patient',
                    status: 'approved'
                }
            },
            {
                $group: {
                    _id: { month: { $month: '$createdAt' } },
                    totalPatient: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray()
        const monthlyDoctor = await usersColleciton.aggregate([
            {
                $match: {
                    role: 'doctor',
                    status: 'approved'
                }
            },
            {
                $group: {
                    _id: { month: { $month: '$createdAt' } },
                    totalDoctor: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray()
        const monthlyAppoinment = await appoinmentColleciton.aggregate([
            {
                $match: {
                    status: 'Success'
                }
            },
            {
                $group: {
                    _id: { month: { $month: '$createdAt' } },
                    totalAppoinment: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray()

        // data return
        return NextResponse.json({
            totalPatients: monthlyPatient,
            totalDoctors: monthlyDoctor,
            totalAppoinments: monthlyAppoinment
        })
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }
}