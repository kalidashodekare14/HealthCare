import { connectDB } from "@/lib/connectDB"

export const GET = async (request) => {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const doctorName = searchParams.get('name')
    try {
        const db = await connectDB()
        const doctorsCollection = db.collection('doctors')
        const query = { name: doctorName }
        const result = await doctorsCollection.findOne(query)
        return Response.json(result)
    } catch (error) {
        console.log(error.message)
    }
}