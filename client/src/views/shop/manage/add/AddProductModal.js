// ** Components
import PhysicalProductForm from './PhysicalProductForm'
import DigitalProductForm from './DigitalProductForm'
import MembershipForm from './MembershipForm'

// ** Icons import
import { AiOutlineLaptop } from 'react-icons/ai'
import { VscJersey } from 'react-icons/vsc'
import { BiPurchaseTag } from 'react-icons/bi'

import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from 'reactstrap'

const AddProductModal = (props) => {
    // ** Props
    const { centeredModal, setCenteredModal, active, toggle } = props

    return (
        <>
            <Modal
                isOpen={centeredModal}
                toggle={() => setCenteredModal(!centeredModal)}
                className="modal-dialog-centered modal-lg"
            >
                <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
                    Add New Product or Service
                </ModalHeader>
                <ModalBody>
                    <Nav className="justify-content-center" tabs>
                        <NavItem>
                            <NavLink
                                active={active === '1'}
                                onClick={() => {
                                    toggle('1')
                                }}
                            >
                                <VscJersey size={20} />
                                <span className="align-middle">
                                    Physical Product
                                </span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === '2'}
                                onClick={() => {
                                    toggle('2')
                                }}
                            >
                                <AiOutlineLaptop size={20} />
                                <span className="align-middle">
                                    Digital Product
                                </span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === '3'}
                                onClick={() => {
                                    toggle('3')
                                }}
                            >
                                <BiPurchaseTag size={20} />
                                <span className="align-middle">Membership</span>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent className="py-50" activeTab={active}>
                        <TabPane tabId="1">
                            <PhysicalProductForm />
                        </TabPane>
                        <TabPane tabId="2">
                            <DigitalProductForm />
                        </TabPane>
                        <TabPane tabId="3">
                            <MembershipForm />
                        </TabPane>
                    </TabContent>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        outline
                        onClick={() => setCenteredModal(!centeredModal)}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default AddProductModal
