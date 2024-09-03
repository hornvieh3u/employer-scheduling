import { useMutation, useQuery, useQueryClient } from 'react-query'
import { customInterIceptors } from '../../lib/AxiosProvider'
import { ENDPOINTS } from '../../lib/endpoints'
import { toast } from 'react-toastify'

const API = customInterIceptors()


// fetch All client contacts
async function fetchClientContactsRQ() {
    const { data } = await API.get('/client-contact/total-clients')
    return data
}

export function useGetClientContacts() {
    return useQuery('client-contact', fetchClientContactsRQ)
}

// Create New Position
async function createNewPositionRQ(payload) {
    const { data } = await API.post(ENDPOINTS.ALL_CLIENT_POSITION, payload)
    return data
}

export function useCreateNewPosition() {
    const queryClient = useQueryClient()
    return useMutation(createNewPositionRQ, {
        onSuccess: () => {
            toast.success('Position Created Successfully')
            queryClient.invalidateQueries(ENDPOINTS.ALL_CLIENT_POSITION)
        },
        onError: () => {
            toast.error('Unable to create new position')
        }
    })
}


// fetch client position
async function fetchClientPositionRQ() {
    const { data } = await API.get(ENDPOINTS.ALL_CLIENT_POSITION)
    return data
}

export function useGetClientPosition() {
    return useQuery('client-positions', fetchClientPositionRQ)
}


// delete Client position List
export const deleteClientPositionRQ = (id) => {
    const data = API.delete(ENDPOINTS.ONE_CLIENT_POSITION + id)
    if (data) {
        toast.success('Position Delete Successfully')
    }
    return data
}


// Put Client Position Data
export async function putClientPositionRQ(id, payload) {
    const { data } = await API.put(ENDPOINTS.ONE_CLIENT_POSITION + id, payload)
    if (data) {
        toast.success("Position edited successful")
    }
    return data
}