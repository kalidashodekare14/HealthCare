import { connectDB } from "@/lib/connectDB"
import axios from "axios"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export const POST = async (request) => {
    const appoinmentInfo = await request.json()

    try {
        const db = await connectDB()
        const appoinmentCollection = db.collection('appoinments')
        const tnxId = new ObjectId().toString().slice(0, 6)
        const initateData = {
            store_id: "progr67836033519d2",
            store_passwd: "progr67836033519d2@ssl",
            total_amount: "500",
            currency: "BDT",
            tran_id: tnxId,
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/appoinment/success-payment`,
            fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/appoinment/payment-fail`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/appoinment/payment-cancel`,
            cus_name: appoinmentInfo?.fullName || "None",
            cus_email: appoinmentInfo?.email || "None",
            cus_add1: appoinmentInfo?.address || "None",
            cus_add2: "Dhaka",
            cus_city: appoinmentInfo.address || "None",
            cus_state: "Dhaka",
            cus_postcode: "5100",
            cus_country: "Bangladesh" || "None",
            cus_phone: appoinmentInfo?.contact_number || "None",
            cus_fax: "01711111111",
            shipping_method: "NO",
            product_name: appoinmentInfo?.doctorInfo?.doctor_name,
            product_category: appoinmentInfo?.doctorInfo?.department,
            product_profile: "general",
            multi_card_name: "mastercard,visacard,amexcard",
            value_a: "ref001_A&",
            value_b: "ref002_B&",
            value_c: "ref003_C&",
            value_d: "ref004_D",
        };
        const response = await axios({
            method: "POST",
            url: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
            data: initateData,
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        })
        console.log(response)
        const saveInfo = {
            ...appoinmentInfo,
            transaction_id: tnxId,
            status: 'Pending',
            createdAt: new Date()
        }

        const save = await appoinmentCollection.insertOne(saveInfo)
        if (save) {
            return NextResponse.json({
                paymentUrl: response.data.GatewayPageURL
            })
        }

    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error })
    }
}