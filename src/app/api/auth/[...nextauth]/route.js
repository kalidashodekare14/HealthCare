import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from "bcrypt";

export const authOptions = {
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60

    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const { email, password } = credentials
                if (!email || !password) {
                    return null;
                }
                const db = await connectDB()
                const currentUsers = await db.collection("users").findOne({ email })
                console.log(currentUsers)
                if (!currentUsers) {
                    return null;
                }
                const passwordMatch = bcrypt.compareSync(password, currentUsers.password);
                if (!passwordMatch) {
                    return null
                }
                return currentUsers
            }
        })
    ],
    callbacks: {},
    pages: {
        signIn: '/signin'
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }