// ** React Imports
import { useState, useEffect, useMemo } from 'react'

// ** Table Columns
import useBooksColumns from './useColumns'

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
import { getData, deleteBook } from '../store'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import useMessage from '../../../components/message/useMessage'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'

const CustomHeader = ({ handleFilter, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage }) => {
    return (
        <div className="invoice-list-table-header w-100 py-2">
            <Row>
                <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
                    <div className="d-flex align-items-center me-2">
                        <label htmlFor="rows-per-page">Show</label>
                        <Input
                            type="select"
                            id="rows-per-page"
                            value={rowsPerPage}
                            onChange={handlePerPage}
                            className="form-control ms-50 pe-3"
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </Input>
                    </div>
                    <Button
                        tag={Link}
                        to='/book/booking-type'

                        color="primary"
                    >
                        Add Book
                    </Button>
                </Col>
                <Col
                    lg="6"
                    className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
                >
                    <div className="d-flex align-items-center">
                        <label htmlFor="search-invoice">Search</label>
                        <Input
                            id="search-invoice"
                            className="ms-50 me-2 w-100"
                            type="text"
                            value={value}
                            onChange={(e) => handleFilter(e.target.value)}
                            placeholder="Search Book"
                        />
                    </div>
                    <Input
                        className="w-auto "
                        type="select"
                        value={statusValue}
                        onChange={handleStatusValue}
                    >
                        <option value="">Select Status</option>
                        <option value="scheduled">Scheduled</option>
                    </Input>
                </Col>
            </Row>
        </div>
    )
}
const BookingTab = ({  }) => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector((state) => state.book)


    const { isSuccess: deleteIsSuccess, isLoading: isDeleteLoading } =
        useSelector((state) => state?.clientContact?.fleUplaodDelete)

    const { success, error } = useMessage()

    // ** States
    const [searchTerm, setSearchTerm] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)
    const [statusValue, setStatusValue] = useState('')
    const [sort, setSort] = useState('desc')
    const [sortColumn, setSortColumn] = useState('id')


    const dataToRender = () => {
        return store.books
    }

    const handleFilter = val => {
        setSearchTerm(val)
        dispatch(
            getData({
                q: val,
                page: currentPage,
                sort: sort,
                status: statusValue,
                perPage: rowsPerPage,
                sortColumn: sortColumn.sortField
            })
        )
    }

    const handleStatusValue = e => {
        setStatusValue(e.target.value)
        dispatch(
            getData({
                q: searchTerm,
                page: currentPage,
                sort: sort,
                status: e.target.value,
                perPage: rowsPerPage,
                sortColumn: sortColumn.sortField
            })
        )
    }

    const handleSort = (column, sortDirection) => {
        setSort(sortDirection)
        setSortColumn(column.sortField)
        dispatch(
            getData({
                q: searchTerm,
                page: currentPage,
                status: statusValue,
                sort: sortDirection,
                perPage: rowsPerPage,
                sortColumn: column.sortField
            })
        )
    }

    const handlePerPage = e => {
        setRowsPerPage(parseInt(e.target.value))
        dispatch(
            getData({
                q: searchTerm,
                page: currentPage,
                sort: sort,
                status: statusValue,
                perPage: parseInt(e.target.value),
                sortColumn: sortColumn.sortField
            })
        )

    }

    useEffect(() => {
        dispatch(
            getData({
                q: searchTerm,
                page: currentPage,
                sort: sort,
                status: statusValue,
                perPage: rowsPerPage,
                sortColumn: sortColumn.sortField
            })
        )
    }, [
        dispatch
    ])
    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
        dispatch(
            getData({
                q: searchTerm,
                page: page.selected + 1,
                sort: sort,
                status: statusValue,
                perPage: parseInt(e.target.value),
                sortColumn: sortColumn.sortField
            })
        )

    }

    const CustomPagination = () => {
        const count = Number((store.total / rowsPerPage).toFixed(0))

        return (
            <ReactPaginate
                nextLabel=''
                breakLabel='...'
                previousLabel=''
                pageCount={count || 1}
                activeClassName='active'
                breakClassName='page-item'
                pageClassName={'page-item'}
                breakLinkClassName='page-link'
                nextLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousLinkClassName={'page-link'}
                previousClassName={'page-item prev'}
                onPageChange={page => handlePagination(page)}
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                containerClassName={'pagination react-paginate justify-content-end p-1'}
            />
        )
    }

    // Delete
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    const handleBookDelete = () => {
        dispatch(deleteBook(deleteId))
    }

    // ** book Delete Success
    useMemo(() => {
        if (deleteIsSuccess) {
            // show Success Mesage
            success('Book Deleted Successfully')

            // hide modal
            setDeleteModal(false)

        }
    }, [deleteIsSuccess])

    const { bookColumns } = useBooksColumns({ setDeleteModal, setDeleteId })

    return (
        <div className="book-list-wrapper">
            <Card>

                <div className="book-list-dataTable react-dataTable">
                    <DataTable
                        noHeader
                        subHeader
                        sortServer
                        pagination
                        responsive
                        paginationServer
                        columns={bookColumns}
                        onSort={handleSort}
                        data={dataToRender()}
                        sortIcon={<ChevronDown />}
                        className="react-dataTable"
                        paginationDefaultPage={currentPage}
                        paginationComponent={CustomPagination}
                        subHeaderComponent={
                            <CustomHeader
                                value={searchTerm}
                                rowsPerPage={rowsPerPage}
                                handleFilter={handleFilter}
                                handlePerPage={handlePerPage}
                                handleStatusValue={handleStatusValue}
                            />
                        }
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
                                onClick={handleBookDelete}
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

export default BookingTab
