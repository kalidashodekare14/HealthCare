"use client"
import React from 'react'
import dynamic from 'next/dynamic';

const AuthProvider = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}
export default dynamic(() => Promise.resolve(AuthProvider), { ssr: false })