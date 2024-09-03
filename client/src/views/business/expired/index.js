// ** React Imports
import { useParams } from 'react-router-dom'
import { Fragment, useState } from 'react'

// ** myforms App Component Imports
import Sidebar from './components/Sidebar'

// ** Third Party Components

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'


// ** Styles
import '@styles/react/apps/app-email.scss'
import Table from './components/Table'


const Expired = () => {
    // ** States
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
    // useEffect(() => {
    //     dispatch(
    //         getMails({
    //             q: query || '',
    //             folder: params.folder || 'inbox',
    //             label: params.label || ''
    //         })
    //     )
    // }, [query, params.folder, params.label])

    return (
        <Fragment>
            <Sidebar
                sidebarOpen={sidebarOpen}
            />
            <div className="content-right">
                <div className="content-body">
                    <div>
                        <Table />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Expired
