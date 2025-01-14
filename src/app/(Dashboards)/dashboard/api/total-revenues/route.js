import { connectDB } from "@/lib/connectDB"

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
        return Response.json({
            totalRevenues: revenues
        })
    } catch (error) {
        console.log(error)
    }
}