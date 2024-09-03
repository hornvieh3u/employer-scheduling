import * as api from './api'
import {
    addLeadStart,
    addLeadSuccess,
    addLeadError,

    // ** Fetch
    contactListStart,
    contactListSuccess,
    contactListError,

    //
    totalLeadCountStart,
    totalLeadCountSuccess,
    totalLeadCountError,
    // ** cold list
    coldLeadCountStart,
    coldLeadCountSuccess,
    coldLeadCountError,
    // ** warm List
    warmLeadCountStart,
    warmLeadCountSuccess,
    warmLeadCountError,
    // ** hot list
    hotLeadCountStart,
    hotLeadCountSuccess,
    hotLeadCountError,
    // GET single contact
    singleContactStart,
    singleContactSuccess,
    singleContactError,

    //  ** Update Contact
    contactUpdateStart,
    contactUpdateSuccess,
    contactUpdateError,

    // social links
    socialLinkUpdateStart,
    socialLinkUpdateSuccess,
    socialLinkUpdateError,

    // ** file Delete
    fileDeleteStart,
    fileDeleteSuccess,
    fileDeleteError,
    fileDeleteReset,

    // ** file add
    fileAddStart,
    fileAddSuccess,
    fileAddError,
    fileAddReset,

    // fetch Single Client
    singleClientReducer,
    singleClientFetchStartReducer,
    singleClientFetchErrorReducer,
    singleClientFetchReset,

    // other
    addOtherStart,
    addOtherSuccess,
    addOtherError,
    addRankReset,

    // Others Delete
    othersDeleteStart,
    othersDeleteSuccess,
    othersDeleteError,
    othersDeleteReset,

    // Delete contact
    deleteContactStart,
    deleteContactSuccess,
    deleteContactError,
    deleteContactReset,

    //changeViewGoal
    changeViewGoal,
    changeViewGoalStart,

    // import start
    importProcessingStart,
    importProcessingFinish,
    importProcessingError,
    importProcessingReset,

    //updateStage

    updateContactStageSuccess,
    updateContactStageStart,

    changeStateAddNew,
    selectContactLead
} from './reducer'

// Fetct Contact List
export const addContactAction = (options) => async (dispatch) => {

    // console.log('2. send data to the backend', options)

    try {
        dispatch(addLeadStart())
        const { data } = await api.addContact(options)
        dispatch(fetchContactListAction())
        dispatch(addLeadSuccess(data))

        // Fetch Total contact count
        dispatch(fetchTotalLeadCountAction())
        // Fetch total cold contact count
        dispatch(fetchTotalColdLeadCountAction())
        dispatch(fetchTotalWarmLeadCountAction())
        dispatch(fetchTotalHotLeadCountAction())
    } catch (error) {
        // console.log(error.response)
        dispatch(addLeadError())
    }
}

// Fetct Contact List
export const fetchContactListAction = (options) => async (dispatch) => {
    try {
        dispatch(contactListStart())
        const { data } = await api.contactList(options)
        dispatch(contactListSuccess(data))
    } catch (error) {
        // console.log(error.response)
        dispatch(contactListError())
    }
}
export const handleSelectContact = (data) => async (dispatch) => {
    try {
        dispatch(selectContactLead(data))
    } catch (error) {

    }
}

// Fetct total contact count
export const fetchTotalLeadCountAction = () => async (dispatch) => {
    try {
        dispatch(totalLeadCountStart())
        const { data } = await api.totalLeadsCount()
        dispatch(totalLeadCountSuccess(data))
    } catch (error) {
        // console.log(error.response)
        dispatch(totalLeadCountError())
    }
}

// Fetct total Cold contact count
export const fetchTotalColdLeadCountAction = () => async (dispatch) => {
    try {
        dispatch(coldLeadCountStart())
        const { data } = await api.totalColdLeads()
        dispatch(coldLeadCountSuccess(data))
    } catch (error) {
        // console.log(error.response)
        dispatch(coldLeadCountError())
    }
}

// Fetct total warm contact count
export const fetchTotalWarmLeadCountAction = () => async (dispatch) => {
    try {
        dispatch(warmLeadCountStart())
        const { data } = await api.totalWarmLeads()
        dispatch(warmLeadCountSuccess(data))
    } catch (error) {
        // console.log(error.response)
        dispatch(warmLeadCountError())
    }
}

// Fetct total Hot contact count
export const fetchTotalHotLeadCountAction = () => async (dispatch) => {
    try {
        dispatch(hotLeadCountStart())
        const { data } = await api.totalHotLeads()
        dispatch(hotLeadCountSuccess(data))
    } catch (error) {
        // console.log(error.response)
        dispatch(hotLeadCountError())
    }
}
export const newAddContactAction = (isNew) => async (dispatch) => {
    try {
        dispatch(changeStateAddNew(isNew))
    } catch (error) {

    }
}
// ** Get Single contact by id
export const getSingleConactAction = (id) => async (dispatch) => {
    try {
        dispatch(singleContactStart())
        const { data } = await api.getSingleCotact(id)
        dispatch(singleContactSuccess(data))
    } catch (error) {
        // console.log(error.response)
        dispatch(singleContactError())
    }
}

