// ** React Imports
import { Fragment, useState } from 'react'
// ** Custom Components
import { AiOutlinePlus } from 'react-icons/ai'
// ** User List Component
import DataTable from 'react-data-table-component'
// ** Reactstrap Imports
import { Button, Modal, ModalHeader, Row, Col, ModalBody, ModalFooter,FormGroup,Label,Input } from 'reactstrap'
// ** Styles
// import '@styles/react/apps/app-users.scss'
import '@styles/react/apps/app-kanban.scss'
import Card from './Card'
import Modaldata from './Modaldata'
const Programs = () => {
    const carddata = [{ title: "Teakwondo", date: "01/01/23", time: "03:09", totalrank: "12", type: "By Stripe", rank: "21" }, { title: "Little Tiger", date: "01/01/23", time: "03:09", totalrank: "12", type: "By Stripe", rank: "21" }, { title: "Royal Tiger", date: "01/01/23", time: "03:09", totalrank: "12", type: "By Stripe", rank: "21" }, { title: "Test", date: "01/01/23", time: "03:09", totalrank: "12", type: "By Stripe", rank: "21" }]
    const teakwondo = [
        {
            id: 1,
            name: 'Beetlejuice',
            plan: 'Teakwondo',
            role: 'editor',
            billing: 'auto-debit',
            status: 'active',
            action: '-',

        },
        {
            id: 2,
            name: 'Beetlejuice',
            plan: 'Teakwondo',
            role: 'editor',
            billing: 'auto-debit',
            status: 'active',
            action: '-',
        },
        {
            id: 3,
            name: 'Beetlejuice',
            plan: 'Teakwondo',
            role: 'editor',
            billing: 'auto-debit',
            status: 'active',
            action: '-',
        },



    ]
    const columns = [
        {
            name: 'NAME',
            selector: row => row.name,
        },
        {
            name: 'ROLE',
            selector: row => row.role,
        },
        {
            name: 'PLAN',
            selector: row => row.plan,
        },
        {
            name: 'BILLING',
            selector: row => row.billing,
        },
        {
            name: 'STATUS',
            selector: row => row.status,
        },
        {
            name: 'ACTION',
            selector: row => row.action,
        },

    ]

    const [activecard, setActivecard] = useState("")
    const [tabledata, setTabledata] = useState([])
    const [itemmodal, setItemmodal] = useState(false)
    const toggleitemmodal = () => setItemmodal(!itemmodal)
    const [additemmodal, setAdditemmodal] = useState(false)
    const toggleadditemmodal = () => setAdditemmodal(!additemmodal)
    return (
        <>
            <div>
                <Modal isOpen={itemmodal} toggle={toggleitemmodal} size="lg">
                    <ModalHeader toggle={toggleitemmodal}>Create Program</ModalHeader>
                    <ModalBody>
                        <Modaldata />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="btn btn-outline-danger" onClick={toggleitemmodal}>
                            Cancle
                        </Button>{' '}
                        <Button color="btn btn-primary" onClick={toggleitemmodal}>
                            Save
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={additemmodal} toggle={toggleadditemmodal} size="lg">
                    <ModalHeader toggle={toggleadditemmodal}>Create Stripe</ModalHeader>
                    <ModalBody>
                        <form className="row g-3 py-4">
                            <div className="col-md-6">
                                <label for="candidatename" className="form-label">Candidate Name</label>
                                <select id="candidatename" className="form-select">
                                    <option >Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label for="stripname" className="form-label">Stripe Name</label>
                                <input type="text" className="form-control" id="stripname" />
                            </div>
                            <div className="col-md-6">
                                <label for="striporder" className="form-label">Stripe Order</label>
                                <input type="text" className="form-control" id="striporder" />
                            </div>
                            <div className="col-md-6">
                                <FormGroup row>
                                    <Label
                                        for="exampleFile"

                                    >
                                        Upload Stripe Image
                                    </Label>
                                    <Col >
                                        <Input
                                            id="exampleFile"
                                            name="file"
                                            type="file"
                                        />
                                        {/* <FormText>
              This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.
            </FormText> */}
                                    </Col>
                                </FormGroup>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>

                        <Button color="btn btn-primary" onClick={toggleadditemmodal}>
                            Create
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
            <Fragment>

                <div className="app-user-list">
                    <Row>
                        {carddata?.map((item, i) => (
                            <>
                                <Col lg="3" sm="6"  >
                                    <div className={`card border${activecard === item.title ? " border border-primary" : ""}`} style={{ width: '22rem' }} onClick={() => { setActivecard(item.title); item.title === "Teakwondo" ? setTabledata(teakwondo) : setTabledata([]) }}>
                                        <Card togglemodal={toggleitemmodal} title={item.title} subtitle1={item.date} subtitle2={item.time} des1={item.rank} des2={item.type} />
                                    </div>
                                </Col>

                            </>))}
                        <Col lg="3" sm="6">
                            <div onClick={toggleadditemmodal} class="card" style={{ width: '22rem' }}>
                                <div class="card-body text-center p-4">
                                    <AiOutlinePlus size={45} />
                                </div>
                            </div>
                        </Col>
                        <Col xl="12" className="p-2"><h4>Total Users with there role</h4><p>Find all your company adminstrator accounts and there roles</p></Col>
                    </Row>

                    <DataTable
                        columns={columns}
                        data={tabledata}
                        pagination
                    />
                </div>
            </Fragment>
        </>
    )
}

export default Programs
