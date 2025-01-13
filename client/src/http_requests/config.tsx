import React from 'react'
import axios, { AxiosResponse } from 'axios'

const server_url = 'http://localhost:5000/api'

const axios_config = axios.create({
    baseURL: server_url,
    withCredentials: true
})

// const registration_request = axios.post<AxiosResponse>()

axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

axios.interceptors.response.use((config) => {
    return config
}, (error) => {
    return error
})

axios.interceptors.response.use()

export default axios_config