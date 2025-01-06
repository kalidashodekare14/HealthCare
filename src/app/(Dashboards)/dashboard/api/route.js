import { connectDB } from "@/lib/connectDB"

export const GET = async (request) => {
    try {
        const db = await connectDB()
        const usersCollection = db.collection('users')
        const doctorsCollection = db.collection('doctors')
        const totalPatients = await usersCollection.aggregate([
            {
                $group: {
                    _id: null,
                    totalPatient: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray()
        const totalDoctors = await doctorsCollection.aggregate([
            {
                $group: {
                    _id: null,
                    totalDoctors: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray()
        return Response.json({ totalPatients: totalPatients, totalDoctors: totalDoctors },)
    } catch (error) {
        console.log(error)
    }
}