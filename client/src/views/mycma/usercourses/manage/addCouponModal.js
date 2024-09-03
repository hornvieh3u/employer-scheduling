// ** React Imports
import { useState } from 'react';

import {
  Row,
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Col
} from 'reactstrap';

// ** Third Party Components
import Flatpickr from 'react-flatpickr';

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss';

const AddCouponModal = (props) => {
  // ** Props
  const { centeredModal, setCenteredModal } = props;

  // ** State
  const [picker, setPicker] = useState(new Date());

  return (
    <>
      <Modal
        isOpen={centeredModal}
        toggle={() => setCenteredModal(!centeredModal)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Add New Coupon</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="6">
              <div className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Coupon Name
                </Label>
                <Input type="text" name="name" id="nameMulti" placeholder="Coupon Name" />
              </div>
            </Col>
            <Col md="6">
              <div className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Start Date
                </Label>
                <Flatpickr
                  className="form-control"
                  value={picker}
                  onChange={(date) => setPicker(date)}
                  id="default-picker"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <div className="mb-1">
                <Label className="form-label" for="nameMulti">
                  End Date
                </Label>
                <Flatpickr
                  className="form-control"
                  value={picker}
                  onChange={(date) => setPicker(date)}
                  id="default-picker"
                />
              </div>
            </Col>
            <Col md="6">
              <div className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Campaign Name
                </Label>
                <Input type="text" name="name" id="nameMulti" placeholder="Product Name" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <div className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Coupon Code
                </Label>
                <Input type="text" name="name" id="nameMulti" placeholder="Product Name" />
              </div>
            </Col>
            <Col md="6">
              <div className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Percentage
                </Label>
                <Input type="text" name="name" id="nameMulti" placeholder="Product Name" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <div className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Product Type
                </Label>
                <Input type="text" name="name" id="nameMulti" placeholder="Product Name" />
              </div>
            </Col>
            <Col md="6">
              <div className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Status
                </Label>
                <Input type="text" name="name" id="nameMulti" placeholder="Product Name" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <div className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Minimum Amount
                </Label>
                <Input type="text" name="name" id="nameMulti" placeholder="Product Name" />
              </div>
            </Col>
            <Col md="6">
              <div className="mb-1">
                <Label className="form-label" for="nameMulti">
                  Coupon Banner Image
                </Label>
                <Input type="file" id="image" name="fileInput" />
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setCenteredModal(!centeredModal)}>
            Save
          </Button>
          <Button color="danger" outline onClick={() => setCenteredModal(!centeredModal)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddCouponModal;
