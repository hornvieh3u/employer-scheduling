import React, { createContext, useMemo, useContext } from 'react'
import Axios from 'axios'
const AxiosContext = createContext()

export function AxiosProvider({ children }) {
    const devBaseUrl = process.env.REACT_APP_API
    const productionBaseUrl = process.env.REACT_APP_API

    const axios = useMemo(() => {
        const axios = Axios.create({
            headers: {
                'Content-Type': 'application/json'
            }
        })

        axios.interceptors.request.use((config) => {
            // Read token for anywhere, in this case directly from localStorage
            if (String(window.location.href).indexOf('localhost') > -1) {
                config.baseURL = devBaseUrl
            } else {
                config.baseURL = productionBaseUrl
            }
            const token = localStorage.getItem('accessToken')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        })

        return axios
    }, [])

    return (
        <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>
    )
}

export function useAxios() {
    return useContext(AxiosContext)
}

export function useBaseUrl() {
    var url = devBaseUrl
    return {
        url
    }
}

export function customInterIceptors() {
    const API = Axios.create({ baseURL: process.env.REACT_APP_API })

    // console.log("baseURL", API)

    API.interceptors.request.use((req) => {
        // console.log("3. Axios Provider received Position data", req)

        if (localStorage.getItem('accessToken')) {
            const token = String(localStorage.getItem('accessToken'))
                .split('"')
                .join('')
            req.headers.Authorization = `Bearer ${token}`
            // req.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg0OTU3YmIzZGFkNjgwODM4Zjk5Y2EiLCJpYXQiOjE2NTI4NTYxODgsImV4cCI6MTY1Mjk0MjU4OH0.lc5tsb4WlQ7BHkBeqZxsSCz_lTiTAj5FZJZNlkzDvfs`
        }

        return req
    })
    return API
}
