import axios from 'axios'
import React from 'react'

const axiosServerUrl = axios.create({
    baseURL: "http://localhost:3000"
})

const UseAxios = () => {
    return axiosServerUrl
}

export default UseAxios