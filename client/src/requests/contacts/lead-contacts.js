import { useMutation, useQuery, useQueryClient } from 'react-query'
import { customInterIceptors } from '../../lib/AxiosProvider'
import { ENDPOINTS } from '../../lib/endpoints'
import { toast } from 'react-toastify'

const API = customInterIceptors()


// fetch All lead contacts
async function fetchLeadContactsRQ() {
    const { data } = await API.get('/lead-contact/total-contact')
    return data
}

export function useGetLeadContacts() {
    return useQuery('lead-contacts', fetchLeadContactsRQ)
}


// fetch lead position
async function fetchLeadPositionRQ() {
    const { data } = await API.get(ENDPOINTS.LEAD_CONTACT)
    return data
}

export function useGetLeadPosition() {
    return useQuery(ENDPOINTS.LEAD_CONTACT, fetchLeadPositionRQ)
}


// delete lead position
export async function deleteLeadPositionRQ(id) {
    const { data } = await API.delete(ENDPOINTS.LEAD_CONTACT + id)
    if (data?.success) {
        toast.success('Position Deleted Successfully')
    }
    else {
        toast.error('Unable to Delete Position')
    }
    return data
}

// export function useDeleteLeadPosition() {
//     const queryClient = useQueryClient()
//     return useMutation(deleteLeadPositionRQ, {
//         onSuccess: () => {
//             toast.success('Position Delete Successfully')
//             queryClient.invalidateQueries(ENDPOINTS.DELETE_LEAD_POSITION)
//         },
//         onError: () => {
//             toast.error('Unable to delete position')
//         }
//     })
// }


// Create New Position
async function createNewLeadPositionRQ(payload) {
    const { data } = await API.post(ENDPOINTS.CREATE_NEW_LEAD_POSITION, payload)
    return data
}

export function useCreateNewLeadPosition() {
    const queryClient = useQueryClient()
    return useMutation(createNewLeadPositionRQ, {
        onSuccess: () => {
            toast.success('New Position Created Successfully')
            queryClient.invalidateQueries(ENDPOINTS.ALL_LEAD_POSITION)
        },
        onError: () => {
            toast.error('Unable to Create New Position')
        }
    })
}

// Put Lead Position Data
export async function usePutLeadPosition(id, payload) {
    const { data } = await API.put(ENDPOINTS.LEAD_CONTACT + id, payload)
    if (data) {
        toast("Position Edited Successfully")
    }
    return data
}