// ** React Imports
import { useState, useEffect, useMemo } from 'react'

// ** Table Columns
import useFilesColumns from './useFilesColumns'

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

// ** Store & Actions
import { getData } from '@src/views/apps/invoice/store'
import { useDispatch, useSelector } from 'react-redux'

// Actions
import { uploadFilesAction, deleteClientFileAction } from '../../store/actions'

import { filesUploadReset, fleUplaodDeleteReset } from '../../store/reducer'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import useMessage from '../../../../components/message/useMessage'

const FilesTab = ({ selectedUser }) => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector((state) => state.invoice)
    const {
        isLoading,
        isSuccess,
        error: reqeustError
    } = useSelector((state) => state?.clientContact?.filesUpload)

    const { isSuccess: deleteIsSuccess, isLoading: isDeleteLoading } =
        useSelector((state) => state?.clientContact?.fleUplaodDelete)

    const { success, error } = useMessage()

    // ** States
    const [centeredModal, setCenteredModal] = useState(false)
    const [value] = useState('')
    const [rowsPerPage] = useState(6)
    const [currentPage] = useState(1)
    const [statusValue] = useState('')
    const [sort, setSort] = useState('desc')
    const [sortColumn, setSortColumn] = useState('id')

    // Add Files
    const [file, setFile] = useState({
        title: '',
        file: null
    })

    function handleFileUPload() {
        const { file: uploadableFile, title } = file
        if (title === '') {
            error('Type a file Title')
        } else if (uploadableFile === null) {
            error('Choose a file')
        } else {
            // upload file
            const form = new FormData()
            form.append('title', title)
            form.append('file', uploadableFile)
            form.append('clientId', selectedUser?._id)
            dispatch(uploadFilesAction(form, selectedUser?._id))
        }
    }

    useMemo(() => {
        if (isSuccess) {
            // show Success Mesage
            success('File Uploaded Successfully')
            // reset is success state
            dispatch(filesUploadReset())
            // Close modal
            setCenteredModal(!centeredModal)
        }
    }, [isSuccess])

    const dataToRender = () => {
        const filters = {
            status: statusValue,
            q: value
        }

        const isFiltered = Object.keys(filters).some(function (k) {
            return filters[k].length > 0
        })

        if (selectedUser?.files > 0) {
            return store.data.slice(0, rowsPerPage)
        } else if (selectedUser?.files === 0 && isFiltered) {
            return []
        } else {
            let data = selectedUser?.files?.map((x) => ({
                ...x,
                clientId: selectedUser._id
            }))
            return data?.slice(0, rowsPerPage)
        }
    }

    const handleSort = (column, sortDirection) => {
        setSort(sortDirection)
        setSortColumn(column.sortField)
        dispatch(
            getData({
                q: value,
                page: currentPage,
                sort: sortDirection,
                status: statusValue,
                perPage: rowsPerPage,
                sortColumn: column.sortField
            })
        )
    }

    // Delete Files

    // Delete
    // Delete Cirtificate
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    const handleRankDelete = () => {
        dispatch(deleteClientFileAction(selectedUser?._id, deleteId))
    }

    // ** file Delete Success
    useMemo(() => {
        if (deleteIsSuccess) {
            // show Success Mesage
            success('File Deleted Successfully')

            // hide modal
            setDeleteModal(false)
            // reset is success state
            dispatch(fleUplaodDeleteReset())
            setFile((p) => ({
                title: '',
                file: null
            }))
        }
    }, [deleteIsSuccess])

    const { filesColumns } = useFilesColumns({ setDeleteModal, setDeleteId })

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
                            toggle={() => setCenteredModal(!centeredModal)}
                            className="modal-dialog-centered"
                        >
                            <ModalHeader
                                toggle={() => setCenteredModal(!centeredModal)}
                            >
                                Add New File
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
                                            value={file.title}
                                            type="text"
                                            id="input-default"
                                            placeholder="Give your file a Name"
                                            onChange={(e) => {
                                                setFile((p) => ({
                                                    ...p,
                                                    title: e.target.value
                                                }))
                                            }}
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
                                            onChange={(e) => {
                                                if (e.target.files.length > 0) {
                                                    setFile((p) => ({
                                                        ...p,
                                                        file: e.target.files[0]
                                                    }))
                                                }
                                            }}
                                            type="file"
                                            id="inputFile"
                                            name="fileInput"
                                        />
                                    </Col>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    onClick={handleFileUPload}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Uploading...' : 'Upload'}
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
                        onSort={handleSort}
                        data={dataToRender()}
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
                                className="mt-1 me-1"
                                color="secondary"
                                outline
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleRankDelete}
                                className="mt-1 "
                                color="primary"
                                disabled={isDeleteLoading}
                            >
                                {isDeleteLoading ? 'Deleting...' : 'confirm'}
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default FilesTab
