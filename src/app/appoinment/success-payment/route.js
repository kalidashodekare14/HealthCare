import { connectDB } from "@/lib/connectDB"

export const POST = async (request) => {
    const formateData = await request.text()
    try {
        const db = await connectDB()
        const appoinmentCollection = db.collection('appoinments')
        const successPaymentInfo = Object.fromEntries(new URLSearchParams(formateData))
        console.log(successPaymentInfo)
        if (successPaymentInfo.status !== 'VALID') {
            throw new Error("Unauthorized payment, Invalid Payment")
        }
        const query = {
            transaction_id: successPaymentInfo.tran_id
        }
        const update = {
            $set: {
                status: "Success",
                amount: successPaymentInfo.amount,
                transaction_date: successPaymentInfo.tran_date
            }
        }
        const result = await appoinmentCollection.updateOne(query, update)
        console.log(result)
        return Response.redirect(`${process.env.NEXT_PUBLIC_SERVER}/payment-success`)
    } catch (error) {
        console.log(error)
    }

}