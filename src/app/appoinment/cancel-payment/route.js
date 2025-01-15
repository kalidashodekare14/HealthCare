import { NextResponse } from "next/server"

export const POST = async (request) => {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER}/payment-cancel`)
}