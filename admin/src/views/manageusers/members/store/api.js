import { customInterIceptors } from '../../../../lib/AxiosProvider'

const API = customInterIceptors()

// user API end point
export const newClientContact = (newClientContact) => {
    return API.post('/client-contact', newClientContact)
}

// fetch Client Contact List
export const clientContactList = (options) => {
    return API.get('/client-contact', {
        params: options
    })
}

// fetch Client Contact List
export const deleteClientContact = (id) => {
    return API.patch('/client-contact/delete/' + id)
}

// Client State
export const ClientContactTotalCount = () => {
    return API.get('/client-contact/total-clients-count')
}

export const ClientContactTotalActiveCount = () => {
    return API.get('/client-contact/active-clients')
}

export const ClientContactTotalPastDueCount = () => {
    return API.get('/client-contact/past-due-clients')
}

export const ClientContactTotalFormerCount = () => {
    return API.get('/client-contact/former-clients')
}

export const fetchSingleClientReqeust = (id) => {
    return API.get('/client-contact/' + id)
}

export const importCOntactFileUPload = (data) => {
    return API.post('/client-contact/import-contacts', data, {
        headers: {
            'Content-Type': `multipart/form-data`
        }
    })
}

export const importCOntactReqeust = (data) => {
    return API.post('/client-contact/import-contact-array', data)
}
export const editClientReqeust = (id, updatedClient) =>
    API.patch(`/client-contact/${id}`, updatedClient)

export const tagFetchReqeust = () => API.get(`/client-contact/tags`)

export const uploadAvatarReqeust = (form) =>
    API.post(`/client-contact/upload-avatar`, form)

// ** files upload reqeusts
export const uploadFileReqeust = (form) =>
    API.post(`/client-contact/upload-file`, form)

export const addRankReqeust = (form) =>
    API.post(`/client-contact/add-rank`, form)
export const deleteFileReqeust = (payload) =>
    API.post(`/client-contact/delete-file`, payload)

export const editRankReqeust = (form) =>
    API.patch(`/client-contact/rank/edit`, form)

export const deleteRankReqeust = (data) =>
    API.patch(`/client-contact/remove-rank`, data)

export const addOtherReqeust = (form) =>
    API.post(`/client-contact/add/other`, form)

export const editOtherReqeust = (form) =>
    API.patch(`/client-contact/edit/other`, form)

// Payment method Add
export const addPaymentMethod = (form) =>
    API.post(`/client-contact/add/payment-method`, form)

// Payment method Delete
export const deletePaymentMethod = (form) =>
    API.post(`/client-contact/delete/payment-method`, form)

// Payment method Add
export const updatePaymentMethod = (form) =>
    API.post(`/client-contact/update/payment-method`, form)
export const deleteOtherReqeust = (state) =>
    API.patch(`/client-contact/remove-other`, state)

export const editBillingReqeust = (form) =>
    API.patch(`/client-contact/update/billing-info`, form)
