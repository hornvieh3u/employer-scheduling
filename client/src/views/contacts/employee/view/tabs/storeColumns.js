// ** Reactstrap Imports
import { Button } from 'reactstrap'

// ** Third Party Components
import { Download, Trash, Edit, Send } from 'react-feather'

// ** Table columns
export const storeColumns = [
    {
        name: 'Address',
        sortable: true,
        minWidth: '200px',
        sortField: 'title',
        selector: (row) => row.total,
        cell: (row) => <span>2550 Rainbow Drive, Ohio</span>
    },
    {
        name: 'Phone',
        sortable: true,
        minWidth: '150px',
        sortField: 'type',
        selector: (row) => row.phone,
        cell: (row) => <span>330-806-1981</span>
    },
    {
        name: 'Lease Start',
        sortable: true,
        width: '160px',
        sortField: 'type',
        selector: (row) => row.phone,
        cell: (row) => <span>10/12/2018</span>
    },
    {
        name: 'Lease End',
        sortable: true,
        width: '160px',
        sortField: 'type',
        selector: (row) => row.phone,
        cell: (row) => <span>10/12/2022</span>
    },
    {
        name: 'Lease Doc',
        width: '140px',
        center: true,
        cell: (row) => (
            <div className="column-action d-flex align-items-center">
                <Button.Ripple
                    className="btn-icon rounded-circle"
                    outline
                    color="primary"
                >
                    <Download size={16} />
                </Button.Ripple>
            </div>
        )
    },
    {
        name: 'Action',
        minWidth: '110px',
        cell: (row) => (
            <div className="column-action d-flex align-items-center">
                <Edit className="text-body cursor-pointer me-1" size={17} />
                <Trash className="text-body cursor-pointer me-1" size={17} />
                <Send className="text-body cursor-pointer" size={17} />
            </div>
        )
    }
]
