// ** React Imports
import { Fragment } from 'react'

// ** Rank Components
import Programs from './Programs'
import Certifications from './Certifications'
import Progression from './Progression'

const RankTab = ({ selectedUser }) => {
    return (
        <Fragment>
            {/* <Programs /> */}
            {/* <Certifications selectedUser={selectedUser} /> */}
            <Progression />
        </Fragment>
    )
}

export default RankTab
