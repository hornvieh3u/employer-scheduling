import { useMutation, useQuery, useQueryClient } from 'react-query'
import { customInterIceptors } from '../../lib/AxiosProvider'
import { ENDPOINTS } from '../../lib/endpoints'
import { toast } from 'react-toastify'

const API = customInterIceptors()

const composeMarketingEmailRQ = async (payload) => {
    const { data } = await API.post(ENDPOINTS.COMPOSE_EMAIL, payload)
    return data
}

export const useComposeMarketingEmail = () => {
    // return useQuery('compose-marketing-email', composeMarketingEmailRQ)
    const queryClient = useQueryClient()
    return useMutation(composeMarketingEmailRQ, {
        onSuccess: () => {
            toast.success('Email Sent Successfully')
            queryClient.invalidateQueries(ENDPOINTS.ALL_CLIENT_POSITION)
        },
        onError: () => {
            toast.error('Unable to create new position')
        }
    })
}
