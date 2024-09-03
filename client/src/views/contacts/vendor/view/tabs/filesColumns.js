// ** Reactstrap Imports
import { UncontrolledTooltip, Button } from 'reactstrap'

// ** Third Party Components
import { Download, Trash, Edit } from 'react-feather'

// ** Table columns
export const filesColumns = [
    {
        name: 'Title',
        sortable: true,
        minWidth: '200px',
        sortField: 'title',
        selector: (row) => row.total,
        cell: (row) => <span>File Name</span>
    },
    {
        name: 'Type',
        sortable: true,
        minWidth: '100px',
        sortField: 'type',
        selector: (row) => row.total,
        cell: (row) => <span>PDF</span>
    },
    {
        name: 'Download',
        minWidth: '90px',
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
                <Trash className="text-body cursor-pointer" size={17} />
            </div>
        )
    }
]
