// ** Reactstrap Imports
import { UncontrolledTooltip, Button } from 'reactstrap'

// ** Third Party Components
import { Download, Trash, Edit } from 'react-feather'
import { confirm } from 'react-confirm-box'
import { deleteClientFileAction } from '../../store/actions'
import { store } from '@store/store'
const onDelete = async (client, id) => {
    const result = await confirm('Are you sure?', {
        closeOnOverlayClick: true,
        classNames: 'custom_confirm_box'
    })
    if (result) {
        store.dispatch(deleteClientFileAction(client, id))
        return
    }
}

// ** Table columns
import React from 'react'

const useFilesColumns = ({ setDeleteModal, setDeleteId }) => {
    const filesColumns = [
        {
            name: 'Title',
            sortable: true,
            minWidth: '200px',
            sortField: 'title',
            selector: (row) => row.total,
            cell: (row) => <span>{row.title}</span>
        },
        {
            name: 'Type',
            sortable: true,
            minWidth: '100px',
            sortField: 'type',
            selector: (row) => row.total,
            cell: (row) => (
                <span>
                    {String(row.file)
                        .split('.')
                        [String(row.file).split('.').length - 1]?.toUpperCase()}
                </span>
            )
        },
        {
            name: 'Download',
            minWidth: '90px',
            center: true,
            cell: (row) => (
                <div className="column-action d-flex align-items-center">
                    <Button.Ripple
                        className="btn-icon rounded-circle"
                        outline
                        color="primary"
                        onClick={(e) => {
                            window.open(row?.file)
                        }}
                    >
                        <Download size={16} />
                        {/* <a target="_blank" href={row?.file}></a> */}
                    </Button.Ripple>
                </div>
            )
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

    return { filesColumns }
}

export default useFilesColumns
