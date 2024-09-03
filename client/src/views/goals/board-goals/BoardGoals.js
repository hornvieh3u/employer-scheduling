// ** React Imports
import { useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Blank Avatar Image
import blankAvatar from '@src/assets/images/avatars/avatar-blank.png'

// ** Third Party Components
import { ReactSortable } from 'react-sortablejs'
import { Sortable, MultiDrag } from 'sortablejs'

// ** Reactstrap Imports
import { Row, Col, ListGroupItem, Badge } from 'reactstrap'

const array = {
    list1: [
        {
            id: '1',
            title: 'This is a test goal title',
            startDate: '10/12/2022',
            endDate: '20/12/2022',
            Tags: ['tag1', 'tag2', 'tag3'],
            name: 'Mary S. Navarre',
            content:
                'Chupa chups tiramisu apple pie biscuit sweet roll bonbon macaroon toffee icing.'
        },
        {
            id: '2',

            title: 'This is a test goal title',
            startDate: '10/12/2022',
            endDate: '20/12/2022',
            Tags: ['tag1', 'tag2', 'tag3'],
            name: 'Mary S. Navarre',
            content:
                'Chupa chups tiramisu apple pie biscuit sweet roll bonbon macaroon toffee icing.'
        },
        {
            id: '3',

            title: 'This is a test goal title',
            startDate: '10/12/2022',
            endDate: '20/12/2022',
            Tags: ['tag1', 'tag2', 'tag3'],
            name: 'Mary S. Navarre',
            content:
                'Chupa chups tiramisu apple pie biscuit sweet roll bonbon macaroon toffee icing.'
        },
        {
            id: '4',

            title: 'This is a test goal title',
            startDate: '10/12/2022',
            endDate: '20/12/2022',
            Tags: ['tag1', 'tag2', 'tag3'],
            name: 'Mary S. Navarre',
            content:
                'Chupa chups tiramisu apple pie biscuit sweet roll bonbon macaroon toffee icing.'
        }
    ],
    list2: [
        {
            id: '1',

            title: 'This is a test goal title',
            startDate: '10/12/2022',
            endDate: '20/12/2022',
            Tags: ['tag1', 'tag2', 'tag3'],
            name: 'Mary S. Navarre',
            content:
                'Chupa chups tiramisu apple pie biscuit sweet roll bonbon macaroon toffee icing.'
        },
        {
            id: '2',

            title: 'This is a test goal title',
            startDate: '10/12/2022',
            endDate: '20/12/2022',
            Tags: ['tag1', 'tag2', 'tag3'],
            name: 'Mary S. Navarre',
            content:
                'Chupa chups tiramisu apple pie biscuit sweet roll bonbon macaroon toffee icing.'
        },
        {
            id: '3',

            title: 'This is a test goal title',
            startDate: '10/12/2022',
            endDate: '20/12/2022',
            Tags: ['tag1', 'tag2', 'tag3'],
            name: 'Mary S. Navarre',
            content:
                'Chupa chups tiramisu apple pie biscuit sweet roll bonbon macaroon toffee icing.'
        },
        {
            id: '4',

            title: 'This is a test goal title',
            startDate: '10/12/2022',
            endDate: '20/12/2022',
            Tags: ['tag1', 'tag2', 'tag3'],
            name: 'Mary S. Navarre',
            content:
                'Chupa chups tiramisu apple pie biscuit sweet roll bonbon macaroon toffee icing.'
        }
    ]
}

Sortable.mount(new MultiDrag())

const BoardGoals = () => {
    // ** States
    const [listArr1, setListArr1] = useState(array.list1)
    const [listArr2, setListArr2] = useState(array.list2)

    return (
        <div className="m-1">
            <Row>
                <Col md="6" sm="12">
                    <h4 className="my-1">Ongoing</h4>
                    <ReactSortable
                        tag="ul"
                        multiDrag
                        list={listArr1}
                        setList={setListArr1}
                        group="shared-multi-drag-group"
                        className="list-group list-group-flush sortable"
                    >
                        {listArr1.map((item) => {
                            return (
                                <ListGroupItem
                                    className="draggable"
                                    style={{ marginBottom: '5px' }}
                                    key={item.id}
                                >
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <h5 className="mt-0">
                                                {item.title}
                                            </h5>
                                            <span>{item.content}</span>
                                            <div className="d-flex justify-content-between mt-1">
                                                <div className="d-flex">
                                                    <div className="d-flex flex-column me-3">
                                                        <span className="fw-bold">
                                                            Start Date
                                                        </span>
                                                        <span>
                                                            {item.startDate}
                                                        </span>
                                                    </div>
                                                    <div className="d-flex flex-column">
                                                        <span className="fw-bold">
                                                            End Date
                                                        </span>
                                                        <span>
                                                            {item.endDate}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="d-flex align-items-end">
                                                    <Badge
                                                        className="text-capitalize ms-1"
                                                        color="light-success"
                                                        pill
                                                    >
                                                        low
                                                    </Badge>
                                                    <Badge
                                                        className="text-capitalize ms-1"
                                                        color="light-warning"
                                                        pill
                                                    >
                                                        medium
                                                    </Badge>
                                                    <Badge
                                                        className="text-capitalize ms-1"
                                                        color="light-danger"
                                                        pill
                                                    >
                                                        high
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ListGroupItem>
                            )
                        })}
                    </ReactSortable>
                </Col>
                <Col md="6" sm="12">
                    <h4 className="my-1">Completed</h4>
                    <ReactSortable
                        tag="ul"
                        list={listArr2}
                        setList={setListArr2}
                        group="shared-multi-drag-group"
                        className="list-group list-group-flush sortable"
                    >
                        {listArr2.map((item) => {
                            return (
                                <ListGroupItem
                                    className="draggable"
                                    style={{ marginBottom: '5px' }}
                                    key={item.id}
                                >
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <h5 className="mt-0">
                                                {item.title}
                                            </h5>
                                            {item.content}
                                            <div className="d-flex justify-content-between mt-1">
                                                <div className="d-flex">
                                                    <div className="d-flex flex-column me-3">
                                                        <span className="fw-bold">
                                                            Start Date
                                                        </span>
                                                        <span>
                                                            {item.startDate}
                                                        </span>
                                                    </div>
                                                    <div className="d-flex flex-column">
                                                        <span className="fw-bold">
                                                            End Date
                                                        </span>
                                                        <span>
                                                            {item.endDate}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="d-flex align-items-end">
                                                    <Badge
                                                        className="text-capitalize ms-1"
                                                        color="light-success"
                                                        pill
                                                    >
                                                        low
                                                    </Badge>
                                                    <Badge
                                                        className="text-capitalize ms-1"
                                                        color="light-warning"
                                                        pill
                                                    >
                                                        medium
                                                    </Badge>
                                                    <Badge
                                                        className="text-capitalize ms-1"
                                                        color="light-danger"
                                                        pill
                                                    >
                                                        high
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ListGroupItem>
                            )
                        })}
                    </ReactSortable>
                </Col>
            </Row>
            <div className="mb-3"></div>
        </div>
    )
}

export default BoardGoals
