import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const POST = async (request) => {
    const formateData = await request.text()
    console.log('check url', formateData)

    try {
        const db = await connectDB()
        const appoinmentCollection = db.collection('appoinments')
        const successPaymentInfo = Object.fromEntries(new URLSearchParams(formateData))
        console.log('url check', successPaymentInfo)
        if (successPaymentInfo.status !== 'VALID') {
            throw new Error("Unauthorized payment, Invalid Payment")
        }

        const query = {
            transaction_id: successPaymentInfo.tran_id
        }
        const update = {
            $set: {
                status: "success",
                amount: successPaymentInfo.amount,
                transaction_date: successPaymentInfo.tran_date
            }
        }
        const result = await appoinmentCollection.updateOne(query, update)
        console.log(result)
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/appoinment-payment-success`, 303)
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }

}