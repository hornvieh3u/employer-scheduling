// ** React Imports
import { Fragment, useState } from 'react'

// ** Third Party Component
import { Eye } from 'react-feather'
// ** Reactstrap Imports
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'

const PopoverControlled = ({ note }) => {
    const [popoverOpen, setPopoverOpen] = useState(false)

    return (
        <Fragment>
            <span title={note}>
                <Eye style={{ cursor: 'pointer' }} />
            </span>
        </Fragment>
    )
}
export default PopoverControlled