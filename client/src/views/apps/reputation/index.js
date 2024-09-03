// ** React Imports
import { useParams } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'
import GoogleFb from './googleFb'

// ** Email App Component Imports

import Sidebar from './Sidebar'


// ** Third Party Components


// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

import PerfectScrollbar from 'react-perfect-scrollbar'
// ** Styles
import '@styles/react/apps/app-email.scss'

const Advancesettings = () => {
    // ** States
    const [query, setQuery] = useState('')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [composeOpen, setComposeOpen] = useState(false)

    // ** Toggle Compose Function
    const toggleCompose = () => setComposeOpen(!composeOpen)
    



    // ** Store Variables
    const dispatch = useDispatch()
    const store = useSelector((state) => state.email)

    // ** Vars
    const params = useParams()

    // ** UseEffect: GET initial data on Mount


    return (
   <div className="overflow-hidden email-application">
    <GoogleFb/>
    <div className="content-overlay"></div>
    <div className="content-area-wrapper  p-0 animate__animated animate__fadeIn">
        

            <Fragment>
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
               
                />
            </Fragment>
            </div>
      </div>
    )
}

export default Advancesettings
