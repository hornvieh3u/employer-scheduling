import * as api from './api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    // add
    newClientContactStart,
    newClientContactSuccess,
    newClientContactFailure,
    newClientContactReset,

    // Read
    clientContactFetchStart,
    clientContactFetchSuccess,
    clientContactFetchError,
    clientContactFetchReset,

    // Client Delete

    //state
    totalCountReducer,
    activeCountReducer,
    pastDueCountReducer,
    formerCountReducer,

    // fetch Single client
    singleClientReducer,
    singleClientFetchStartReducer,
    singleClientFetchErrorReducer,

    // Contact file upload
    importFileProcessingStart,
    importFileProcessingFinish,
    importFileProcessingError,

    // import
    importProcessingStart,
    importProcessingFinish,
    importProcessingError,

    // edit Client
    editClientStart,
    editClientSuccess,
    editClientError,

    // TAgs
    tagFetchingStart,
    tagFetchingSuccess,
    tagFetchingError,

    // upload avatar
    avatarUploadStart,
    avatarUploadSuccess,
    avatarUploadError,

    // ** files upload reducers
    filesUploadStart,
    filesUploadSuccess,
    filesUploadError,
    filesUploadReset,
    addRankStart,
    addRankSuccess,
    addRankError,

    // ** uploaded file delete
    fleUplaodDeleteStart,
    fleUplaodDeleteSuccess,
    fleUplaodDeleteError,
    addOtherStart,
    addOtherSuccess,
    addOtherError,
    deleteRankStart,
    deleteRankSuccess,
    deleteRankError,
    editRankStart,
    editRankSuccess,
    editRankError,

    // UPdate Spcoa; :oml
    socialLinkStart,
    socialLinkSuccess,
    socialLinkError,

    // edit other
    editOtherStart,
    editOtherSuccess,
    editOtherError,

    // Add Payment Method
    addPaymentMethodStart,
    addPaymentMethodSuccess,
    addPaymentMethodError,
    addPaymentMethodReset,

    // update Payment Method
    updatePaymentMethodStart,
    updatePaymentMethodSuccess,
    updatePaymentMethodError,
    updatePaymentMethodReset,

    // Delete Payment Method
    deletePaymentMethodStart,
    deletePaymentMethodSuccess,
    deletePaymentMethodError,
    deletePaymentMethodReset,

    // Update Billing Address
    updateBillingAddressStart,
    updateBillingAddressSuccess,
    updateBillingAddressError,
    updateBillingAddressReset,

    // delete other
    deleteOtherStart,
    deleteOtherSuccess,
    deleteOtherError,

    // Delete Contact
    deleteContactStart,
    deleteContactSuccess,
    deleteContactError,
    deleteContactReset
} from './reducer'


// Fetch Client Contact List
export const ClientContactFetchAction = (options) => async (dispatch) => {
    try {
        dispatch(clientContactFetchStart())
        const { data } = await api.clientContactList(options)
        dispatch(clientContactFetchSuccess(data))
    } catch (error) {
        dispatch(
            clientContactFetchError({
                error: error.response
            })
        )
    }
    // Reset After 3 sec
    setTimeout(() => {
        clientContactFetchReset()
    })
}

// action creator for new client contact
export const newClientContact = (newClient) => async (dispatch) => {
    try {
        dispatch(newClientContactStart())
        const { data } = await api.newClientContact(newClient)
        dispatch(ClientContactFetchAction())
        dispatch(newClientContactSuccess(data))

        // Fetch Counts
        dispatch(totalClientCountAction())
        dispatch(totalActiveClientCountAction())
        dispatch(totalPastDueClientCountAction())
        dispatch(totalFormerClientCountAction())
    } catch (error) {
        dispatch(
            newClientContactFailure({
                error: error.response
            })
        )
    }
    // Reset After 3 sec
    setTimeout(() => {
        newClientContactReset()
    })
}

