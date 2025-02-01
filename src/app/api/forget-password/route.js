import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"
let jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

export const POST = async (request) => {
    const { searchParams } = new URL(request.url)

    const email = searchParams.get('email')
    console.log('check mail', email)
    try {
        const db = await connectDB()
        const usersCollection = db.collection('users')
        const query = { email: email }
        const emailMatched = await usersCollection.findOne(query)
        if (!emailMatched) {
            return NextResponse.json({ message: 'Could not find user' }, {status: 404})
        }

        const token = jwt.sign({ id: emailMatched._id }, process.env.NEXT_JWT_SECRET, { expiresIn: '1h' })
        // reset token database set
        await usersCollection.updateOne(
            { _id: emailMatched._id },
            { $set: { resetToken: token } }
        )

        console.log('check token', token)
        const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

        const transporter = nodemailer.createTransport({
            service: process.env.NEXT_EMAIL,
            // port: 587,
            // secure: false,
            auth: {
                user: process.env.NEXT_EMAIL,
                pass: process.env.NEXT_PASS
            }
        })

        const sendMail = await transporter.sendMail({
            from: process.env.NEXT_EMAIL,
            to: email,
            subject: 'Password Reset',
            html: `
            <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 10px; max-width: 500px; margin: auto; padding: 20px;">
               <h2 style="color: #307bc4; text-align: center; ">Forget Password</h2>
               <p>Hi!</p>
               <p>We received a request to reset your password. Click the button below to proceed.</p>
               <div style="text-align: center;">
               <a style="background-color: #307bc4; color: white; padding: 12px 20px; text-decoration: none;" href="${resetLink}">
                  Reset Password
               </a>
               </div>
               <p>If you didn't request this, you can safely ignore this email.</p>
               <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p style="font-size: 13px; text-align: center; color: #666;">If you have any issues, contact our HealthCare support team.</p>
           </div>
            `
        })

        return NextResponse.json({ message: 'Reset link send your email', status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'Server Error' }, { status: 500 })
    }
}