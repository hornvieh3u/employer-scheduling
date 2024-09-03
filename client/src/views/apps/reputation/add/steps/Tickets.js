// ** React Imports
import { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button, } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
// import { createEvent } from '../../store'
import { createEvent } from '../../../../../../src/views/calendar/event/store'
// src/views/calendar/event/add/steps/Tickets.js
// src/views/calendar/event/store/index.js
import { getUserData } from '../../../../../auth/utils'

// ** Message Imports
import useMessage from '../../../../../lib/useMessage'

const Tickets = ({ stepper, type, payload, setPayload }) => {
    // ** State
    const [ticketType, setTicketType] = useState("Paid")
    const [ticketName, setTicketName] = useState("")
    const [ticketAvailabeQuantity, setTicketAvailableQuantity] = useState(0)
    const [ticketPrice, setTicketPrice] = useState(0)

    // ** History var
    const history = useHistory()

    // ** Message Vars
    const { success, error } = useMessage()
 
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.event)

    // ** Event handlers
    const isNumeric = (str) => {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
      }

    const handleNumberChange = (value, type) => {
        if(isNumeric(value)){
            if(type === "Price") {
                setTicketPrice(parseFloat(value))
            }
            else if(type === "Quantity") {
                setTicketAvailableQuantity(parseInt(value))
            }
        }
    }

    const handleTicketTypeChange = (value) => {
        setTicketType(value)
        if(value === "Free") setTicketPrice(0)
    }

    const handleCreate = () => {
        const event = {
            ...payload,
            ticketType,
            ticketAvailabeQuantity,
            ticketPrice,
            userId: getUserData().id
        }
        dispatch(createEvent(event))
        success('New event created')
        history.push('/events')
    }

    return (
        <Fragment>
            <div className="content-header">
                <h5 className="mb-0">Tickets</h5>
                <small>Lets Create Tickets</small>
            </div>
            <Form onSubmit={(e) => e.preventDefault()}>
                <Row>
                    <Col md="12" className="mb-1 mt-1">
                        <Label className="form-label mb-1" for="eventType">
                            Ticket Type
                        </Label>
                        <div className="d-flex" onChange={(e) => handleTicketTypeChange(e.target.value)}>
                            <div className="form-check me-2">
                                <Input
                                    type="radio"
                                    id="ex1-active"
                                    name="ex1"
                                    value="Paid"
                                    defaultChecked
                                />
                                <Label
                                    className="form-check-label"
                                    for="ex1-active"
                                >
                                    Paid
                                </Label>
                            </div>
                            <div className="form-check">
                                <Input
                                    type="radio"
                                    name="ex1"
                                    id="ex1-inactive"
                                    value="Free"
                                />
                                <Label
                                    className="form-check-label"
                                    for="ex1-inactive"
                                >
                                    Free
                                </Label>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="6" className="mb-1">
                        <Label className="form-label" for="basicInput">
                            Name
                        </Label>
                        <Input
                            type="ticketName"
                            id="basicInput"
                            placeholder="Give your tickets a name ..."
                            value={ticketName}
                            onChange={(e) => setTicketName(e.target.value)}
                        />
                    </Col>
                    <Col md="6" className="mb-1">
                        <Label className="form-label" for="basicInput">
                            Available Quantity
                        </Label>
                        <Input
                            type="quantity"
                            id="basicInput"
                            placeholder="How many tickets are available?"
                            value={ticketAvailabeQuantity}
                            onChange={(e) => handleNumberChange(e.target.value, "Quantity")}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="6" className="mb-1">
                        <Label className="form-label" for="basicInput">
                            Price
                        </Label>
                        <Input
                            type="price"
                            id="basicInput"
                            placeholder="Price per ticket"
                            value={ticketPrice}
                            disabled={ticketType==="Free"}
                            onChange={(e) => handleNumberChange(e.target.value, "Price")}
                        />
                    </Col>
                    <Col md="6" className="mb-1">
                        <Label className="form-label" for="basicInput">
                            Total Income
                        </Label>
                        <Input type="quantity" id="basicInput" value={ticketAvailabeQuantity * ticketPrice} disabled />
                    </Col>
                </Row>

                <div className="d-flex justify-content-between">
                    <Button
                        color="primary"
                        className="btn-prev"
                        onClick={() => stepper.previous()}
                    >
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
                        onClick={() => handleCreate()}
                    >
                        <span className="align-middle d-sm-inline-block d-none">
                            Create
                        </span>
                        <ArrowRight
                            size={14}
                            className="align-middle ms-sm-25 ms-0"
                        ></ArrowRight>
                    </Button>
                </div>
            </Form>
        </Fragment>
    )
}

export default Tickets
