// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Component
import { Eye } from 'react-feather'
import Chart from 'react-apexcharts'

// ** Store & Actions
import { store } from '@store/store'
import { getUser, deleteUser } from '../store'

// ** Icons Imports
import { MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Note Import
import Note from './Note'

// ** Reactstrap Imports
import {
    Badge,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap'

const useColumns = ({ setDeleteModal }) => {

    const options = {
        chart: {
            sparkline: {
                enabled: false
            },
        },

        widht: 800,
        colors: ['#FF0000'],
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: -120,
                endAngle: 200,
                hollow: {
                    size: '40%',
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        show: true,
                        color: 'red',
                        fontFamily: 'Montserrat',
                        fontSize: '1em',
                        fontWeight: '600',
                        offsetY: 4,
                    },

                }
            }
        },
        stroke: {
            lineCap: 'round'
        },
    },
        series = [83]

    // ** Renders Client Columns
    const renderClient = (row) => {
        const stateNum = Math.floor(Math.random() * 6),
            states = [
                'light-success',
                'light-danger',
                'light-warning',
                'light-info',
                'light-primary',
                'light-secondary'
            ],
            color = states[stateNum]

        if (row?.photo) {
            return (
                <Avatar
                    className="me-1"
                    img={row.photo}
                    width="32"
                    height="32"
                />
            )
        } else {
            return (
                <Avatar
                    color={color || 'primary'}
                    className="me-1"
                    content={row.fullName || 'John Doe'}
                    initials
                />
            )
        }
    }

    const statusObj = {
        pending: 'light-warning',
        active: 'light-success',
        inactive: 'light-secondary'
    }

    const columns = [
        {
            name: 'Full Name',
            sortable: true,
            minWidth: '240px',
            sortField: 'fullName',
            center:true,
            selector: (row) => row?.fullName,
            cell: (row) => (
                <div className="d-flex justify-content-left align-items-center">
                    {renderClient(row)}
                    <div className="d-flex flex-column">
                        <Link
                            to={`/contacts/employee/view/${row._id}`}
                            className="user_name text-truncate text-body"
                            onClick={() => store.dispatch(getUser(row._id))}
                        >
                            <span className="fw-bolder">{row?.fullName}</span>
                        </Link>
                        <small className="text-truncate text-muted mb-0">
                            {row?.email}
                        </small>
                    </div>
                </div>
            )
        },
        {
            name: 'Status',
            width: '120px',
            sortable: true,
            sortField: 'status',
            center:true,
            selector: (row) => row.status,
            cell: (row) => (
                <Badge
                    className="text-capitalize"
                    color={statusObj[row.status]}
                    pill
                >
                    {row.status}
                </Badge>
            )
        },
        {
            name: 'Position',
            sortable: true,
            width: '130px',
            sortField: 'role',
            center:true,
            selector: (row) => row?.position,
            cell: (row) => <span>{row?.position}</span>
        },
        // {
        //     name: 'Address',
        //     sortable: true,
        //     minWidth: '172px',
        //     sortField: 'role',
        //     selector: (row) => row.country,
        //     cell: (row) => (
        //         <span>
        //             {row?.address?.street} {row?.address?.state}{' '}
        //             {row?.address?.city} {row?.address?.country}
        //         </span>
        //     )
        // },
        {
            name: 'Phone',
            width: '150px',
            center:true,
            selector: (row) => row.phone,
            cell: (row) => <span>{row?.phone}</span>
        },
        // {
        //     name: 'Outlet',
        //     width: '150px',
        //     selector: (row) => row.contact,
        //     cell: (row) => <span>{row?.contact?.outlet}</span>
        // },
        {
            name: 'Onboard',
            width: '130px',
            selector: (row) => row?.salary,
            center: true,
            cell: (row) => <div className='p-1'>
                <Chart options={options} series={series} type='radialBar' height={100} />
            </div>
        },
        {
            name: 'Rating',
            width: '150px',
            center: true,
            selector: (row) => row.billing,
            cell: () => (
                <div className="table-rating">
                    <span>0</span>
                </div>
            )
        },
        {
            name: 'Note',
            width: '150px',
            center: true,
            selector: (row) => row.billing,
            cell: (row) => <Note note={row?.note} id={row._id} />
            // <Eye />
        },
        {
            name: 'Tag',
            width: '80px',
            center:true,
            selector: (row) => row.billing,
            cell: () => (
                <Badge pill color="light-primary">
                    -
                </Badge>
            )
        },
        {
            name: 'Actions',
            minWidth: '100px',
            center:true,
            cell: (row) => (
                <div className="column-action">
                    <UncontrolledDropdown>
                        <DropdownToggle tag="div" className="btn btn-sm">
                            <MoreVertical
                                size={14}
                                className="cursor-pointer"
                            />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem
                                tag={Link}
                                className="w-100"
                                to={`/contacts/employee/view/${row._id}`}
                            // onClick={() => store.dispatch(getUser(row._id))}
                            >
                                <FileText size={14} className="me-50" />
                                <span className="align-middle">Details</span>
                            </DropdownItem>

                            <DropdownItem
                                tag="a"
                                href="/"
                                className="w-100"
                                onClick={(e) => {
                                    e.preventDefault()
                                    // store.dispatch(deleteUser(row._id))
                                    setDeleteModal({
                                        id: row._id,
                                        show: true
                                    })
                                }}
                            >
                                <Trash2 size={14} className="me-50" />
                                <span className="align-middle">Delete</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            )
        }
    ]

    return {
        columns
    }
}

export default useColumns
