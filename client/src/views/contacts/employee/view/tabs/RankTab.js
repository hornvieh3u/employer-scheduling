// ** React Imports
import { Fragment } from 'react'

// ** Rank Components
// import Programs from './Programs'
import Certifications from './Certifications'

const RankTab = (props) => {
    return (
        <Fragment>
            {/* <Programs /> */}
            <Certifications {...props} />
        </Fragment>
    )
}

export default RankTab
