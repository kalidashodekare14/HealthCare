import { connectDB } from "@/lib/connectDB"

export const GET = async (request) => {
    try {
        const db = await connectDB()
        const doctorsCollection = db.collection('doctors')
        const doctors = await doctorsCollection.find({}, { projection: { name: 1, _id: 0 } }).toArray()
        const deparmentsName = await doctorsCollection.find({}, { projection: { department: 1, _id: 0 } }).toArray()
        const doctosName = doctors.map(doctor => doctor.name)
        const deparmentName = deparmentsName.map(dn => dn.department)

        return Response.json({ doctorsName: doctosName, deparmentNames: deparmentName })

    } catch (error) {
        console.log(error)
    }
}