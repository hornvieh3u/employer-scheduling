// ** Reactstrap Imports
import { UncontrolledTooltip, Button, Badge } from 'reactstrap'

// ** Third Party Components
import { Download, Trash, Edit } from 'react-feather'
import { confirm } from 'react-confirm-box'
import { deleteBook } from '../store'
import { store } from '@store/store'
const onDelete = async (client, id) => {
    const result = await confirm('Are you sure?', {
        closeOnOverlayClick: true,
        classNames: 'custom_confirm_box'
    })
    if (result) {
        store.dispatch(deleteBook(client, id))
        return
    }
}

// ** Table columns
import React from 'react'
import moment from 'moment'

const useBooksColumns = ({ setDeleteModal, setDeleteId }) => {
    const convertDate = (date) => {
        return moment(date).format('LL')
    }

    const convertTime = (date) => {
        return moment(date).format('LT')
    }

    const statusObj = {
        pending: 'light-warning',
        active: 'light-success',
        inactive: 'light-secondary'
    }
    const bookColumns = [
        {
            name: 'Name',
            sortable: true,
            minWidth: '200px',
            sortField: 'name',
            selector: (row) => row.name,
            cell: (row) => <span>{row.name}</span>
        },
        {
            name: 'Date',
            sortable: true,
            minWidth: '100px',
            sortField: 'date',
            cell: (row) => (
                <span>
                    {convertDate(row.startDate)}
                </span>
            )
        },
        {
            name: 'Time',
            minWidth: '100px',
            sortField: 'date',
            cell: (row) => (
                <span>
                    {convertTime(row.startDate)}
                </span>
            )
        },
        {
            name: 'Duration',
            sortable: true,
            minWidth: '200px',
            sortField: 'name',
            selector: (row) => row.duration,
            cell: (row) => <span>{row.duration} minutes</span>
        },
        {
            name: 'Status',
            sortable: true,
            minWidth: '200px',
            sortField: 'name',
            selector: (row) => row.name,
            cell: (row) => <Badge
                className="text-capitalize"
                color='light-success'
                pill
            >
                Scheduled
            </Badge>
        },
        {
            name: 'Action',
            minWidth: '110px',
            cell: (row) => (
                <div className="column-action d-flex align-items-center">
                    {/* <Edit className="text-body cursor-pointer me-1" size={17} /> */}
                    {/* {console.log(row)} */}
                    <Trash
                        onClick={() => {
                            setDeleteModal(true)
                            setDeleteId(row?._id)
                            // onDelete(row?.clientId, row?._id)
                        }}
                        className="text-body cursor-pointer"
                        size={17}
                    />
                </div>
            )
        }
    ]

    return { bookColumns }
}

export default useBooksColumns
