// ** React Imports
import { useState, useEffect, useMemo } from 'react'

// ** Table Columns
// import { filesColumns } from './filesColumns'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'

// ** Reactstrap Imports
import {
    Card,
    CardTitle,
    CardHeader,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Label,
    Input
} from 'reactstrap'

// message
import useMessage from '../../../../../lib/useMessage'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import { Download, Trash, Edit } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// actions
import {
    fileAddAction,
    // fileEditAction,
    fileDeleteAction
} from '../../store/actions'
// ** Reset store
import {
    fileAddReset,
    // fileEditReset,
    fileDeleteReset
} from '../../store/reducer'

const FilesTab = (props) => {
    // ** Table columns
    // Delete Cirtificate
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [centeredModal, setCenteredModal] = useState(false)
    // State
    const [state, setState] = useState({
        _id: '',
        name: '',
        photo: null,
        createdAt: ''
    })

    const filesColumns = [
        {
            name: 'Title',
            sortable: true,
            minWidth: '200px',
            sortField: 'title',
            selector: (row) => row.total,
            cell: (row) => <span>{row?.title}</span>
        },
        {
            name: 'Type',
            sortable: true,
            minWidth: '100px',
            sortField: 'type',
            selector: (row) => row.total,
            cell: (row) => (
                <span>
                    {String(row?.file)
                        .split('.')
                        [
                            String(row?.file).split('.').length - 1
                        ]?.toUpperCase()}
                </span>
            )
        },
        {
            name: 'Download',
            minWidth: '90px',
            center: true,
            cell: (row) => (
                <div className="column-action d-flex align-items-center">
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
                        onClick={(_) => {
                            setCenteredModal(true)
                            setState((p) => ({
                                _id: row?._id,
                                name: row?.title,
                                createdAt: row?.createdAt,
                                photo: row?.file
                            }))
                        }}
                        className="text-body cursor-pointer me-1"
                        size={17}
                    />
                    <Trash
                        onClick={(e) => {
                            setDeleteModal(true)
                            setDeleteId(row?._id)
                        }}
                        className="text-body cursor-pointer"
                        size={17}
                    />
                </div>
            )
        }
    ]

    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector((state) => state.invoice)
    const { success, error } = useMessage()
    const { selectedUser } = props

    // File Add
    const {
        fileAdd: { success: AddSuccess, loading: AddLoading }
    } = useSelector((state) => state.vendorContact)

    useMemo(() => {
        if (AddSuccess) {
            dispatch(fileAddReset())

            // show message
            if (state._id === '') {
                success('File Added Successfully')
            } else {
                // show message
                success('File Updated Successfully')
            }

            // hide modal
            setCenteredModal(!centeredModal)
        }
    }, [AddSuccess])

    function fileAddAndEditHandler() {
        const { name, photo, _id, createdAt } = state
        if (name === '') {
            error('File Name must not be empty !')
        } else if (photo === null) {
            error('Choose File')
        } else {
            // Dispatch
            const form = new FormData()
            form.append('_id', _id)
            form.append('name', name)
            form.append('file', photo)
            form.append('createdAt', createdAt)
            form.append('employeeId', selectedUser?._id)
            if (_id === '') {
                // add reqeust
                dispatch(fileAddAction(form, selectedUser?._id))
            } else {
                // Update request
                dispatch(fileAddAction(form, selectedUser?._id))
                // dispatch(fileEditAction(form, selectedUser?._id))
            }
        }
    }

    // ** Delete COnfirmation
    const {
        fileDelete: { success: deleteSuccess, loading: deleteLoading }
    } = useSelector((state) => state.vendorContact)

    useMemo(() => {
        if (deleteSuccess) {
            // ----------------->
            success('Deleted Successfully')
            setDeleteModal(false)
            // Reset
            dispatch(fileDeleteReset())
        }
    }, [deleteSuccess])

    function onDeleteConfirm() {
        dispatch(
            fileDeleteAction(
                { _id: deleteId, employeeId: selectedUser?._id },
                selectedUser?._id
            )
        )
    }

    return (
        <div className="invoice-list-wrapper">
            <Card>
                <CardHeader className="py-1">
                    <CardTitle tag="h4">Files & Documents</CardTitle>
                    <div className="d-flex">
                        <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
                            <Input
                                id="search-invoice"
                                className="ms-50 w-100"
                                type="text"
                                placeholder="Search Files ..."
                                // value={searchTerm}
                                // onChange={(e) => handleFilter(e.target.value)}
                            />
                        </div>
                        <Button
                            color="primary"
                            onClick={() => setCenteredModal(!centeredModal)}
                        >
                            Add New File
                        </Button>
                        <Modal
                            isOpen={centeredModal}
                            toggle={() => {
                                setCenteredModal(!centeredModal)
                                setState((p) => ({ ...p, _id: '', name: '' }))
                            }}
                            className="modal-dialog-centered"
                        >
                            <ModalHeader
                                toggle={() => setCenteredModal(!centeredModal)}
                            >
                                {state?._id === '' ? 'Add New' : 'Update'} File
                            </ModalHeader>
                            <ModalBody>
                                <Row>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="input-default"
                                        >
                                            Title
                                        </Label>
                                        <Input
                                            type="text"
                                            id="input-default"
                                            placeholder="Give your file a Name"
                                            value={state?.name}
                                            onChange={(e) =>
                                                setState((p) => ({
                                                    ...p,
                                                    name: e?.target?.value
                                                }))
                                            }
                                        />
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="inputFile"
                                        >
                                            Upload A File
                                        </Label>
                                        <Input
                                            type="file"
                                            id="inputFile"
                                            name="fileInput"
                                            onChange={(e) =>
                                                setState((p) => ({
                                                    ...p,
                                                    photo: e?.target?.files[0]
                                                }))
                                            }
                                        />
                                    </Col>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    disabled={AddLoading}
                                    onClick={() =>
                                        // setCenteredModal(!centeredModal)
                                        fileAddAndEditHandler()
                                    }
                                >
                                    {AddLoading ? 'Uploading...' : 'Upload'}
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </CardHeader>
                <div className="invoice-list-dataTable react-dataTable">
                    <DataTable
                        noHeader
                        sortServer
                        columns={filesColumns}
                        responsive={true}
                        // onSort={handleSort}
                        data={selectedUser?.files}
                        sortIcon={<ChevronDown />}
                        className="react-dataTable"
                        defaultSortField="invoiceId"
                    />
                </div>
            </Card>

            <Modal
                isOpen={deleteModal}
                toggle={() => setDeleteModal((p) => !p)}
                className="modal-dialog-centered"
                // onClosed={onModalClosed}
            >
                <ModalHeader
                    className="bg-transparent"
                    toggle={() => setDeleteModal((p) => !p)}
                ></ModalHeader>
                <ModalBody className="px-sm-5 mx-50 pb-5">
                    <h3 className="text-center mb-1">
                        Are you sure to Delete ?
                    </h3>

                    <Row>
                        <Col className="text-center mt-1" xs={12}>
                            <Button
                                onClick={(e) => {
                                    setDeleteModal((p) => !p)
                                }}
                                className="mt-1 me-1"
                                color="secondary"
                                outline
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={onDeleteConfirm}
                                className="mt-1 "
                                color="primary"
                                disabled={deleteLoading}
                            >
                                {deleteLoading ? 'Deleting...' : 'confirm'}
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default FilesTab