// ** Update Contact
export const updateContactAction = (payload) => async (dispatch) => {
    try {
        dispatch(contactUpdateStart())
        const { data } = await api.updateContact(payload)
        dispatch(contactUpdateSuccess(data))
    } catch (error) {
        dispatch(contactUpdateError())
    }
}

export const socialLinksUpdateAction = (payload) => async (dispatch) => {
    try {
        dispatch(socialLinkUpdateStart())
        await api.updateSocialLinkRequest(payload)
        dispatch(getSingleConactAction(payload?.id))
        dispatch(socialLinkUpdateSuccess())
    } catch (error) {
        dispatch(socialLinkUpdateError({}))
    }
}

// ** File Add
export const fileAddAction = (payload, id) => async (dispatch) => {
    try {
        dispatch(fileAddStart())
        await api.fileAddReqeust(payload)
        dispatch(getSingleConactAction(id))
        dispatch(fileAddSuccess())
    } catch (error) {
        dispatch(fileAddError({}))
    }
}

// ** file Delete
export const fileDeleteAction = (payload, id) => async (dispatch) => {
    try {
        dispatch(fileDeleteStart())
        await api.fileDeleteReqeust(payload)
        dispatch(getSingleConactAction(id))
        dispatch(fileDeleteSuccess())
    } catch (error) {
        dispatch(fileDeleteError({}))
    }
}

export const fetchSingleClientAction = (id) => async (dispatch, getState) => {
    try {
        dispatch(singleClientFetchStartReducer())
        const { data } = await api.fetchSingleClientReqeust(id)
        dispatch(singleClientReducer(data))
    } catch (error) {
        dispatch(singleClientFetchErrorReducer())
    }
}

export const addOtherAction = (form, id) => async (dispatch) => {
    try {
        dispatch(addOtherStart())
        const { data } = await api.addOtherReqeust(form)
        dispatch(getSingleConactAction(id))
        dispatch(addOtherSuccess(data))
    } catch (error) {
        dispatch(addOtherError({ message: 'Error. Try again' }))
    }
}

export const otherDeleteAction = (payload) => async (dispatch) => {
    try {
        dispatch(othersDeleteStart())
        const { data } = await api.otherDeleteReqeust(payload)
        dispatch(getSingleConactAction(payload?.leadContact))
        dispatch(othersDeleteSuccess(data))
    } catch (error) {
        dispatch(othersDeleteError({ message: 'Error. Try again' }))
    }
}

export const uploadAvatarAction = (form, id) => async (dispatch) => {
    try {
        // dispatch(avatarUploadStart())
        await api.uploadAvatarReqeust(form)
        dispatch(getSingleConactAction(id))
        // dispatch(avatarUploadSuccess())
    } catch (error) {
        // dispatch(avatarUploadError({}))
    }
}

export const deleteContactAction = (payload) => async (dispatch) => {
    try {
        dispatch(deleteContactStart())
        await api.deleteContact(payload)
        dispatch(fetchContactListAction({}))
        dispatch(deleteContactSuccess())

        // Delete Contact
        dispatch(fetchTotalLeadCountAction())
        dispatch(fetchTotalColdLeadCountAction())
        dispatch(fetchTotalWarmLeadCountAction())
        dispatch(fetchTotalHotLeadCountAction())
    } catch (error) {
        // dispatch(deleteContactError({}))
    }
}

export const updateContactStageAction = (payload) => async (dispatch) => {
    try {
        
        dispatch(updateContactStageStart(payload))
        await api.updateContactStage(payload)
        dispatch(fetchContactListAction({}))
        dispatch(updateContactStageSuccess())

        // update Contact
        dispatch(fetchTotalLeadCountAction())
        dispatch(fetchTotalColdLeadCountAction())
        dispatch(fetchTotalWarmLeadCountAction())
        dispatch(fetchTotalHotLeadCountAction())
    } catch (error) {
        // dispatch(updateContactError({}))
    }
}

// changeViewGoal
export const changeViewGoalAction = (payload) => async (dispatch) => {
    try {
        dispatch(changeViewGoalStart())
        dispatch(changeViewGoal(payload))
    } catch (error) {

    }
}

// contact import actions
export const contactImportAction = (payload) => async (dispatch, getState) => {
    try {
        dispatch(importProcessingStart())
        const { data } = await api.importCOntactReqeust(payload)
        dispatch(importProcessingFinish(data))
    } catch (error) {
        dispatch(importProcessingError({}))
    }
}

// leads import actions
// export const leadPositionAction = (payload) => async (dispatch, getState) => {
//     console.log('1. Action received position data', payload)
//     try {
//         dispatch(importProcessingStart())
//         const { data } = await api.leadPositionRequest(payload)
//         dispatch(importProcessingFinish(data))
//     } catch (error) {
//         dispatch(importProcessingError({}))
//     }
// }