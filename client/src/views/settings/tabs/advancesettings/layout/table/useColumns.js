const useColumns = ({ setDeleteModal }) => {

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
                    <div className="d-flex flex-column">
                        <span className="fw-bolder">{row?.fullName}</span>
                    </div>
                </div>
            )
        },
        {
            name: 'Email',
            width: '120px',
            sortable: true,
            sortField: 'status',
            center:true,
            selector: (row) => row.email,
            cell: (row) => (
                <span className="fw-bolder">{row?.email}</span>
            )
        },
        {
            name: 'Address',
            sortable: true,
            minWidth: '172px',
            sortField: 'role',
            selector: (row) => row.country,
            cell: (row) => (
                <span>
                    {row?.address?.street} {row?.address?.state}{' '}
                    {row?.address?.city} {row?.address?.country}
                </span>
            )
        },
        {
            name: 'Phone',
            width: '150px',
            center:true,
            selector: (row) => row.phone,
            cell: (row) => <span>{row?.phone}</span>
        }
    ]

    return {
        columns
    }
}

export default useColumns
