import { createSlice } from '@reduxjs/toolkit'

export const LeadContact = createSlice({
    name: 'LeadContact',
    initialState: {
        // add new Lead
        addLead: {
            loading: false,
            success: false,
            error: null
        },
        deleteContact: {
            loading: false,
            success: false,
            error: null
        },
        contact: {
            loading: false,
            success: false,
            error: null,
            data: null
        },
        deleteLead: {
            loading: false,
            success: false,
            error: null
        },

        LeadList: {
            loading: false,
            success: false,
            error: null,
            data: null
        },

        contactList: {
            loading: false,
            success: false,
            error: null,
            data: [],
            isNewContact: false
        },

        contactUpdate: {
            loading: false,
            success: false,
            error: null
        },

        socialLinksUpdate: {
            loading: false,
            success: false,
            error: null
        },

        rankAddNUpdate: {
            loading: false,
            success: false,
            error: null
        },

        rankDelete: {
            loading: false,
            success: false,
            error: null
        },

        // ** file add
        fileAdd: {
            loading: false,
            success: false,
            error: null
        },
        // ** file Edit
        fileEdit: {
            loading: false,
            success: false,
            error: null
        },
        // **  File Delete
        fileDelete: {
            loading: false,
            success: false,
            error: null
        },

        // ** Other Add
        billingAddressUpdate: {
            loading: false,
            success: false,
            error: null
        },

        totalLeadCount: {
            loading: false,
            success: false,
            error: null,
            data: 0
        },
        coldLeadCount: {
            loading: false,
            success: false,
            error: null,
            data: 0
        },
        warmLeadCount: {
            loading: false,
            success: false,
            error: null,
            data: 0
        },
        hotLeadCount: {
            loading: false,
            success: false,
            error: null,
            data: 0
        },

        singleContact: {
            loading: false,
            success: false,
            error: null,
            data: 0
        },

        socialLinksUpdate: {
            loading: false,
            success: false,
            error: null
        },

        // ** file add
        fileAdd: {
            loading: false,
            success: false,
            error: null
        },

        // **  File Delete
        fileDelete: {
            loading: false,
            success: false,
            error: null
        },

        // other
        other: {
            isLoading: false,
            isSuccess: false,
            isError: null
        },

        // Single Client
        singleClient: {
            loading: false,
            client: null
        },
        othersDelete: {
            isLoading: false,
            isSuccess: false,
            isError: null
        },
        viewGoalSet: {
            isLoading: false,
            isSuccess: false,
            viewGoal: 1
        },
        updateContactStage: {
            oading: false,
            Success: false,
            error: null
        },
        // Contact Upload
        contactUpload: {
            contacts: [],
            fileProcessing: false,
            processingError: null,
            importing: false,
            uploadState: 'idle'
        },
        selectContact: {
            selected: null,
            isSelected: false
        }
    },
    reducers: {
        // ** add new Lead
        addLeadStart: (state) => {
            state.addLead.loading = true
        },
        addLeadSuccess: (state) => {
            state.addLead.loading = false
            state.addLead.success = true
            state.addLead.error = null
        },
        addLeadError: (state, action) => {
            state.addLead.loading = false
            state.addLead.success = true
            state.addLead.error = action.payload
        },
        addLeadReset: (state, action) => {
            state.addLead.loading = false
            state.addLead.success = false
            state.addLead.error = null
        },
        // ** add new Lead

        contactListStart: (state) => {
            state.contactList.loading = true
        },
        contactListSuccess: (state, action) => {
            state.contactList.loading = false
            state.contactList.success = true
            state.contactList.error = null
            state.contactList.data = action.payload
        },
        contactListError: (state, action) => {
            state.contactList.loading = false
            state.contactList.success = true
            state.contactList.error = action.payload
        },
        contactListReset: (state, action) => {
            state.contactList.loading = false
            state.contactList.success = false
            state.contactList.error = null
        },

        // ** Total Leads
        totalLeadCountStart: (state) => {
            state.totalLeadCount.loading = true
        },
        totalLeadCountSuccess: (state, action) => {
            state.totalLeadCount.loading = false
            state.totalLeadCount.success = true
            state.totalLeadCount.error = null
            state.totalLeadCount.data = action.payload
        },
        totalLeadCountError: (state, action) => {
            state.totalLeadCount.loading = false
            state.totalLeadCount.success = true
            state.totalLeadCount.error = action.payload
        },

        // ** Total Cold  Leads
        coldLeadCountStart: (state) => {
            state.coldLeadCount.loading = true
        },
        coldLeadCountSuccess: (state, action) => {
            state.coldLeadCount.loading = false
            state.coldLeadCount.success = true
            state.coldLeadCount.error = null
            state.coldLeadCount.data = action.payload
        },
        coldLeadCountError: (state, action) => {
            state.coldLeadCount.loading = false
            state.coldLeadCount.success = true
            state.coldLeadCount.error = action.payload
        },

        // ** Total warm  Leads
        warmLeadCountStart: (state) => {
            state.warmLeadCount.loading = true
        },
        warmLeadCountSuccess: (state, action) => {
            state.warmLeadCount.loading = false
            state.warmLeadCount.success = true
            state.warmLeadCount.error = null
            state.warmLeadCount.data = action.payload
        },
        warmLeadCountError: (state, action) => {
            state.warmLeadCount.loading = false
            state.warmLeadCount.success = true
            state.warmLeadCount.error = action.payload
        },
        // ** Total Hot  Leads
        hotLeadCountStart: (state) => {
            state.hotLeadCount.loading = true
        },
        hotLeadCountSuccess: (state, action) => {
            state.hotLeadCount.loading = false
            state.hotLeadCount.success = true
            state.hotLeadCount.error = null
            state.hotLeadCount.data = action.payload
        },
        hotLeadCountError: (state, action) => {
            state.hotLeadCount.loading = false
            state.hotLeadCount.success = true
            state.hotLeadCount.error = action.payload
        },
        // ** GET Single Contact
        singleContactStart: (state) => {
            state.singleContact.loading = true
        },
        singleContactSuccess: (state, action) => {
            state.singleContact.loading = false
            state.singleContact.success = true
            state.singleContact.error = null
            state.singleContact.data = action.payload
        },
        singleContactError: (state, action) => {
            state.singleContact.loading = false
            state.singleContact.success = true
            state.singleContact.error = action.payload
        },
        // ** Update Single Contact
        contactUpdateStart: (state) => {
            state.contactUpdate.loading = true
        },
        contactUpdateSuccess: (state, action) => {
            state.contactUpdate.loading = false
            state.contactUpdate.success = true
            state.contactUpdate.error = null
        },
        contactUpdateError: (state, action) => {
            state.contactUpdate.loading = false
            state.contactUpdate.success = true
            state.contactUpdate.error = action.payload
        },
        contactUpdateReset: (state, action) => {
            state.contactUpdate.loading = false
            state.contactUpdate.success = false
            state.contactUpdate.error = null
        },

        // ** social Link update

        socialLinkUpdateStart: (state) => {
            state.socialLinksUpdate.loading = true
        },
        socialLinkUpdateSuccess: (state, action) => {
            state.socialLinksUpdate.loading = false
            state.socialLinksUpdate.success = true
            state.socialLinksUpdate.error = null
        },
        socialLinkUpdateError: (state, action) => {
            state.socialLinksUpdate.loading = false
            state.socialLinksUpdate.success = true
            state.socialLinksUpdate.error = action.payload
        },
        socialLinkUpdateReset: (state, action) => {
            state.socialLinksUpdate.loading = false
            state.socialLinksUpdate.success = false
            state.socialLinksUpdate.error = null
        },

        // ** file Add
        fileAddStart: (state) => {
            state.fileAdd.loading = true
        },
        fileAddSuccess: (state, action) => {
            state.fileAdd.loading = false
            state.fileAdd.success = true
            state.fileAdd.error = null
        },
        fileAddError: (state, action) => {
            state.fileAdd.loading = false
            state.fileAdd.success = true
            state.fileAdd.error = action.payload
        },
        fileAddReset: (state, action) => {
            state.fileAdd.loading = false
            state.fileAdd.success = false
            state.fileAdd.error = null
        },

        // ** file Delete
        fileDeleteStart: (state) => {
            state.fileDelete.loading = true
        },
        fileDeleteSuccess: (state, action) => {
            state.fileDelete.loading = false
            state.fileDelete.success = true
            state.fileDelete.error = null
        },
        fileDeleteError: (state, action) => {
            state.fileDelete.loading = false
            state.fileDelete.success = true
            state.fileDelete.error = action.payload
        },
        fileDeleteReset: (state, action) => {
            state.fileDelete.loading = false
            state.fileDelete.success = false
            state.fileDelete.error = null
        },

        // edit Other
        editOtherStart: (state, action) => {
            state.other.isLoading = true
            state.other.isSuccess = false
            state.other.error = null
        },
        editOtherSuccess: (state, action) => {
            state.other.isLoading = false
            state.other.isSuccess = true
            state.other.error = null
        },
        editOtherError: (state, action) => {
            state.other.isLoading = false
            state.other.isSuccess = false
            state.other.error = action.payload
        },
        editOtherReset: (state, action) => {
            state.other.isLoading = false
            state.other.isSuccess = false
            state.other.error = action.payload
        },

        // Fetch Single Client
        singleClientFetchStartReducer: (state, action) => {
            state.singleClient.loading = true
        },
        singleClientReducer: (state, action) => {
            state.singleClient.client = action?.payload
            state.singleClient.loading = false
            state.singleClient.success = true
            state.contact = action?.payload
        },
        singleClientFetchErrorReducer: (state, action) => {
            state.singleClient.client = null
            state.singleClient.loading = false
        },
        singleClientFetchReset: (state, action) => {
            state.singleClient.success = false
            state.singleClient.loading = false
        },
        // Other Add
        addOtherStart: (state, action) => {
            state.other.isLoading = true
            state.other.isSuccess = false
            state.other.error = null
        },
        addOtherSuccess: (state, action) => {
            state.other.isLoading = false
            state.other.isSuccess = true
            state.other.error = null
        },
        addOtherError: (state, action) => {
            state.other.isLoading = false
            state.other.isSuccess = false
            state.other.error = action.payload
        },
        // Other Delete
        othersDeleteStart: (state, action) => {
            state.othersDelete.isLoading = true
            state.othersDelete.isSuccess = false
            state.othersDelete.error = null
        },
        othersDeleteSuccess: (state, action) => {
            state.othersDelete.isLoading = false
            state.othersDelete.isSuccess = true
            state.othersDelete.error = null
        },
        othersDeleteError: (state, action) => {
            state.othersDelete.isLoading = false
            state.othersDelete.isSuccess = false
            state.othersDelete.error = action.payload
        },
        othersDeleteReset: (state, action) => {
            state.othersDelete.isLoading = false
            state.othersDelete.isSuccess = false
            state.othersDelete.error = action.payload
        },
        // Delete Contact
        deleteContactStart: (state, action) => {
            state.deleteContact.loading = true
            state.deleteContact.success = false
            state.deleteContact.error = null
        },
        deleteContactSuccess: (state, action) => {
            state.deleteContact.loading = false
            state.deleteContact.success = true
            state.deleteContact.error = null
        },
        deleteContactError: (state, action) => {
            state.deleteContact.loading = false
            state.deleteContact.success = false
            state.deleteContact.error = action.payload
        },
        deleteContactReset: (state, action) => {
            state.deleteContact.loading = false
            state.deleteContact.success = false
            state.deleteContact.error = action.payload
        },

        // setViewGoal handler
        changeViewGoalStart: (state, action) => {
            state.viewGoalSet.isLoading = true
            state.viewGoalSet.isSuccess = false
        },
        changeViewGoal: (state, action) => {
            state.viewGoalSet.isLoading = false
            state.viewGoalSet.viewGoal = action.payload
        },

        // import handler
        importProcessingStart: (state, action) => {
            state.contactUpload.fileProcessing = false
            state.contactUpload.contacts = []
            state.contactUpload.importing = true
            state.contactUpload.uploadState = 'loading'
        },
        importProcessingFinish: (state, action) => {
            state.contactUpload.fileProcessing = false
            state.contactUpload.contacts = []
            state.contactUpload.importing = false
            state.contactUpload.uploadState = 'success'
        },
        importProcessingError: (state, action) => {
            state.contactUpload.fileProcessing = false
            state.contactUpload.contacts = []
            state.contactUpload.importing = false
            state.contactUpload.uploadState = 'error'
        },
        importProcessingReset: (state, action) => {
            state.contactUpload.fileProcessing = false
            state.contactUpload.contacts = []
            state.contactUpload.importing = false
            state.contactUpload.uploadState = 'idle'
        },
        //updateStage
        updateContactStageStart: (state, action) => {
            state.updateContactStage.loading = true
            state.updateContactStage.success = false
            state.updateContactStage.error = null
        },
        updateContactStageSuccess: (state, action) => {
            state.updateContactStage.loading = false
            state.updateContactStage.success = true
            state.updateContactStage.error = null
        },

        changeStateAddNew: (state, action) => {
            state.contactList.isNewContact = action.payload
        },
        selectContactLead: (state, action) => {
            state.selectContact.selected = action.payload,
            state.selectContact.isSelected = true
        } 
    }
})

export const {
    // Add
    addLeadStart,
    addLeadSuccess,
    addLeadError,
    addLeadReset,
    // List fetch
    contactListStart,
    contactListSuccess,
    contactListError,
    contactListReset,

    // ============
    // Total Lead list
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
    // ==================
    // GET single contact
    singleContactStart,
    singleContactSuccess,
    singleContactError,

    //  ** Update Contact
    contactUpdateStart,
    contactUpdateSuccess,
    contactUpdateError,
    contactUpdateReset,

    // social links
    socialLinkUpdateStart,
    socialLinkUpdateSuccess,
    socialLinkUpdateError,
    socialLinkUpdateReset,

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

    // Other
    editOtherStart,
    editOtherSuccess,
    editOtherError,
    editOtherReset,

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

    // Delete Other
    othersDeleteStart,
    othersDeleteSuccess,
    othersDeleteError,
    othersDeleteReset,

    // Delete contact
    deleteContactStart,
    deleteContactSuccess,
    deleteContactError,
    deleteContactReset,

    // ChangeViewGoal
    changeViewGoalStart,
    changeViewGoal,

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
} = LeadContact.actions

export default LeadContact.reducer
