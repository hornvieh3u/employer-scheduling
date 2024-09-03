import { useMutation, useQuery, useQueryClient } from 'react-query'
import { customInterIceptors } from '../../lib/AxiosProvider'
import { ENDPOINTS } from '../../lib/endpoints'
import { toast } from 'react-toastify'

const API = customInterIceptors()

// fetch All Vendor contacts
async function fetchVendorContactsRQ() {
    const { data } = await API.get('/vendor-contact/total-contact')
    return data
}

export function useGetVendorContacts() {
    return useQuery('vendor-contacts', fetchVendorContactsRQ)
}

// fetch vendor position
async function fetchVendorPositionRQ() {
    const { data } = await API.get(ENDPOINTS.VENDOR_CONTACT)
    return data
}

export function useGetVendorPosition() {
    return useQuery(ENDPOINTS.VENDOR_CONTACT, fetchVendorPositionRQ)
}

// delete vendor position
export async function deleteVendorPositionRQ(id) {
    const { data } = await API.delete(ENDPOINTS.VENDOR_CONTACT + id)
    if (data?.success) {
        toast.success('Position Deleted Successfully')
    }
    else {
        toast.error('Unable to Delete Position')
    }
    return data
}

// Create New Position
async function createNewVendorPositionRQ(payload) {
    const { data } = await API.post(ENDPOINTS.CREATE_NEW_VENDOR_POSITION, payload)
    return data
}

export function useCreateNewVendorPosition() {
    const queryClient = useQueryClient()
    return useMutation(createNewVendorPositionRQ, {
        onSuccess: () => {
            toast.success('New Position Created Successfully')
            queryClient.invalidateQueries(ENDPOINTS.ALL_VENDOR_POSITION)
        },
        onError: () => {
            toast.error('Unable to Create New Position')
        }
    })
}

// Put vendor Position Data
export async function usePutVendorPosition(id, payload) {
    const { data } = await API.put(ENDPOINTS.VENDOR_CONTACT + id, payload)
    if (data) {
        toast("Position Edited Successfully")
    }
    return data
}