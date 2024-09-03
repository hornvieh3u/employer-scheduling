import { configureStore } from '@reduxjs/toolkit'

import client from '../views/contacts/client/store/reducer'

export default configureStore({
    reducer: {
        client
    }
})
