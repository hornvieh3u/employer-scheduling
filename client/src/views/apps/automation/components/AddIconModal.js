import React, { useState } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import AddAutomationModal from './AddAutomationModal';
import { GrAddCircle } from 'react-icons/gr';
import { Plus } from 'react-feather';

const AddIconModal = (props) => {
  const [open, setOpen] = useState(false);
  // const classes = useStyles()

  const [viewTemplate, setViewTemplate] = useState(null);
  const [mailsTODisplay, setMailsTODisplay] = useState([]);
  const { categoriesEmail } = props;
  const { setEditOrAddOrListTemplate, subFolderActive } = props;

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div width="20" height="20" className="d-flex justify-content-center align-items-center">
        <Plus
          onClick={() => {
            setOpen(!open);
          }}
        />
      </div>
      <Modal isOpen={open} toggle={toggleModal} centered={true} style={{ zIndex: 1 }}>
        <ModalHeader toggle={toggleModal}>Add Automation</ModalHeader>
        <ModalBody>
          <div className="">
            <div>
              <Row>
                <Col sm="12" lg="12" md="12">
                  <div className="mat-dialog-content add-section">
                    <div className="">
                      <div>
                        <Row>
                          <Col sm="12" lg="12" md="12">
                            <div className="mat-dialog-content add-section">
                              <div className="action-list px-1 enable ng-star-inserted">
                                <ul
                                  style={{
                                    listStyle: 'none',
                                    padding: '5px 0',
                                    margin: 0,
                                    display: 'flex',
                                    flexDirection: 'column'
                                  }}
                                >
                                  <li
                                    style={{
                                      padding: '15px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      margin: '5px 2px 10px',
                                      cursor: 'pointer',
                                      border: '1px solid #dee2e6',
                                      borderRadius: '4px',
                                      background: 'hsla(0,0%,93.3%,.2)',
                                      '&:hover': {
                                        background: '#f0f0f0'
                                      }
                                    }}
                                  >
                                    <AddAutomationModal
                                      subFolderActive={subFolderActive}
                                      setViewTemplate={setViewTemplate}
                                      template={viewTemplate}
                                      type={'text'}
                                      FolderList={categoriesEmail}
                                      setEditOrAddOrListTemplate={setEditOrAddOrListTemplate}
                                      setMailsTODisplay={setMailsTODisplay}
                                      parentCallback={() => {
                                        setOpen(!open);
                                      }}
                                    />
                                  </li>
                                  <li
                                    style={{
                                      padding: '15px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      margin: '5px 2px 10px',
                                      cursor: 'pointer',
                                      border: '1px solid #dee2e6',
                                      borderRadius: '4px',
                                      background: 'hsla(0,0%,93.3%,.2)',
                                      '&:hover': {
                                        background: '#f0f0f0'
                                      }
                                    }}
                                  >
                                    <AddAutomationModal
                                      subFolderActive={subFolderActive}
                                      setViewTemplate={setViewTemplate}
                                      template={viewTemplate}
                                      type={'email'}
                                      FolderList={categoriesEmail}
                                      setEditOrAddOrListTemplate={setEditOrAddOrListTemplate}
                                      setMailsTODisplay={setMailsTODisplay}
                                      parentCallback={() => {
                                        setOpen(!open);
                                      }}
                                    />
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getAllSmartList: state.EmailMarketing.getAllSmartList,
    categoriesEmail: state.EmailMarketing.categoriesEmail
  };
};

export default connect(mapStateToProps, null)(AddIconModal);
