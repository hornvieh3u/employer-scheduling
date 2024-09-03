import { Button } from "reactstrap"

// ** Table Zero Config Column

export const basicColumns = [
    {
        name: 'Date & Time',
        sortable: true,
        selector: row => row.formId

    },
    {
        name: 'Full Name',
        sortable: true,
        selector: row => row.formId

    },
    {
        name: 'Status',
        sortable: true,
        selector: row => row.type
    },
    {
        name: 'Notes',
        sortable: true,
        selector: row => <>
            {row.created} nhhhhhhhhhhhhhhhhhhhhhhh
        </>
    },
]