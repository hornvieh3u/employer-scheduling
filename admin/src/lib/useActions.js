import { customInterIceptors } from './AxiosProvider'

// import { customInterIceptors } from '../../../../lib/AxiosProvider'

const API = customInterIceptors()

// import authentication reducer/ actions
import { handleLogout } from '../redux/authentication'

// user API end point
export const validateToken = (payload) => async (dispatch) => {
    try {
        const { data } = await API.post('/auth/validate-token', payload)
        if (data === 'valid') {
            // Dispatch Ok
        } else {
            // Remove Localstorage data
            localStorage.clear()
            // reset global store data
            // logout user
            dispatch(handleLogout())
        }
    } catch (error) {
        // Remove Localstorage data
        localStorage.clear()
        // reset global store data
        // logout user
        dispatch(handleLogout())
    }
}
