// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Component
import { Eye } from 'react-feather'

// import Note
import Note from './Note'

// ** Store & Actions
import { store } from '@store/store'
import { getUser, deleteUser } from '../store'

// ** Icons Imports
import { MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import {
    Badge,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'

const useColumns = ({ setDeleteModal }) => {
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
                <Link
                    to={`/contacts/relationship/view/${row._id}`}
                    onClick={() => store.dispatch(getUser(row._id))}
                >
                    <Avatar
                        className="me-1"
                        img={row.photo}
                        width="32"
                        height="32"
                    />
                </Link>

            )
        } else {
            return (
                <Link
                    to={`/contacts/relationship/view/${row._id}`}
                    onClick={() => store.dispatch(getUser(row._id))}
                >
                    <Avatar
                        color={color || 'primary'}
                        className="me-1"
                        content={row.fullName || 'John Doe'}
                        initials
                    />
                </Link>
            )
        }
    }

    const statusObj = {
        pending: 'light-warning',
        active: 'light-success',
        inactive: 'light-secondary'
    }


    function PrintAddress({ address }) {

        let fullAddress = ''

        if (!address) {
            return <></>
        }

        const reorderedAddress = {
            'city': null,
            'state': null,
            'country': null,
            'street': null,
            'zipCode': null,
        }
        const newAddressData = Object.assign(reorderedAddress, address)
        const addressValues = Object.values(newAddressData)
        const displayableAddress = (addressValues).slice(0, 3)

        fullAddress = displayableAddress.filter(x => typeof x === 'string' && x.length > 0).join(', ')

        return <>{fullAddress}</>
    }


    const columns = [
        {
            name: 'Full Name',
            sortable: true,
            minWidth: '240px',
            sortField: 'fullName',
            selector: (row) => row?.fullName,
            cell: (row) => (
                <div className="d-flex justify-content-left align-items-center">
                    {renderClient(row)}
                    <div className="d-flex flex-column">
                        <Link
                            to={`/contacts/relationship/view/${row._id}`}
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
            name: 'Type',
            sortable: true,
            width: '130px',
            sortField: 'role',
            selector: (row) => row?.type,
            cell: (row) => <span>{row?.type}</span>
        },

        {
            name: 'Position',
            sortable: true,
            width: '130px',
            sortField: 'role',
            selector: (row) => row?.position,
            cell: (row) => <span>{row?.position}</span>
        },
        {
            name: 'Address',
            sortable: true,
            minWidth: '172px',
            sortField: 'role',
            selector: (row) => row.country,
            cell: (row) => {
                return (
                    <>
                        <PrintAddress address={row?.address} />
                    </>
                )

            }
        },
        {
            name: 'Phone',
            width: '150px',
            selector: (row) => row.phone,
            cell: (row) => <span>{row?.phone}</span>
        },
        // {
        //     name: 'Outlet',
        //     width: '150px',
        //     selector: (row) => row.contact,
        //     cell: (row) => <span>-</span>
        // },
        // {
        //     name: 'Salary',
        //     width: '150px',
        //     selector: (row) => row?.salary,
        //     cell: (row) => <span>{row?.salary}</span>
        // },
        {
            name: 'Rating',
            width: '100px',
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
            width: '80px',
            center: true,
            selector: (row) => row.billing,
            cell: (row) => <Note note={row?.note} id={row._id} />
            // <Eye />
        },
        {
            name: 'Tag',
            width: '80px',
            // center: true,
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
                                to={`/contacts/relationship/view/${row._id}`}
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
