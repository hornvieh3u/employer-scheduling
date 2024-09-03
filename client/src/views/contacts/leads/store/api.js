import { customInterIceptors } from '../../../../lib/AxiosProvider'

const API = customInterIceptors()

// user API end point
export const addContact = (payload) => {
    // console.log('3. send data to the backend', payload)
    return API.post('/lead-contact/add', payload)
}

// user API end point
export const contactList = (payload) => {
    return API.get('/lead-contact/list', {
        params: payload
    })
}

export const updateContactStage = (payload) => {
    return API.post('/lead-contact/update-stage', payload)
}


// GET Single contact
export const getSingleCotact = (id) => {
    return API.get('/lead-contact/' + id)
}


// Total Lead Count
export const totalLeadsCount = () => {
    return API.get('/lead-contact/total-contact-count')
}

// Total Cold Lead Count
export const totalColdLeads = () => {
    return API.get('/lead-contact/total-cold-contact-count')
}

// Total warm Lead Count
export const totalWarmLeads = () => {
    return API.get('/lead-contact/total-warm-contact-count')
}

// Total Hot Lead Count
export const totalHotLeads = () => {
    return API.get('/lead-contact/total-hot-contact-count')
}
// Total Hot Lead Count
export const updateContact = (payload) => {
    return API.post('/lead-contact/update', payload)
}

// update social media
export const updateSocialLinkRequest = (payload) =>
    API.post(`/lead-contact/update-social-links`, payload)


// ** File Section
export const fileAddReqeust = (payload) =>
    API.post(`/lead-contact/file-add`, payload)

export const fileDeleteReqeust = (payload) =>
    API.post(`/lead-contact/file-delete`, payload)


export const fetchSingleClientReqeust = (id) => {
    return API.get('/lead-contact/' + id)
}

export const addOtherReqeust = (form) => API.post(`/lead-contact/add/other`, form)


export const otherDeleteReqeust = (payload) =>
    API.post(`/lead-contact/delete/other`, payload)

export const uploadAvatarReqeust = (payload) =>
    API.post(`/lead-contact/upload-avatar`, payload)

export const deleteContact = (payload) =>
    API.post(`/lead-contact/delete-contact`, payload)

export const importCOntactReqeust = (data) => {
    return API.post('/lead-contact/import-contact-array', data)
}

// export const leadPositionRequest = (payload) => {
//     // console.log("2. api received position data", payload)
//     return API.post('/lead-position/lead-position-array', payload)
// }