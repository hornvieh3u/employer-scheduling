// ** React Imports
import { useState, useEffect, useMemo } from 'react'

// ** Table Columns
import useStoreColumns from './useStoreColumns'
import { toast } from 'react-toastify'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import { addOtherAction, otherDeleteAction } from '../../store/actions'

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

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useParams } from 'react-router-dom'
import { useDateFormatter } from '../../../../../hooks/useDateFormatter'
import { editOtherReset, othersDeleteReset } from '../../store/reducer'
import useMessage from '../../../../../lib/useMessage'
const OtherTab = ({ selectedUser }) => {
    const { id } = useParams()
    // ** Store Vars
    const dispatch = useDispatch()
    // Delete Cirtificate
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    const { other } = useSelector((state) => state.leadContact)
    const store = useSelector((state) => state.invoice)
    const { isSuccess, isLoading, isError } = other

    const [otherData, setOtherData] = useState(selectedUser?.others || [])

    // local state
    const [state, setState] = useState({
        _id: '',
        address: '',
        phone: '',
        startDate: new Date(),
        endDate: '',
        file: ''
    })

    const { success, error } = useMessage()
    
    // ** States
    const [centeredModal, setCenteredModal] = useState(false)
    const [value] = useState('')
    const [rowsPerPage] = useState(6)
    const [currentPage] = useState(1)
    const [statusValue] = useState('')
    const [sort, setSort] = useState('desc')
    const [sortColumn, setSortColumn] = useState('id')
    // const [picker, setPicker] = useState(new Date())

    const { storeColumns } = useStoreColumns({
        setCenteredModal,
        setState,
        setDeleteModal,
        setDeleteId
    })

    useMemo(() => {
        if (isSuccess) {
            // dispatch(fetchSingleClientAction(id))
            setCenteredModal(false)
            success('Other added successfull')
            editOtherReset()
        }
    }, [isSuccess])

    useMemo(() => {
        setOtherData(selectedUser?.others || [])
    }, [selectedUser])

    const [counter, setCounter] = useState(0)
    const dataToRender = () => {
        // setCounter(contact?.others?.length)
        return otherData
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

    function handleAddOther() {
        const { address, phone, startDate, endDate, file, _id } = state

        if (address === '') {
            error('Address must not be empty !')
        } else if (phone === '') {
            error('Phone must not be empty !')
        } else if (file === '') {
            error('Please select a file !')
        } else if (startDate === '') {
            error('Select Date a start date!')
        } else if (endDate === '') {
            error('Select Date a start date!')
        } else {
            //
            const formData = new FormData()
            formData.append('address', address)
            formData.append('phone', phone)
            formData.append('file', file)
            formData.append('clientId', id)
            formData.append('startDate', startDate)
            formData.append('endDate', endDate)
            formData.append('_id', _id)
            dispatch(addOtherAction(formData, selectedUser?._id))
        }
    }

    // Delete REDUX state
    const {
        othersDelete: { isLoading: deleteLoading, isSuccess: deleteSuccess }
    } = useSelector((state) => state.leadContact)
    useMemo(() => {
        if (deleteSuccess) {
            success('Deleted Successfully')
            dispatch(othersDeleteReset())
            setDeleteModal(false)
        }
    }, [deleteSuccess])
    // Delete Handler

    function onDeleteConfirm() {
        dispatch(
            otherDeleteAction({
                otherId: deleteId,
                leadContact: selectedUser?._id
            })
        )
    }

    return (
        <div className="invoice-list-wrapper">
            <Card>
                <CardHeader className="py-1">
                    <CardTitle
                        tag="h4"
                        className="d-flex justify-content-center align-items-center"
                    >
                        Store Info{' '}
                        <div className="ms-1 table-rating">
                            <span style={{ fontSize: 13 }}>{counter}</span>
                        </div>
                    </CardTitle>
                    <div className="d-flex">
                        <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
                            <Input
                                id="search-invoice"
                                className="ms-50 w-100"
                                type="text"
                                placeholder="Search Store ..."
                                // value={searchTerm}
                                // onChange={(e) => handleFilter(e.target.value)}
                            />
                        </div>
                        <Button
                            color="primary"
                            onClick={() => setCenteredModal(!centeredModal)}
                        >
                            Add New Store
                        </Button>
                        <Modal
                            isOpen={centeredModal}
                            toggle={() => setCenteredModal(!centeredModal)}
                            className="modal-dialog-centered"
                            onClosed={() => {
                                setState({
                                    _id: '',
                                    address: '',
                                    phone: '',
                                    startDate: new Date(),
                                    endDate: '',
                                    file: ''
                                })
                            }}
                        >
                            <ModalHeader
                                toggle={() => setCenteredModal(!centeredModal)}
                            >
                                {state?._id === '' ? ' Add New' : 'Update'}{' '}
                                Store
                            </ModalHeader>
                            <ModalBody>
                                <Row>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="input-default"
                                        >
                                            Address
                                        </Label>
                                        <Input
                                            type="text"
                                            id="input-default"
                                            placeholder="Type full address"
                                            value={state.address}
                                            onChange={(e) => {
                                                setState((p) => ({
                                                    ...p,
                                                    address: e?.target?.value
                                                }))
                                            }}
                                        />
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="input-default"
                                        >
                                            Phone
                                        </Label>
                                        <Input
                                            type="text"
                                            id="input-default"
                                            placeholder="330-806-1981"
                                            value={state.phone}
                                            onChange={(e) => {
                                                setState((p) => ({
                                                    ...p,
                                                    phone: e?.target?.value
                                                }))
                                            }}
                                        />
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="inputFile"
                                        >
                                            Lease Start Date
                                        </Label>
                                        <Flatpickr
                                            className="form-control"
                                            id="default-picker"
                                            onChange={(date) => {
                                                setState((p) => ({
                                                    ...p,
                                                    startDate: date[0]
                                                }))
                                            }}
                                            value={state.startDate}
                                            options={{ dateFormat: 'Y-m-d' }}
                                        />
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="inputFile"
                                        >
                                            Lease End Date
                                        </Label>
                                        <Flatpickr
                                            className="form-control"
                                            id="default-picker"
                                            onChange={(date) => {
                                                setState((p) => ({
                                                    ...p,
                                                    endDate: date[0]
                                                }))
                                            }}
                                            value={state.endDate}
                                            options={{ dateFormat: 'Y-m-d' }}
                                        />
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="credit-card"
                                        >
                                            Photo
                                        </Label>
                                        <Input
                                            id="due-date"
                                            name="due-date"
                                            className="form-control"
                                            type="file"
                                            onChange={(e) => {
                                                if (e?.target?.files[0]) {
                                                    setState((p) => ({
                                                        ...p,
                                                        file: e.target.files[0]
                                                    }))
                                                }
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    onClick={handleAddOther}
                                    type="button"
                                    className="mt-1 me-1"
                                    color="primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'saving...' : 'save'}
                                </Button>

                                <Button
                                    className="mt-1"
                                    color="secondary"
                                    outline
                                    onClick={() =>
                                        setCenteredModal(!centeredModal)
                                    }
                                >
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </CardHeader>
                <div className="invoice-list-dataTable react-dataTable">
                    <DataTable
                        noHeader
                        sortServer
                        columns={storeColumns}
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

export default OtherTab
