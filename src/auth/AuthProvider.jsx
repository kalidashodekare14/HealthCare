"use client"
import React from 'react'
import dynamic from 'next/dynamic';
import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({ children }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
export default dynamic(() => Promise.resolve(AuthProvider), { ssr: false })