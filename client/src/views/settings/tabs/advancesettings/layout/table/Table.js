// ** React Imports
import { Fragment, useState, useEffect, useMemo } from 'react'


// ** Table Columns
import useColumns from './useColumns'

import CSVReader from 'react-csv-reader'

// ** Store & Actions
import { getAllData, getData } from '../../../../../contacts/store'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'
import {
    ChevronDown,
    Share,
    // Printer,
    FileText,
    File,
    // Grid,
    // Copy,
    Upload
} from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Input,
    Label,
    Button,
    CardBody,
    CardTitle,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,

    //----------- >
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import {
    contactListRequest,
    TotalEmployeeCountAction,
    TotalActiveEmployeeCountAction,
    TotalinternshipEmployeeEmployeeCountAction,
    formerEmployeeEmployeeCountAction,
    deleteEmployeeContact,
    contactImportAction
} from '../../../../../contacts/employee/store/actions'
import { deleteEmployeeReset, importProcessingReset } from '../../../../../contacts/employee/store/reducer'
import useMessage from '../../../../../../lib/useMessage'

// Message

// for CSV export
import { CSVLink } from 'react-csv'

// for PDF export
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useGetEmployeePosition } from '../../../../../../requests/contacts/employee-contacts'


// ** Table Header
const CustomHeader = ({
    store,
    toggleSidebar,
    handlePerPage,
    rowsPerPage,
    handleFilter,
    searchTerm,
    employeeList
}) => {
    // ** Converts table to CSV
    function convertArrayOfObjectsToCSV(array) {
        let result

        const columnDelimiter = ','
        const lineDelimiter = '\n'
        const keys = Object.keys(store.data[0])

        result = ''
        result += keys.join(columnDelimiter)
        result += lineDelimiter

        array.forEach((item) => {
            let ctr = 0
            keys.forEach((key) => {
                if (ctr > 0) result += columnDelimiter

                result += item[key]

                ctr++
            })
            result += lineDelimiter
        })

        return result
    }

    // for CSV export

    const tableData = employeeList?.data?.list

    const formatedData =
        tableData &&
        tableData.map(
            (
                {
                    _id,
                    userId,
                    photo,
                    tags,
                    isFormer,
                    isDelete,
                    ranks,
                    files,
                    others,
                    socialLinks,
                    paymentMethods,
                    address,
                    billingAddress,
                    __v,
                    ...rest
                },
                index
            ) => {
                const sl = index + 1
                // formatting address
                const fullAddress = `${address?.street || ''},${
                    address?.city || ''
                },${address?.state || ''},${address?.country || ''}`

                const fullBillilgAddress = `${
                    billingAddress?.addressLineOne || ''
                },${billingAddress?.city || ''},${
                    billingAddress?.state || ''
                },${billingAddress?.country || ''},${
                    billingAddress?.zipCode || ''
                }`

                const restData = {
                    sl,
                    fullAddress,
                    fullBillilgAddress,
                    ...rest
                }
                return restData
            }
        )

    const csvReport = {
        filename: 'employees.csv',
        data: formatedData
    }

    // Hover on CSV

    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }
    const handleMouseLeave = () => {
        setIsHover(false)
    }

    // for PDF export
    const columns = [
        { title: 'Sl', field: 'sl' },
        { title: 'Employees', field: 'fullName' },
        { title: 'Email', field: 'email' },
        { title: 'Phone', field: 'phone', type: 'numeric' },
        { title: 'fullAddress', field: 'fullAddress' },
        { title: 'Billing Address', field: 'fullBillilgAddress' },
        { title: 'Gender', field: 'gender' },
        { title: 'Salary', field: 'salary' },
        { title: 'position', field: 'position' },
        { title: 'Note', field: 'note' },
        { title: 'Status', field: 'status' }
    ]

    const downloadPdf = () => {
        const doc = new jsPDF()
        doc.text('Employee Details', 15, 10)
        doc.autoTable({
            styles: {
                fontSize: 8
            },
            theme: 'grid',
            columns: columns.map((col) => ({ ...col, dataKey: col.field })),
            body: formatedData,
            horizontalPageBreak: true,
            headStyles: {
                halign: 'center',
                valign: 'middle',
                fontSize: 7,
                fillColor: ['#f3f2f7'],
                textColor: '#202c33',
                tableWidth: 'auto'
            },
            bodyStyles: {
                textColor: 'black'
            },
            columnStyles: {
                0: {
                    cellWidth: 18
                },
                1: {
                    cellWidth: 20
                }
            }
        })
        doc.save('employees.pdf')
    }

    let typingTimer //timer identifier
    let doneTypingInterval = 500 //time in ms (500 ms)
    function doneTyping(val) {
        handleFilter(val)
    }

    return (
        <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
            <Row>
                <Col xl="6" className="d-flex align-items-center p-0">
                    <div className="d-flex align-items-center w-100">
                        <label htmlFor="rows-per-page">Show</label>
                        <Input
                            className="mx-50"
                            type="select"
                            id="rows-per-page"
                            value={rowsPerPage}
                            onChange={handlePerPage}
                            style={{ width: '5rem' }}
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </Input>
                        <label htmlFor="rows-per-page">Entries</label>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const EmployeeList = (props) => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector((state) => state.users)
    const { employeeList } = useSelector((state) => state.employeeContact)
    const { ContactAllData } = props
    console.log('props is ', ContactAllData)

    // Delete Contact Modal
    const [deleteModal, setDeleteModal] = useState({
        id: '',
        show: false
    })

    // table columns
    const { columns } = useColumns({ setDeleteModal })

    // ** States
    const [sort, setSort] = useState('desc')
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [sortColumn, setSortColumn] = useState('id')
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    // ** Function to toggle sidebar
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    // ** Get data on mount
    useEffect(() => {
        dispatch(TotalEmployeeCountAction())
        dispatch(TotalActiveEmployeeCountAction())
        dispatch(TotalinternshipEmployeeEmployeeCountAction())
        dispatch(formerEmployeeEmployeeCountAction())
    }, [dispatch])

    useEffect(() => {
        dispatch(
            contactListRequest({
                page: currentPage,
                pageSize: rowsPerPage,
                text: searchTerm
            })
        )
    }, [
        dispatch,
        sort,
        sortColumn,
        currentPage,
        searchTerm,
        rowsPerPage
    ])

    // ** Function in get data on page change
    const handlePagination = (page) => {
        setCurrentPage(page.selected + 1)
    }

    // ** Function in get data on rows per page
    const handlePerPage = (e) => {
        const value = parseInt(e.currentTarget.value)
        setRowsPerPage(value)
    }

    // ** Function in get data on search query change
    const handleFilter = (val) => {
        setSearchTerm(val)
    }

    // ** Custom Pagination
    const CustomPagination = () => {
        // const count = Number(Math.ceil(store.total / rowsPerPage));
        const count = Math.ceil(employeeList?.data?.total / rowsPerPage)

        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={count || 1}
                activeClassName="active"
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={(page) => handlePagination(page)}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                containerClassName={
                    'pagination react-paginate justify-content-end my-2 pe-1'
                }
            />
        )
    }

    // ** Table data to render

    const handleSort = (column, sortDirection) => {
        setSort(sortDirection)
        setSortColumn(column.sortField)
        dispatch(
            getData({
                sort,
                sortColumn,
                q: searchTerm,
                page: currentPage,
                perPage: rowsPerPage
            })
        )
    }

    return (
        <Fragment>
            <Card className="overflow-hidden">
                <div className="react-dataTable">
                    <DataTable
                        noHeader
                        subHeader
                        sortServer
                        pagination
                        responsive
                        paginationServer
                        columns={columns}
                        onSort={handleSort}
                        sortIcon={<ChevronDown />}
                        className="react-dataTable"
                        paginationComponent={CustomPagination}
                        data={ContactAllData}
                        subHeaderComponent={
                            <CustomHeader
                                store={store}
                                searchTerm={searchTerm}
                                rowsPerPage={rowsPerPage}
                                handleFilter={handleFilter}
                                handlePerPage={handlePerPage}
                                toggleSidebar={toggleSidebar}
                                employeeList={ContactAllData}
                            />
                        }
                    />
                </div>
            </Card>
        </Fragment>
    )
}

export default EmployeeList
