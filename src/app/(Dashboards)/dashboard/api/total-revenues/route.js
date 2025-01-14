import { connectDB } from "@/lib/connectDB"

export const GET = async (request) => {
    try {
        const db = await connectDB()
        const appoinmentCollection = db.collection("appoinments")
        // total patient monthly data
        const revenues = await appoinmentCollection.aggregate([
            {
                $group: {
                    _id: { month: { $month: '$createdAt' } },
                    totalPatient: { $sum: "$amount" }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray()

        // data return
        return Response.json({
            totalRevenue: revenues
        })
    } catch (error) {
        console.log(error)
    }
}