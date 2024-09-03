// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { customInterIceptors } from '../../../../lib/AxiosProvider'
import axios from 'axios'
import { getUserData } from '../../../../auth/utils'
import { getEvents } from '../../event/store'

const API = customInterIceptors()

export const createBooking = createAsyncThunk(
    'calendar/createBooking',
    async (bookingData, { dispatch }) => {
        const response = await API.post(`calendar/booking/create`, bookingData)
        window.location.href = '/book'
        //return response.data
    }
)

export const getData = createAsyncThunk('calendar/getBooking', async (params) => {
    const response = await API.get(`/calendar/booking/get`, {params})
    return {
        params,
        data: response.data.data,
        // data: response.data.books,
        allData: response.data.allData,
        totalPages: response.data.total
    }
})

export const deleteBook = createAsyncThunk('calendar/deleteBooking', async (id, { dispatch, getState }) => {
    const response = await API.delete('/calendar/calendar/delete', { id })
    if(response.status === 200) {
        await dispatch(getData(getState().book.params))
        return true
    }
    return false
})
export const createBookingType = createAsyncThunk(
    'calendar/createBookingType',
    async (bookingTypeData, { dispatch }) => {
        const response = await API.post(`calendar/booking-type/create`, bookingTypeData)
        await dispatch(getBookingType())
        return response.data
    }
)

export const getBookingType = createAsyncThunk('calendar/getBookingType', async () => {
    const response = await API.get(`calendar/booking-type/get`)

    return response.data
})

export const getBookingTypeDetail = createAsyncThunk('calendar/getBookingTypeDetail', async (link) => {
    const response = await API.get(`calendar/booking-type/info/${link}`)

    return response.data
})

export const updateBookingType = createAsyncThunk('calendar/updateBookingType', async ({id, data}, { dispatch, getState }) => {
    await API.put(`calendar/booking-type/update/${id}`, data)
    await dispatch(getBookingType())
    return id
})

export const deleteBookingType = createAsyncThunk('appCalendar/updateEvent', async (id, { dispatch, getState }) => {
    await API.delete(`calendar/booking-type/delete/${id}`)
    await dispatch(getBookingType())
    return id
})

export const cloneBookingType = createAsyncThunk('appCalendar/updateEvent', async (id, { dispatch, getState }) => {
    await API.post(`calendar/booking-type/clone/${id}`)
    await dispatch(getBookingType())
    return id
})



export const appBookingsSlice = createSlice({
    name: 'appBooking',
    initialState: {
        books: [],
        total: 1,
        params: {},
        allBooks: [],
        bookingTypes: [],
        detailBookingType: {}
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getBookingType.fulfilled, (state, action) => {
                state.bookingTypes = action.payload.data
            })
        builder.addCase(getData.fulfilled, (state, action) => {
            state.books = action.payload.data
            state.allBooks = action.payload.allData
            state.total = action.payload.totalPages
            state.params = action.payload.params
        })
        builder
            .addCase(getBookingTypeDetail.fulfilled, (state, action) => {
                state.detailBookingType = action.payload.data
            })
    }
})

export default appBookingsSlice.reducer
