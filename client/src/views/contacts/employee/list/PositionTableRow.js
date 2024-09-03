import axios from 'axios'
import React, { useState } from 'react'
import { Edit, MoreVertical, Trash2 } from 'react-feather'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
    DropdownToggle,
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    Input,
    Button
} from 'reactstrap'

import { useGetEmployeePosition, usePutEmployeePosition } from '../../../../requests/contacts/employee-contacts'


const PositionTableRow = ({ positionId, position, i, refetch, setDeleteModal }) => {
    const [editPosition, setEditPosition] = useState(false)
    const [payload, setPayload] = useState(position)

    const { data: positions } = useGetEmployeePosition()

// handle edit lead position
const handleEditPosition = (e) => {
    e.preventDefault()

    const payload = {
        name: e.target.positionName.value,
        color: e.target.positionColor.value,
        order: e.target.positionOrder.value,
    }

    const isPositionExist = positions.find((p) => p.name.toLowerCase() === payload.name.toLowerCase())

    // if (isPositionExist) {
    //     // toggle lead position input field and lead position title
    //     setEditPosition(!editPosition)
    //     return toast.error("This position already exists")
    // }

    // else 
    if (payload.name.toLowerCase() === "owner") {
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
                <form onSubmit={handleEditPosition}>
                    <div class="d-flex gap-1">
                        <Input
                            size="sm"
                            id="positionName"
                            name="positionName"
                            value={payload.name}
                            onChange={e => setPayload({ ...payload, name: e.target.value })}
                            disabled={!editPosition}
                        />
                        <Input
                            size="sm"
                            id="positionColor"
                            name="positionColor"
                            type="color"
                            value={payload.color}
                            onChange={e => setPayload({ ...payload, color: e.target.value })}
                            disabled={!editPosition}
                        />
                        <Input
                            size="sm"
                            id="positionOrder"
                            name="positionOrder"
                            type="number"
                            value={payload.order}
                            onChange={e => setPayload({ ...payload, order: e.target.value })}
                            disabled={!editPosition}
                        />
                    </div>
                    { editPosition ? <Input hidden="true" type="submit"></Input> : '' }
                </form>
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
