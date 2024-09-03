// ** Reactstrap Imports
import { Button } from 'reactstrap'

// ** Third Party Components
import { Download, Trash, Edit, Send } from 'react-feather'

import React from 'react'

import moment from 'moment'

const storeColumns = ({
    setCenteredModal,
    setState,
    setDeleteModal,
    setDeleteId
}) => {
    // ** Table columns
    const storeColumns = [
        {
            name: 'Address',
            sortable: true,
            minWidth: '200px',
            sortField: 'title',
            selector: (row) => row.address,
            cell: (row) => <span>{row?.address}</span>
        },
        {
            name: 'Phone',
            sortable: true,
            minWidth: '150px',
            sortField: 'type',
            selector: (row) => row.phone,
            cell: (row) => <span>{row?.phone}</span>
        },
        {
            name: 'Lease Start',
            sortable: true,
            width: '160px',
            sortField: 'type',
            selector: (row) => row.phone,
            cell: (row) => <span>{moment(row?.startDate).format('L')}</span>
        },
        {
            name: 'Lease End',
            sortable: true,
            width: '160px',
            sortField: 'type',
            selector: (row) => row.phone,
            cell: (row) => <span>{moment(row?.endDate).format('L')}</span>
        },
        {
            name: 'Lease Doc',
            width: '140px',
            center: true,
            cell: (row) => (
                <div className="column-action d-flex align-items-center">
                    {/* {console.log(row)} */}
                    <a href={row?.file} target="_blank">
                        <Button.Ripple
                            className="btn-icon rounded-circle"
                            outline
                            color="primary"
                        >
                            <Download size={16} />
                        </Button.Ripple>
                    </a>
                </div>
            )
        },
        {
            name: 'Action',
            minWidth: '110px',
            cell: (row) => (
                <div className="column-action d-flex align-items-center">
                    <Edit
                        onClick={() => {
                            // console.log('hiting')
                            setCenteredModal(true)
                            setState(row)
                        }}
                        className="text-body cursor-pointer me-1"
                        size={17}
                    />
                    <Trash
                        onClick={() => {
                            setDeleteModal(true)
                            setDeleteId(row?._id)
                        }}
                        className="text-body cursor-pointer me-1"
                        size={17}
                    />
                    <Send className="text-body cursor-pointer" size={17} />
                </div>
            )
        }
    ]

    return {
        storeColumns
    }
}

export default storeColumns
