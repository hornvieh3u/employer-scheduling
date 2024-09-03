import { customInterIceptors } from '../../../../lib/AxiosProvider'

const API = customInterIceptors()

// user API end point
export const addContact = (payload) => {
    return API.post('/vendor-contact/add', payload)
}

// user API end point
export const contactList = (payload) => {
    return API.get('/vendor-contact/list', {
        params: payload
    })
}

// GET Single contact
export const getSingleCotact = (id) => {
    return API.get('/vendor-contact/' + id)
}

// Total Lead Count
export const totalLeadsCount = () => {
    return API.get('/vendor-contact/total-contact-count')
}

// Total Cold Lead Count
export const totalCOldLeads = () => {
    return API.get('/vendor-contact/total-cold-contact-count')
}

// Total warm Lead Count
export const totalWarmLeads = () => {
    return API.get('/vendor-contact/total-warm-contact-count')
}

// Total Hot Lead Count
export const totalHotLeads = () => {
    return API.get('/vendor-contact/total-hot-contact-count')
}
// Total Hot Lead Count
export const updateContact = (payload) => {
    return API.post('/vendor-contact/update', payload)
}

// update social media
export const updateSocialLinkRequest = (payload) =>
    API.post(`/vendor-contact/update-social-links`, payload)

// ** File Section
export const fileAddReqeust = (payload) =>
    API.post(`/vendor-contact/file-add`, payload)

export const fileDeleteReqeust = (payload) =>
    API.post(`/vendor-contact/file-delete`, payload)

export const fetchSingleClientReqeust = (id) => {
    return API.get('/vendor-contact/' + id)
}

export const addOtherReqeust = (form) =>
    API.post(`/vendor-contact/add/other`, form)

export const otherDeleteReqeust = (payload) =>
    API.post(`/vendor-contact/delete/other`, payload)

export const uploadAvatarReqeust = (payload) =>
    API.post(`/vendor-contact/upload-avatar`, payload)

export const deleteContact = (payload) =>
    API.post(`/vendor-contact/delete-contact`, payload)

export const importCOntactReqeust = (data) => {
    return API.post('/vendor-contact/import-contact-array', data)
}