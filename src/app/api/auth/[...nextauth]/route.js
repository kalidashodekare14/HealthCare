import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from "bcrypt";
const handler = NextAuth({
    session: {
        secret: process.env.NEXT_SECRET,
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
})

export { handler as GET, handler as POST }