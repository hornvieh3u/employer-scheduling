import { useMutation, useQuery, useQueryClient } from 'react-query'
import { customInterIceptors } from '../../lib/AxiosProvider'
import { ENDPOINTS } from '../../lib/endpoints'
import { toast } from 'react-toastify'

const API = customInterIceptors()


// fetch All Relationship contacts
async function fetchRelationContactsRQ() {
    const { data } = await API.get('/relation-contact/total-contact')
    return data
}

export function useGetRelationContacts() {
    return useQuery('relation-contacts', fetchRelationContactsRQ)
}


// Create New Position
async function createNewPositionRQ(payload) {
    const { data } = await API.post(ENDPOINTS.CREATE_NEW_RELATION_POSITION, payload)
    return data
}

export function useCreateNewPosition() {
    const queryClient = useQueryClient()
    return useMutation(createNewPositionRQ, {
        onSuccess: () => {
            toast.success('Position Created Successfully')
            queryClient.invalidateQueries(ENDPOINTS.ALL_RELATION_POSITION)
        },
        onError: () => {
            toast.error('Unable to create new position')
        }
    })
}


// fetch Relation position
async function fetchRelationPositionRQ() {
    const { data } = await API.get(ENDPOINTS.ALL_RELATION_POSITION)
    return data
}

export function useGetRelationPosition() {
    return useQuery('relation-positions', fetchRelationPositionRQ)
}


// delete Relation position List
export const deleteRelationPositionRQ = (id) => {
    const data = API.delete(ENDPOINTS.ONE_RELATION_POSITION + id)
    if (data) {
        toast.success('Position Delete Successfully')
    }
    return data
}


// Put Relation Position Data
export async function putRelationPositionRQ(id, payload) {
    const { data } = await API.put(ENDPOINTS.ONE_RELATION_POSITION + id, payload)
    if (data) {
        toast.success("Position edited successful")
    }
    return data
}