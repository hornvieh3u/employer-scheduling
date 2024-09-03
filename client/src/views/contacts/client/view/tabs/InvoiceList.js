// ** React Imports
import { useState, useEffect } from 'react'

// ** Table Columns
import { columns } from '../columns'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import {
    ChevronDown,
    ExternalLink,
    Printer,
    FileText,
    File,
    Clipboard,
    Copy
} from 'react-feather'

// ** Reactstrap Imports
import {
    Card,
    CardTitle,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledButtonDropdown,
    Input
} from 'reactstrap'

// ** Store & Actions
import { getData } from '@src/views/apps/invoice/store'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import ReactPaginate from 'react-paginate'

const InvoiceList = () => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector((state) => state.invoice)

    // ** States
    const [value] = useState('')
    const [rowsPerPage] = useState(6)
    const [currentPage] = useState(1)
    const [statusValue] = useState('')
    const [sort, setSort] = useState('desc')
    const [sortColumn, setSortColumn] = useState('id')

    useEffect(() => {
        dispatch(
            getData({
                sort,
                q: value,
                sortColumn,
                page: currentPage,
                perPage: rowsPerPage,
                status: statusValue
            })
        )
    }, [dispatch, store.data.length])

    const dataToRender = () => {
        const filters = {
            status: statusValue,
            q: value
        }

        const isFiltered = Object.keys(filters).some(function (k) {
            return filters[k].length > 0
        })

        if (store.data.length > 0) {
            return store.data.slice(0, rowsPerPage)
        } else if (store.data.length === 0 && isFiltered) {
            return []
        } else {
            return store.allData.slice(0, rowsPerPage)
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

    const CustomPagination = () => {
        // const count = Math.ceil(clientStore?.contacts?.total / rowsPerPage)
        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={1}
                activeClassName="active"
                // forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                // onPageChange={(page) => handlePagination(page)}
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

    return (
        <div className="invoice-list-wrapper">
            <Card>
                <CardHeader className="py-1">
                    <CardTitle tag="h4">Invoices</CardTitle>
                    <div className='d-flex'>
                        <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
                            <Input
                                id="search-invoice"
                                className="ms-50 w-100"
                                type="text"
                                placeholder="Filter Invoice ..."
                                // value={searchTerm}
                                // onChange={(e) => handleFilter(e.target.value)}
                            />
                        </div>
                    
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color="secondary" outline caret>
                                <ExternalLink className="font-small-4 me-50" />
                                <span>Month</span>
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem className="w-100">
                                    <Printer className="font-small-4 me-50" />
                                    <span>Month</span>
                                </DropdownItem>
                                <DropdownItem className="w-100">
                                    <FileText className="font-small-4 me-50" />
                                    <span>Year</span>
                                </DropdownItem>
                                <DropdownItem className="w-100">
                                    <File className="font-small-4 me-50" />
                                    <span>Type</span>
                                </DropdownItem>
                                {/* <DropdownItem className="w-100">
                                    <Clipboard className="font-small-4 me-50" />
                                    <span>PDF</span>
                                </DropdownItem>
                                <DropdownItem className="w-100">
                                    <Copy className="font-small-4 me-50" />
                                    <span>Copy</span>
                                </DropdownItem> */}
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                </CardHeader>
                <div className="invoice-list-dataTable react-dataTable">
                    <DataTable
                        noHeader
                        sortServer
                        columns={columns}
                        responsive={true}
                        onSort={handleSort}
                        data={dataToRender()}
                        sortIcon={<ChevronDown />}
                        className="react-dataTable"
                        defaultSortField="invoiceId"
                        pagination
                        paginationServer
                        paginationComponent={CustomPagination}
                    />
                </div>
            </Card>
        </div>
    )
}

export default InvoiceList
