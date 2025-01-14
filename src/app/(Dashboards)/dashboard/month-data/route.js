import { connectDB } from "@/lib/connectDB"

export const GET = async (request) => {
    try {
        const db = await connectDB()
        const usersColleciton = db.collection("users")
        // const patientsColleciton = db.collection("patients")
        const doctorsColleciton = db.collection("doctors")
        // total patient monthly data
        const monthlyPatient = await usersColleciton.aggregate([
            {
                $group: {
                    _id: { month: { $month: '$createdAt' } },
                    totalPatient: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray()

        // data return
        return Response.json({
            totalPatients: monthlyPatient
        })
    } catch (error) {
        console.log(error)
    }
}