// Delete Contact
export const deleteClientContact = (id) => async (dispatch, getState) => {
    try {
        dispatch(deleteContactStart())
        await api.deleteClientContact(id)
        dispatch(ClientContactFetchAction({}))
        dispatch(deleteContactSuccess())
    } catch (error) {
        dispatch(deleteContactError())
    }
}

// Client State Action

export const totalClientCountAction = () => async (dispatch, getState) => {
    try {
        const { data } = await api.ClientContactTotalCount()
        dispatch(totalCountReducer(data))
    } catch (error) {
        //
    }
}

export const totalActiveClientCountAction =
    () => async (dispatch, getState) => {
        try {
            const { data } = await api.ClientContactTotalActiveCount()
            dispatch(activeCountReducer(data))
        } catch (error) {
            //
        }
    }

export const totalPastDueClientCountAction =
    () => async (dispatch, getState) => {
        try {
            const { data } = await api.ClientContactTotalPastDueCount()
            dispatch(pastDueCountReducer(data))
        } catch (error) {
            //
        }
    }

export const totalFormerClientCountAction =
    () => async (dispatch, getState) => {
        try {
            const { data } = await api.ClientContactTotalFormerCount()
            dispatch(formerCountReducer(data))
        } catch (error) {
            //
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

// contact import actions
export const contactFileUploadAction =
    (payload) => async (dispatch, getState) => {
        try {
            dispatch(importFileProcessingStart())
            const { data } = await api.importCOntactFileUPload(payload)
            dispatch(importFileProcessingFinish(data))
        } catch (error) {
            dispatch(importFileProcessingError({}))
        }
    }
// contact import actions

export const contactImportAction = (payload) => async (dispatch, getState) => {
    try {
        dispatch(importProcessingStart())
        const { data } = await api.importCOntactReqeust(payload)
        dispatch(importProcessingFinish(data))

        dispatch(totalClientCountAction())
        dispatch(totalActiveClientCountAction())
        dispatch(totalPastDueClientCountAction())
        dispatch(totalFormerClientCountAction())
    } catch (error) {
        dispatch(importProcessingError({}))
    }
}
export const editClientAction = (id, updatedClient) => async (dispatch) => {
    try {
        dispatch(editClientStart())
        const { data } = await api.editClientReqeust(id, updatedClient)
        dispatch(editClientSuccess(data))

        // fetch single client
        dispatch(fetchSingleClientAction(id))
    } catch (error) {
        // const email =
        dispatch(editClientError())
    }
}

export const editSocialLinksAction =
    (id, updatedClient) => async (dispatch) => {
        try {
            dispatch(socialLinkStart())
            const { data } = await api.editClientReqeust(id, updatedClient)
            dispatch(socialLinkSuccess(data))
        } catch (error) {
            // const email =
            dispatch(socialLinkError())
        }
    }

export const fetchTagsAction = () => async (dispatch) => {
    try {
        dispatch(tagFetchingStart())
        const { data } = await api.tagFetchReqeust()
        dispatch(tagFetchingSuccess(data))
    } catch (error) {
        // const email =
        dispatch(tagFetchingError())
    }
}

export const uploadAvatarAction = (form, id) => async (dispatch) => {
    try {
        dispatch(avatarUploadStart())
        await api.uploadAvatarReqeust(form)
        dispatch(fetchSingleClientAction(id))
        dispatch(avatarUploadSuccess())
    } catch (error) {
        dispatch(avatarUploadError({}))
    }
}

// ** files upload Aciton

export const uploadFilesAction = (form, id) => async (dispatch) => {
    try {
        dispatch(filesUploadStart())
        await api.uploadFileReqeust(form)
        dispatch(fetchSingleClientAction(id))
        dispatch(filesUploadSuccess())
    } catch (error) {
        dispatch(filesUploadError(error))
    }
}

export const addRankAction = (form) => async (dispatch) => {
    try {
        dispatch(addRankStart())
        const { data } = await api.addRankReqeust(form)
        dispatch(addRankSuccess(data))
    } catch (error) {
        dispatch(addRankError({ message: 'Error. Try again' }))
    }
}

export const editRankAction = (form, clientId) => async (dispatch) => {
    try {
        dispatch(editRankStart())
        const { data } = await api.editRankReqeust(form)
        dispatch(editRankSuccess(data))
        dispatch(fetchSingleClientAction(clientId))
    } catch (error) {
        dispatch(editRankError({ message: 'Error. Try again' }))
    }
}

export const deleteClientFileAction = (clientId, id) => async (dispatch) => {
    try {
        dispatch(fleUplaodDeleteStart())
        await api.deleteFileReqeust({ clientId, id })
        dispatch(fetchSingleClientAction(clientId))
        dispatch(fleUplaodDeleteSuccess())
    } catch (error) {
        dispatch(fleUplaodDeleteError(error))
    }
}
export const deleteRankAction = (state) => async (dispatch) => {
    try {
        dispatch(deleteRankStart())
        const { data } = await api.deleteRankReqeust(state)
        dispatch(fetchSingleClientAction(state?.clientId))
        dispatch(deleteRankSuccess(data))
    } catch (error) {
        dispatch(deleteRankError({ message: 'Error. Try again' }))
    }
}

export const addOtherAction = (form, id) => async (dispatch) => {
    try {
        dispatch(addOtherStart())
        const { data } = await api.addOtherReqeust(form)
        dispatch(addOtherSuccess(data))
        dispatch(fetchSingleClientAction(id))
    } catch (error) {
        dispatch(addOtherError({ message: 'Error. Try again' }))
    }
}

export const editOtherAction = (state) => async (dispatch) => {
    try {
        dispatch(editOtherStart())
        const { data } = await api.editOtherReqeust(state)
        dispatch(editOtherSuccess(data))

        // refetch single Client
        dispatch(fetchSingleClientAction(state?.clientId))
    } catch (error) {
        dispatch(editOtherError({ message: 'Error. Try again' }))
    }
}

// Add Payment Method
export const addPaymentMethodAction = (state) => async (dispatch) => {
    try {
        dispatch(addPaymentMethodStart())
        const { data } = await api.addPaymentMethod(state)
        // Refetch Single Client Again
        dispatch(fetchSingleClientAction(state?.clientId))
        dispatch(addPaymentMethodSuccess(data))
    } catch (error) {
        dispatch(addPaymentMethodError({ message: 'Error. Try again' }))
    }
}

// update Payment Method
export const updatePaymentMethodAction = (state) => async (dispatch) => {
    try {
        dispatch(updatePaymentMethodStart())
        const { data } = await api.updatePaymentMethod(state)
        dispatch(fetchSingleClientAction(state?.clientId))
        dispatch(updatePaymentMethodSuccess(data))
    } catch (error) {
        dispatch(updatePaymentMethodError({ message: 'Error. Try again' }))
    }
}

// Delete Payment Method
export const deletePaymentMethodAction = (state) => async (dispatch) => {
    try {
        dispatch(deletePaymentMethodStart())
        const { data } = await api.deletePaymentMethod(state)
        dispatch(fetchSingleClientAction(state?.clientId))
        dispatch(deletePaymentMethodSuccess(data))
    } catch (error) {
        dispatch(deletePaymentMethodError({ message: 'Error. Try again' }))
    }
}

// Update Billing Address

export const updateBillingAddressAction = (state) => async (dispatch) => {
    try {
        dispatch(updateBillingAddressStart())
        const { data } = await api.editBillingReqeust(state)
        dispatch(updateBillingAddressSuccess(data))
    } catch (error) {
        dispatch(updateBillingAddressError({ message: 'Error. Try again' }))
    }
}

export const deleteOtherAction = (state) => async (dispatch) => {
    try {
        dispatch(deleteOtherStart())
        const { data } = await api.deleteOtherReqeust(state)
        dispatch(deleteOtherSuccess(data))
        //
        dispatch(fetchSingleClientAction(state?.clientId))
    } catch (error) {
        dispatch(deleteOtherError({ message: 'Error. Try again' }))
    }
}
