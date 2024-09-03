// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** API import
import { customInterIceptors } from '../../../../lib/AxiosProvider'
import { getUserData } from '../../../../utility/Utils'

const API = customInterIceptors()

export const getMails = createAsyncThunk(
    'appEmail/getMails',
    async (params) => {
        const response = await axios.get('/apps/email/emails', { params })
        return {
            params,
            data: response.data
        }
    }
)

export const getTickets = createAsyncThunk('appTicket/getTicket', async () => {
    const response = await API.get(`ticket/all/${getUserData().id}`)
    return response.data
})

export const createTicket = createAsyncThunk(
    'appTicket/createTicket',
    async (ticketInfo, { dispatch }) => {
        const response = await API.post('ticket/new', ticketInfo)
        await dispatch(getTickets())
        return response.data
    }
)

export const updateMails = createAsyncThunk(
    'appEmail/updateMails',
    async ({ emailIds, dataToUpdate }, { dispatch, getState }) => {
        const response = await axios.post('/apps/email/update-emails', {
            emailIds,
            dataToUpdate
        })
        await dispatch(getMails(getState().email.params))
        return {
            emailIds,
            dataToUpdate,
            data: response.data
        }
    }
)

export const updateTickets = createAsyncThunk(
    'appTicket/updateTickets',
    async ({ ticketIds, dataToUpdate }, { dispatch, getState }) => {
      const response = await API.post('ticket/bulk-update', {
        ticketIds,
        dataToUpdate
      })
      await dispatch(getTickets(getUserData().id))
      return {
        ticketIds,
        dataToUpdate,
        data: response.data
      }
    }
)

export const deleteTickets = createAsyncThunk('appTicket/delete', async( {ticketIds}, {dispatch, getState} ) => {
    const response = await API.delete('ticket/bulk-delete', {
        ticketIds
    })
    await dispatch(getTickets(getUserData().id))
    return {
        ticketIds,
        data: response.data
    }
})

export const updateMailLabel = createAsyncThunk(
    'appEmail/updateMailLabel',
    async ({ emailIds, label }, { dispatch, getState }) => {
        const response = await axios.post('/apps/email/update-emails-label', {
            emailIds,
            label
        })
        await dispatch(getMails(getState().email.params))
        return response.data
    }
)

export const paginateMail = createAsyncThunk(
    'appEmail/paginateMail',
    async ({ dir, emailId }) => {
        const response = await axios.get('/apps/email/paginate-email', {
            params: { dir, emailId }
        })
        return response.data
    }
)

export const selectCurrentMail = createAsyncThunk(
    'appEmail/selectCurrentMail',
    async (id) => {
        const response = await axios.get('/apps/email/get-email', { id })
        return response.data
    }
)

export const addNewMessage = createAsyncThunk(
    'appTicket/addNewMessage',
    async (messageInfo, { dispatch }) => {
        const response = await API.post('ticket/message', {
            ticketId: messageInfo.ticketId,
            status: messageInfo.status,
            message: messageInfo.message,
            sender: 'agent_msg'
        })

        await dispatch(getTickets())
        dispatch(setCurentTicket(response.data))

        return response.data
    }
)

export const appEmailSlice = createSlice({
    name: 'appEmail',
    initialState: {
        mails: [],
        params: {},
        emailsMeta: {},
        selectedMails: [],
        selectedTickets: [],
        tickets: [],
        currentMail: null,
        currentTicket: null,
        ticketsMeta: {}
    },
    reducers: {
        selectMail: (state, action) => {
            const selectedMails = state.selectedMails
            if (!selectedMails.includes(action.payload)) {
                selectedMails.push(action.payload)
            } else {
                selectedMails.splice(selectedMails.indexOf(action.payload), 1)
            }
            state.selectedMails = selectedMails
        },
        selectTicket: (state, action) => {
            const selectedTickets = [...state.selectedTickets]
            if (!selectedTickets.includes(action.payload)) {
                selectedTickets.push(action.payload)
            } else {
                selectedTickets.splice(
                    selectedTickets.indexOf(action.payload),
                    1
                )
            }
            state.selectedTickets = selectedTickets
        },
        selectAllMail: (state, action) => {
            const selectAllMailsArr = []
            if (action.payload) {
                selectAllMailsArr.length = 0
                state.mails.forEach((mail) => selectAllMailsArr.push(mail.id))
            } else {
                selectAllMailsArr.length = 0
            }
            state.selectedMails = selectAllMailsArr
        },
        selectAllTickets: (state, action) => {
            const selectAllTicketsArr = []
            if (action.payload.checked) {
                selectAllTicketsArr.length = 0
                state.tickets.filter((ticket) => ticket.status.toLowerCase() === action.payload.status).forEach((ticket) =>
                    selectAllTicketsArr.push(ticket._id)
                )
            } else {
                selectAllTicketsArr.length = 0
            }
            state.selectedTickets = selectAllTicketsArr
        },
        resetSelectedMail: (state) => {
            state.selectedMails = []
        },
        selectCurrentTicket: (state, action) => {
            state.currentTicket = state.tickets.filter(
                (ticket) => ticket._id === action.payload
            )[0]
        },
        resetSelectedTickets: (state) => {
            state.selectedTickets = []
        },
        setCurentTicket: (state, action) => {
            state.currentTicket = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMails.fulfilled, (state, action) => {
                let currMail = null
                if (
                    state.currentMail !== null &&
                    state.currentMail !== undefined
                ) {
                    currMail = action.payload.data.emails.find(
                        (i) => i.id === state.currentMail.id
                    )
                }
                state.currentMail = currMail
                state.params = action.payload.params
                state.mails = action.payload.data.emails
                state.emailsMeta = action.payload.data.emailsMeta
            })
            .addCase(updateMails.fulfilled, (state, action) => {
                function updateMailData(email) {
                    Object.assign(email, action.payload.dataToUpdate)
                }
                state.mails.forEach((email) => {
                    if (action.payload.emailIds.includes(email.id)) {
                        updateMailData(email)
                    }
                })
            })
            .addCase(paginateMail.fulfilled, (state, action) => {
                const data = action.payload
                const dataIndex = state.mails.findIndex((i) => i.id === data.id)
                dataIndex === 0
                    ? (data.hasPreviousMail = false)
                    : (data.hasPreviousMail = true)
                dataIndex === state.mails.length - 1
                    ? (data.hasNextMail = false)
                    : (data.hasNextMail = true)
                state.currentMail = data
            })
            .addCase(selectCurrentMail.fulfilled, (state, action) => {
                state.currentMail = action.payload
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                let curTicket = null
                if (
                    state.currentTicket !== null &&
                    state.currentTicket !== undefined
                ) {
                    state.currentTicket = action.payload.tickets.find(
                        (i) => (i._id = state.currentTicket._id)
                    )[0]
                }

                state.currentTicket = curTicket
                state.tickets = action.payload.tickets
                state.ticketsMeta = action.payload.ticketsMeta
            })
            .addCase(updateTickets.fulfilled, (state, action) => {
                state.selectedTickets = []
            })
    }
})

export const {
    selectMail,
    selectAllMail,
    resetSelectedMail,
    selectCurrentTicket,
    setCurentTicket,
    selectAllTickets,
    selectTicket,
    resetSelectedTickets
} = appEmailSlice.actions

export default appEmailSlice.reducer
