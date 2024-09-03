// ** Reactstrap Imports
import {
    Table,
    Button,
    Row,
    Col,
    Input,
    Card,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledButtonDropdown
} from 'reactstrap'
import { ChevronDown } from 'react-feather'
import { useState, useEffect } from 'react'
import { forwardRef } from 'react'
// ** Table Columns*/
import useColumns from './useColumns'
import { FaUserCheck, FaUserTimes, FaUserClock } from 'react-icons/fa'

import { ExternalLink, Printer, File, Clipboard } from 'react-feather'
import DataTable from 'react-data-table-component'

import AddAllContactModal from "./AddAllContactModal";

// ** For Export 
import CSVReader from 'react-csv-reader';
import { CSVLink } from 'react-csv';

// for PDF export
import jsPDF from 'jspdf';
import 'jspdf-autotable';


// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';


const customStyles = {};
// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
        <Input type='checkbox' ref={ref} {...props} />
    </div>
))


// ** Table Header
const CustomHeader = ({ isButtonShow, markAllClickHandler, addAllContactClickHandler, tableData, downloadPdf, csvReport }) => {

    return (
        <div className='invoice-list-table-header w-100 mt-2 mb-75'>
            <Row>
                <Col xl="3" className="d-flex align-items-center mb-sm-0 mb-1">
                    <div className="me-1">
                        <Input
                            id="search-invoice"
                            placeholder="Search Attendees"
                            className="w-100"
                            type="text"
                        />
                    </div>
                </Col>
                <Col xl="9" className="justify-content-end d-flex align-items-center">
                    {isButtonShow ? <div className="d-flex">
                        <Button size="sm" color="primary" className="text-nowrap me-1" onClick={markAllClickHandler}>Mark All Attended</Button>
                        <Button size="sm" color="primary" className="text-nowrap me-1" onClick={addAllContactClickHandler}>Add All to Contact</Button>
                    </div> : <></>}
                    <div className="d-flex align-items-center">
                        <div className="me-1">
                            <FaUserCheck size="15" color="#7367f0" /><span className="me-1"> : Came</span>
                            <FaUserTimes size="15" color="#7367f0" /><span className="me-1"> : Not Come</span>
                            <FaUserClock size="15" color="#7367f0" /><span> : Late</span>
                        </div>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color="secondary" outline caret>
                                <ExternalLink className="font-small-4 me-50" />
                                <span>Export</span>
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem className="w-100">
                                    <Printer className="font-small-4 me-50" />
                                    <span>Print</span>
                                </DropdownItem>
                                {tableData && (
                                    <CSVLink {...csvReport}>
                                        <DropdownItem
                                            className="w-100" >
                                            <File className="font-small-4 me-50" />
                                            <span
                                                className="align-middle"
                                            >
                                                CSV
                                            </span>
                                        </DropdownItem>
                                    </CSVLink>
                                )}
                                {tableData && (
                                    <DropdownItem className="w-100" onClick={() => downloadPdf()}>
                                        <Clipboard className="font-small-4 me-50" />
                                        <span className="align-middle">PDF</span>
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>

                </Col>
            </Row>
        </div>
    )
}

const Attendance = (props) => {
    const [attendStatusArr, setAttendStatusArr] = useState([]);
    const [editableRows, setEditableRows] = useState([]);
    const [isButtonShow, setIsButtonShow] = useState(false);
    const [modal, setModal] = useState(false);
    useEffect(() => {
        //console.log('attendacne', attendStatusArr); 
    }, [attendStatusArr]);
    const { columns } = useColumns({ setAttendStatusArr, attendStatusArr });
    const addClickAttendance = (e) => {
        if (e.selectedRows.length > 0) {
            setIsButtonShow(true);
            setEditableRows(e.selectedRows);
        } else {
            setIsButtonShow(false);
        }
    }
    const markAllClickHandler = () => {
        let editableRowsIds = editableRows.map((item, index) => {
            return item._id;
        })
        document.querySelectorAll(".btn-group").forEach((btnGroup, index) => {
            if (editableRowsIds.indexOf(btnGroup.getAttribute("id")) > -1) {
                btnGroup.childNodes.forEach((button, index) => {
                    if ((button.classList.contains('not') && button.classList.contains('active')) || (button.classList.contains('coming') && button.classList.contains('active'))) {
                        button.classList.remove("active");
                    } else if (button.classList.contains("came") && !button.classList.contains("active")) {
                        button.classList.add("active");
                    } else if (button.classList.contains("came") && button.classList.contains("active")) {
                        button.classList.remove("active");
                    }
                })
            }
        })

        let tmp = [];
        attendStatusArr.map((item, index) => {
            tmp.push({ id: item.id, attendanceStatus: "came" })
        })
        setAttendStatusArr(tmp);
    }
    const addAllContactClickHandler = () => {
        setModal(!modal);
    };

    // Export part

    // ** Converts table to CSV
    function convertArrayOfObjectsToCSV(array) {
        let result;

        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(store.data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach((item) => {
            let ctr = 0;
            keys.forEach((key) => {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];

                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    const tableData = props.data;
    const formatedData =
        tableData &&
        tableData.map(
            (
                {
                    _id,
                    phone,
                    ...rest
                },
                index
            ) => {
                const sl = index + 1;
                const PhoneNumber = phone ? phone.toLocaleString() : "";
                const restData = {
                    sl,
                    PhoneNumber,
                    ...rest
                };
                return restData;
            }
        );

    const csvReport = {
        filename: 'attendance.csv',
        data: formatedData
    };

    // ** Downloads CSV
    function downloadCSV(array) {
        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(array);
        if (csv === null) return;
        const filename = 'export.csv';
        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }

        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }

    // for PDF export
    const pdfColumns = [
        { title: 'Sl', field: 'sl' },
        { title: 'Name', field: 'name' },
        { title: 'Email', field: 'email' },
        { title: 'Phone', field: 'PhoneNumber', type: 'numeric' },
        { title: 'Status', field: 'status' },
    ];

    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.text('Attendance Details', 15, 10);
        doc.autoTable({
            styles: {
                fontSize: 8
            },
            theme: 'grid',
            columns: pdfColumns.map((col) => ({ ...col, dataKey: col.field })),
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
        });
        doc.save('attendance.pdf');
    };

    return (
        <Card>
            <div className="react-dataTable">
                <DataTable
                    noHeader
                    subHeader
                    sortServer
                    pagination
                    responsive
                    paginationServer
                    columns={columns}
                    selectableRows
                    selectableRowsComponent={BootstrapCheckbox}
                    onSelectedRowsChange={addClickAttendance}
                    customStyles={customStyles}
                    sortIcon={<ChevronDown />}
                    className="react-dataTable"
                    data={props?.data}
                    subHeaderComponent={
                        <CustomHeader isButtonShow={isButtonShow} markAllClickHandler={markAllClickHandler} addAllContactClickHandler={addAllContactClickHandler}
                            tableData={tableData}
                            downloadPdf={downloadPdf}
                            csvReport={csvReport} />
                    }
                />
            </div>
            <AddAllContactModal
                modal={modal}
                setModal={setModal}
                toggle={addAllContactClickHandler}
                selectedRows={editableRows}
            ></AddAllContactModal>
        </Card>
    )
}

export default Attendance
