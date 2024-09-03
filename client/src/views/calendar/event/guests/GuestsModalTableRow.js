import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Edit, MoreVertical, Trash2 } from 'react-feather'
import { Link } from 'react-router-dom'
import {
    DropdownToggle,
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    Input
} from 'reactstrap'

import { useGetEmployeePosition, usePutEmployeePosition } from '../../../../requests/contacts/employee-contacts'
import { FaUserAlt, FaUserCheck } from 'react-icons/fa';

const GuestsModalTableRow = ({ guest }) => {
    const [isChecked, setIsChecked] = useState(false)

    return (
        <div className="d-flex justify-content-between mb-1">
            <div className="d-flex align-items-center">
                {isChecked ? <FaUserCheck size="20" /> : <FaUserAlt size="20" />}
                <h3 className="ms-1 mb-0 font-medium-1">{guest.email}*</h3>
            </div>
            <Input type="checkbox" name="isSendEmail" onChange={(e) => { setIsChecked(!isChecked) }} />
        </div>
    )
}

export default GuestsModalTableRow
