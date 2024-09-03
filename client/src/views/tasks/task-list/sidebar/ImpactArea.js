// ** React Imports
import { Fragment } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// ** Third Party Components
import { Hexagon, MoreHorizontal, Plus, Edit, Trash } from 'react-feather';

// ** Reactstrap Imports
import {
  Button,
  ListGroup,
  ListGroupItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormFeedback
} from 'reactstrap';

const ImpactArea = () => {
  // ** States
  const [style, setStyle] = useState({ display: 'none' });
  const [impactAreaModal, setImpactAreaModal] = useState(false);

  return (
    <Fragment>
      <div className="mb-1">
        <Button color="primary" block outline onClick={() => setImpactAreaModal(!impactAreaModal)}>
          Create New Area
        </Button>
        <div className="vertically-centered-modal">
          <Modal
            isOpen={impactAreaModal}
            toggle={() => setImpactAreaModal(!impactAreaModal)}
            className="modal-dialog-centered"
          >
            <ModalHeader toggle={() => setImpactAreaModal(!impactAreaModal)}>
              Create A New Impact Area
            </ModalHeader>
            <ModalBody>
              {/* Valid */}
              <div>
                <Label className="form-label" for="validState">
                  Give a title
                </Label>
                <Input
                  type="text"
                  id="validState"
                  name="validState"
                  placeholder="Health, Finance etc."
                  valid
                />
                <FormFeedback valid>Sweet! That name is available.</FormFeedback>
              </div>

              {/* Invalid */}
              <div className="mt-2">
                <Label className="form-label" for="invalidState">
                  Invalid Name
                </Label>
                <Input type="text" id="invalidState" name="invalidState" invalid />
                <FormFeedback>Oh no! That name is already taken.</FormFeedback>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => setImpactAreaModal(!impactAreaModal)}>
                Create
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>

      <ListGroup tag="div" className="list-group-filters ms-0 me-0">
        <ListGroupItem
          className="ps-0 pe-0"
          action
          tag={Link}
          to={'/goals'}
          // active={
          //     params.filter === '' &&
          //     params.tag === ''
          // }
          onMouseEnter={(e) => {
            setStyle({
              display: 'block'
            });
          }}
          onMouseLeave={(e) => {
            setStyle({
              display: 'none'
            });
          }}
        >
          <div className="d-flex justify-content-between align-middle">
            <div>
              <Hexagon className="me-75" size={18} />
              <span>Health</span>
            </div>
            <div style={style}>
              <div className="d-flex align-items-center">
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="icon-btn hide-arrow m-0 p-0"
                    color="transparent"
                    size="sm"
                    caret
                  >
                    <MoreHorizontal size={18} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      <Edit className="me-50" size={15} />{' '}
                      <span className="align-middle">Edit</span>
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      <Trash className="me-50" size={15} />{' '}
                      <span className="align-middle">Delete</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <Plus
                  size={18}
                  style={{
                    marginLeft: 5
                  }}
                />
              </div>
            </div>
          </div>
        </ListGroupItem>
        <ListGroupItem
          className="ps-0 pe-0"
          action
          tag={Link}
          to={'/goals'}
          onMouseEnter={(e) => {
            setStyle({
              display: 'block'
            });
          }}
          onMouseLeave={(e) => {
            setStyle({
              display: 'none'
            });
          }}
        >
          <div className="d-flex justify-content-between align-middle">
            <div>
              <Hexagon className="me-75" size={18} />
              <span>Education</span>
            </div>
            <div style={style}>
              <div className="d-flex align-items-center">
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="icon-btn hide-arrow m-0 p-0"
                    color="transparent"
                    size="sm"
                    caret
                  >
                    <MoreHorizontal size={18} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      <Edit className="me-50" size={15} />{' '}
                      <span className="align-middle">Edit</span>
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      <Trash className="me-50" size={15} />{' '}
                      <span className="align-middle">Delete</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <Plus
                  size={18}
                  style={{
                    marginLeft: 5
                  }}
                />
              </div>
            </div>
          </div>
        </ListGroupItem>
      </ListGroup>
    </Fragment>
  );
};

export default ImpactArea;
