// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import {
    Card,
    CardImg,
    CardTitle,
    CardBody,
    CardText,
    Button
} from 'reactstrap'

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Images
import img1 from '@src/assets/images/goals/g1.png'
import img2 from '@src/assets/images/goals/g2.png'
import img3 from '@src/assets/images/goals/g3.png'

const Template = ({ stepper, type }) => {
    // ** States
    const [rSelected, setRSelected] = useState(null)

    return (
        <Fragment>
            <div className="d-flex mt-2 bg-transparent">
                <div className="m-1">
                    <Card className="mb-3">
                        <CardImg top src={img1} alt="card-top" />
                        <CardBody>
                            <CardTitle tag="h4">List</CardTitle>
                            <CardText>
                                <small className="text-muted">
                                    Complete sub goals one by one
                                </small>
                            </CardText>
                            <Button
                                onClick={() => setRSelected(1)}
                                active={rSelected === 1}
                                color="primary"
                                block
                                outline
                            >
                                Select
                            </Button>
                        </CardBody>
                    </Card>
                </div>
                <div className="m-1">
                    <Card className="mb-3">
                        <CardImg top src={img2} alt="card-top" />
                        <CardBody>
                            <CardTitle tag="h4">Calendar</CardTitle>
                            <CardText>
                                <small className="text-muted">
                                    Mark your daily achievement
                                </small>
                            </CardText>
                            <Button
                                onClick={() => setRSelected(2)}
                                active={rSelected === 2}
                                color="primary"
                                block
                                outline
                            >
                                Select
                            </Button>
                        </CardBody>
                    </Card>
                </div>
                <div className="m-1">
                    <Card className="mb-3">
                        <CardImg top src={img3} alt="card-top" />
                        <CardBody>
                            <CardTitle tag="h4">Board</CardTitle>
                            <CardText>
                                <small className="text-muted">
                                    Drag and Drop to update your progress
                                </small>
                            </CardText>
                            <Button
                                onClick={() => setRSelected(3)}
                                active={rSelected === 3}
                                color="primary"
                                block
                                outline
                            >
                                Select
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <div className="d-flex justify-content-between">
                <Button color="primary" className="btn-prev" disabled>
                    <ArrowLeft
                        size={14}
                        className="align-middle me-sm-25 me-0"
                    ></ArrowLeft>
                    <span className="align-middle d-sm-inline-block d-none">
                        Previous
                    </span>
                </Button>
                <Button
                    color="primary"
                    className="btn-next"
                    onClick={() => stepper.next()}
                >
                    <span className="align-middle d-sm-inline-block d-none">
                        Next
                    </span>
                    <ArrowRight
                        size={14}
                        className="align-middle ms-sm-25 ms-0"
                    ></ArrowRight>
                </Button>
            </div>
        </Fragment>
    )
}

export default Template
