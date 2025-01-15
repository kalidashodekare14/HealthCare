import { NextResponse } from "next/server"

export const POST = async (request) => {
    return NextResponse.redirect(`${process.env.NEXT_BASE_URL}/payment-fail`)
}