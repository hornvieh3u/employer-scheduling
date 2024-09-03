// ** React Imports
import { useState } from 'react'

// ** Third Party Components
// import Flatpickr from 'react-flatpickr'
import { Calendar, ChevronDown, Trash2, X } from 'react-feather'
// import Select, { components } from 'react-select'
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Reactstrap Imports
import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
} from 'reactstrap'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'
import AppointmentAction from './AppointmentAction'


// ** Bootstrap Checkbox Component
// const BootstrapCheckbox = forwardRef((props, ref) => (
//     <div className='form-check'>
//         <Input type='checkbox' ref={ref} {...props} />
//     </div>
// ))

const DailyAttendance = [
    { name: "Maths Class", date: "01/13/23", type: "New Member" },
    { name: "English Class", date: "01/18/23", type: "Personal" },
    { name: "Science Class", date: "01/24/23", type: "Business" },
    { name: "Practice Class", date: "01/03/23", type: "Business" },
    { name: "Maths Class", date: "01/13/23", type: "Other" },
    { name: "English Class", date: "01/18/23", type: "New Member" },
    { name: "Science Class", date: "01/24/23", type: "Other" },
    { name: "Practice Class", date: "01/03/23", type: "Information" },
    { name: "Maths Class", date: "01/13/23", type: "New Member" },
    { name: "English Class", date: "01/18/23", type: "Personal" },
    { name: "Science Class", date: "01/24/23", type: "Reschedule" },
    { name: "Practice Class", date: "01/03/23", type: "Business" },
]
const columns = [
    {
        name: "Date",
        sortable: true,
        selector: (row) => row.date,
    },
    {
        name: "Name",
        sortable: true,
        selector: (row) => row.name,
    },

    {
        name: "Type",
        sortable: true,
        selector: (row) => row.type,
    },
    {
        name: "Actions",
        allowOverflow: true,
        // style: {
        //     display: "flex", justifyContent: "center"
        // },
        cell: (row) => (
            <AppointmentAction row={row} />
        ),
    },
]

const ViewAppointment = (props) => {
    // ** Props
    const { setOpenViewAppointment, openViewAppointment } = props

    // ** States
    const [currentPage, setCurrentPage] = useState(0)

    const handlePagination = page => {
        setCurrentPage(page.selected)
    }

    // ** Close BTN
    const CloseBtn = (
        <X className="cursor-pointer" size={15} onClick={() => setOpenViewAppointment(false)} />
    )
    const CustomPagination = () => (
        <ReactPaginate
            previousLabel=""
            nextLabel=""
            forcePage={currentPage}
            onPageChange={(page) => handlePagination(page)}
            pageCount={Math.ceil(DailyAttendance.length / 7) || 1}
            breakLabel="..."
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName="active"
            pageClassName="page-item"
            breakClassName="page-item"
            nextLinkClassName="page-link"
            pageLinkClassName="page-link"
            breakLinkClassName="page-link"
            previousLinkClassName="page-link"
            nextClassName="page-item next-item"
            previousClassName="page-item prev-item"
            containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
        />
    )

    return (
        <Modal
            isOpen={openViewAppointment}
            // className="sidebar-xl"
            style={{ width: "600px" }}
            toggle={() => setOpenViewAppointment(false)}
            contentClassName="p-0 overflow-hidden"
            modalClassName="modal-slide-in event-sidebar"
        >
            <ModalHeader
                className="mb-1"
                toggle={() => setOpenViewAppointment(false)}
                close={CloseBtn}
                tag="div"
            >
                <h5 className="modal-title">Appointment</h5>
            </ModalHeader>
            <PerfectScrollbar options={{ wheelPropagation: false }}>
                <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
                    <div className="react-dataTable mt-2">
                        <DataTable
                            noHeader
                            pagination
                            columns={columns}
                            paginationPerPage={7}
                            className="react-dataTable"
                            sortIcon={<ChevronDown size={10} />}
                            paginationDefaultPage={currentPage + 1}
                            paginationComponent={CustomPagination}
                            data={DailyAttendance}
                        // selectableRowsComponent={BootstrapCheckbox}
                        // selectableRows
                        />
                    </div>
                    <Button
                        color="secondary"
                        type="reset"
                        onClick={() => setOpenViewAppointment(false)}
                        outline
                    >
                        Close
                    </Button>
                </ModalBody>
            </PerfectScrollbar>
        </Modal>
    )
}

export default ViewAppointment
