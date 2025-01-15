import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        const db = await connectDB()
        const appoinmentCollection = db.collection("appoinments")
        // total patient monthly data
        const revenues = await appoinmentCollection.aggregate([
            {
                $addFields: {
                    amountAsNumber: { $toDouble: "$amount" }
                }
            },
            {
                $group: {
                    _id: { month: { $month: '$createdAt' } },
                    totalRevenue: { $sum: "$amountAsNumber" }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray()

        // data return
        return NextResponse.json({
            totalRevenues: revenues
        })
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }
}