import axios from 'axios'
import React, { useState } from 'react'
import { Edit, MoreVertical, Trash2 } from 'react-feather'
import { Link } from 'react-router-dom'
import {
    DropdownToggle,
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    Input
} from 'reactstrap'

import { useGetEmployeePosition, usePutEmployeePosition } from '../../../requests/contacts/employee-contacts'


const PositionTableRow = ({ positionId, position, i, refetch, setDeleteModal }) => {
    const [editPosition, setEditPosition] = useState(false)

    const { data: positions } = useGetEmployeePosition()

// handle edit lead position
const handleEditPosition = (e) => {
    e.preventDefault()

    const positionName = e.target.position.value
    const payload = { position: positionName }

    const isPositionExist = positions.find((p) => p.position.toLowerCase() === positionName.toLowerCase())

    if (isPositionExist) {
        // toggle lead position input field and lead position title
        setEditPosition(!editPosition)
        return toast.error("This position already exists")
    }

    else if (positionName.toLowerCase() === "owner") {
        setEditPosition(!editPosition)
        return toast.error('This position already exists')
    }

    else {
        setEditPosition(!editPosition)

        // pass id and edited value to db
        usePutEmployeePosition(positionId, payload)

        // refetch position data
        setTimeout(() => {
            refetch()
        }, 100)
    }
}

    return (
        <tr>
            <th scope="row">{i + 1}</th>
            <td>
                {editPosition ? (
                    <form onSubmit={handleEditPosition}>
                        <Input
                            size="sm"
                            id="position"
                            name="position"
                            placeholder={position}
                        />
                    </form>
                ) : (
                    <span>{position}</span>
                )}
            </td>
            <td className="d-flex gap-2">
                <UncontrolledDropdown>
                    <DropdownToggle tag="div" className="btn btn-sm">
                        <MoreVertical size={14} className="cursor-pointer" />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            onClick={() => setEditPosition(!editPosition)}
                            tag={Link}
                            className="w-100"
                        >
                            <Edit size={14} className="me-50" />
                            <span className="align-middle">Edit</span>
                        </DropdownItem>

                        <DropdownItem
                            // onClick={() => setEditPosition(!editPosition)}
                            tag={Link}
                            className="w-100"
                            onClick={(e) => {
                                setDeleteModal({
                                    id: positionId,
                                    show: true
                                })
                            }}
                        >
                            <Trash2 size={14} className="me-50" />
                            <span className="align-middle">Delete</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr>
    )
}

export default PositionTableRow
