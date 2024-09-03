// ** React Imports
import React from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getUser } from '../store'

// ** Icons Imports
import { MoreVertical } from 'react-feather'

// icons import from react-icon

import { BiPhoneCall } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'
import { BsChatLeftTextFill } from 'react-icons/bs'
// import Note
import Note from './Note'

// ** Reactstrap Imports
import {
    Badge,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'

// ** Renders Client Columns
const useColumns = ({ setDeleteModal }, { toggle }) => {
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

        if (row?.photo?.length) {
            return (
                <Link
                    to={`/contacts/client/view/${row._id}`}
                    onClick={() => store.dispatch(getUser(row.id))}
                >
                    <Avatar
                        className="me-1"
                        img={row?.photo}
                        width="32"
                        height="32"
                    />
                </Link>
            )
        } else {
            return (
                <Link
                    to={`/contacts/client/view/${row._id}`}
                    onClick={() => store.dispatch(getUser(row.id))}
                >
                    <Avatar
                        color={color || 'primary'}
                        className="me-1"
                        content={row.fullName || 'N A'}
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

    // const onDelete = async (id) => {
    //     const result = await confirm('Are you sure?', {
    //         closeOnOverlayClick: true,
    //         classNames: 'custom_confirm_box'
    //     })
    //     if (result) {
    //         store.dispatch(deleteClientContact(id))
    //         return
    //     }
    // }

    function PrintAddress({ address }) {
        let fullAddress = ''

        if (!address) {
            return <></>
        }

        const reorderedAddress = {
            city: null,
            state: null,
            country: null,
            street: null,
            zipCode: null
        }
        const newAddressData = Object.assign(reorderedAddress, address)
        const addressValues = Object.values(newAddressData)
        const displayableAddress = addressValues.slice(0, 3)

        fullAddress = displayableAddress
            .filter((x) => typeof x === 'string' && x.length > 0)
            .join(', ')

        return <>{fullAddress}</>
    }

    const columns = [
        {
            name: 'Client',
            sortable: true,
            minWidth: '240px',
            sortField: 'fullName',
            selector: (row) => row.fullName,
            cell: (row) => (
                <div className="d-flex justify-content-left align-items-center">
                    {renderClient(row)}
                    <div className="d-flex flex-column">
                        <Link
                            to={`/contacts/client/view/${row._id}`}
                            className="user_name text-truncate text-body"
                            onClick={() => store.dispatch(getUser(row.id))}
                        >
                            <span className="fw-bolder">{row.fullName}</span>
                        </Link>
                        <small className="text-truncate text-muted mb-0">
                            {row.email}
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
            name: 'Position',
            sortable: true,
            width: '130px',
            sortField: 'position',
            selector: (row) => row.position,
            cell: (row) => <span>{row.position}</span>
        },
        {
            name: 'Company',
            sortable: true,
            minWidth: '180px',
            sortField: 'company',
            selector: (row) => row.company,
            cell: (row) => <span>{row.company}</span>
        },
        {
            name: 'Type',
            width: '110px',
            sortable: true,
            sortField: 'type',
            selector: (row) => row.type,
            cell: (row) => <span className="text-capitalize">{row.type}</span>
        },

        {
            name: 'Address',
            sortable: true,
            minWidth: '172px',
            sortField: 'address',
            selector: (row) => row?.address,
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
            cell: (row) => <span>{row.phone}</span>
        },
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
            selector: (row) => row.note,
            cell: (row) => (
                <Note toggle={toggle} note={row?.note} id={row._id} />
            )
            // <Eye />
        },
        {
            name: 'Tag',
            width: '80px',
            // center: true,
            selector: (row) => row.tags,
            cell: (row) =>
                row?.tags &&
                row?.tags?.map((x, i) => (
                    <Badge key={i + 1} pill color="light-primary">
                        {x}
                    </Badge>
                ))
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
                            {/* <DropdownItem
                                tag={Link}
                                className="w-100"
                                to={`/contacts/client/view/${row._id}`}
                                onClick={() => store.dispatch(getUser(row.id))}
                            >
                                <FileText size={14} className="me-50" />
                                <span className="align-middle">Details</span>
                            </DropdownItem> */}
                            {/* 
                            <DropdownItem
                                tag="span"
                                // href="/"
                                className="w-100"
                                onClick={(e) => {
                                    // e.preventDefault()
                                    // onDelete(row._id)
                                    setDeleteModal({
                                        id: row._id,
                                        show: true
                                    })
                                }}
                            // onClick={(e) => {
                            //     e.preventDefault()
                            //     store.dispatch(deleteClientContact(row._id))
                            // }}
                            >
                                <Trash2 size={14} className="me-50" />
                                <span className="align-middle">Delete</span>
                            </DropdownItem> */}
                            <DropdownItem
                                tag="span"
                                // href="/"
                                className="w-100"
                                // onClick={(e) => {
                                //     // e.preventDefault()
                                //     // onDelete(row._id)
                                //     setDeleteModal({
                                //         id: row._id,
                                //         show: true
                                //     })
                                // }}
                                // onClick={(e) => {
                                //     e.preventDefault()
                                //     store.dispatch(deleteClientContact(row._id))
                                // }}
                            >
                                <BiPhoneCall size={14} className="me-50" />
                                <span className="align-middle">Call</span>
                            </DropdownItem>
                            <DropdownItem
                                tag="span"
                                // href="/"
                                className="w-100"
                                // onClick={(e) => {
                                //     // e.preventDefault()
                                //     // onDelete(row._id)
                                //     setDeleteModal({
                                //         id: row._id,
                                //         show: true
                                //     })
                                // }}
                                // onClick={(e) => {
                                //     e.preventDefault()
                                //     store.dispatch(deleteClientContact(row._id))
                                // }}
                            >
                                <AiOutlineMail size={14} className="me-50" />
                                <span className="align-middle">Email</span>
                            </DropdownItem>
                            <DropdownItem
                                tag="span"
                                // href="/"
                                className="w-100"
                                // onClick={(e) => {
                                //     // e.preventDefault()
                                //     // onDelete(row._id)
                                //     setDeleteModal({
                                //         id: row._id,
                                //         show: true
                                //     })
                                // }}
                                // onClick={(e) => {
                                //     e.preventDefault()
                                //     store.dispatch(deleteClientContact(row._id))
                                // }}
                            >
                                <BsChatLeftTextFill
                                    size={14}
                                    className="me-50"
                                />
                                <span className="align-middle">Text</span>
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
