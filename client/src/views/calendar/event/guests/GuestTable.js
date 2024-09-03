// ** React Imports
import { useState } from 'react'

// ** Icons Imports
import { Edit, UserX } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import Select from 'react-select'

// ** For Export 
import CSVReader from 'react-csv-reader';
import { CSVLink } from 'react-csv';

// for PDF export
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// ** Reactstrap Imports
import {
    Table,
    Badge,
    Label,
    Input,
    Card,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledTooltip,
    UncontrolledButtonDropdown
} from 'reactstrap'

import { ExternalLink, Printer, File, Clipboard } from 'react-feather'
import { useDispatch } from 'react-redux'
import { deleteGuestAction } from '../store/actions'
import { useParams } from 'react-router-dom'
import useMessage from '../../../../lib/useMessage'

const GuestTable = (props) => {
    // ** Get current event
    const { eventId } = useParams();
    const { error, success } = useMessage();
    const dispatch = useDispatch();
    // ** States
    const [currentFilter, setCurrentFilter] = useState({
        value: '',
        label: 'Select Filter'
    })

    // ** Guest filter options
    const filterOptions = [
        { value: '', label: 'Select Filter' },
        { value: 'coming', label: 'Coming' },
        { value: 'nextTime', label: 'Next Time' },
        { value: 'noreply', label: 'No Reply' },
        { value: 'paid', label: 'Paid' },
        { value: 'notPaid', label: 'Not Paid' }
    ]

    //Delete Icon Click Handler
    const deleteGuestClickHandler = (guestId) => {
        dispatch(deleteGuestAction({ guestId, eventId }));
        success("Successfully Deleted")
    }

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
        filename: 'guests.csv',
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
    const columns = [
        { title: 'Sl', field: 'sl' },
        { title: 'Email', field: 'email' },
        { title: 'Phone', field: 'phone', type: 'numeric' },
        { title: 'Position', field: 'category' },
        { title: 'Status', field: 'status' },
    ];

    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.text('Guest Details', 15, 10);
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
        });
        doc.save('guests.pdf');
    };

    return (
        <Card>
            <CardHeader>
                <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
                    <div className="me-1">
                        <Input
                            id="search-invoice"
                            placeholder="Search Guest"
                            className="w-100"
                            type="text"
                        // value={searchTerm}
                        // onChange={(e) => handleFilter(e.target.value)}
                        />
                    </div>
                    <div>
                        <Select
                            isClearable={false}
                            value={currentFilter}
                            options={filterOptions}
                            className="react-select"
                            classNamePrefix="select"
                            theme={selectThemeColors}
                        />
                    </div>
                </div>
                <div>
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
            </CardHeader>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        props.data != undefined && props.data.map(guest => {
                            return (
                                <tr>
                                    <td>{guest.name}</td>
                                    <td>{guest.email}</td>
                                    <td>{guest.phone}</td>
                                    <td>
                                        <Badge pill color="light-primary" className="me-1">
                                            {guest.category}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Badge pill color="light-primary" className="me-1">
                                            {guest.status}
                                        </Badge>
                                        {/* <Badge pill color="light-warning" className="me-1">
                                Next Time
                            </Badge>
                            <Badge pill color="light-danger" className="me-1">
                                No Reply
                            </Badge> */}
                                    </td>
                                    <td>
                                        {/* <Edit className="me-2 cursor-pointer" size={20} /> */}
                                        <UserX
                                            size={20}
                                            className="cursor-pointer"
                                            id="positionLeft"
                                            onClick={(e) => deleteGuestClickHandler(guest._id)}
                                        />
                                        <UncontrolledTooltip
                                            placement="left"
                                            target="positionLeft"
                                        >
                                            Remove Guest
                                        </UncontrolledTooltip>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Card>
    )
}

export default GuestTable
