import { NextResponse } from "next/server"

export const POST = async (request) => {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`,  303)
}