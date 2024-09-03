import React, { useContext, useState, useRef, useEffect } from 'react';
import { b64toBlob } from './../../../helpers/loadPdfHelper';
import {
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
  Button,
  ModalFooter
} from 'reactstrap';

import {
  useAddSignatureAndInitial,
  useEditSignatureAndInitial,
  useUploadSignature
} from '../../../../../requests/documents/recipient-doc';
import { DocumentContext } from '../../../../../utility/context/Document';
import DrawSigniture from './addSignTypes/DrawSigniture';
import SelectStyle from './addSignTypes/SelectStyle';
import Upload from './addSignTypes/Upload';
import { Check, X } from 'react-feather';

export default function AddSignatureModal({ toggle, open, item, type }) {
  // ** States
  const [form, setForm] = useState({
    id: 0,
    fullName: '',
    initials: { initial: '' }
  });
  const [selectedTab, setSelectedTab] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [tabs, setTabs] = useState([
    {
      tabId: 1,
      isActive: true,
      name: 'Select Styles'
    },
    {
      tabId: 2,
      isActive: false,
      name: 'Draw'
    },
    {
      tabId: 3,
      isActive: false,
      name: 'Upload'
    }
  ]);
  // ** Context
  const { hashcode, recipients, signatures, setSignatures, stamps, signatureId, setSignatureId } =
    useContext(DocumentContext);

  //Refs
  const signatureRef = useRef();
  const initialRef = useRef();
  const drawingRef = useRef();
  const uploadRef = useRef();
  // ** Functions
  const handleChangeForm = (e) => {
    if (e.target.name === 'initial') {
      setForm({
        ...form,
        initials: { ...form.initials, initial: e.target.value }
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };
  const handleTabChange = (id) => {
    setSelectedTab(id);
  };

  const handleAddSignature = () => {
    const recipient = recipients.find((x) => x.hashCode === hashcode);
    if (selectedTab === 1) {
      //save signature
      const canvasSignature = signatureRef.current;
      canvasSignature.toBlob((blob) => {
        let file = new File([blob], 'signature.png', {
          type: 'image/png'
        });
        //upload signature
        const formData = new FormData();
        formData.append('file', file);
        useUploadSignature(formData).then((res) => {
          if (res.success) {
            const signUrl = res.url;
            //save initial

            const canvasInitial = initialRef.current;

            canvasInitial.toBlob((blob) => {
              const file = new File([blob], 'initial.png', {
                type: 'image/png'
              });

              //upload initial
              const formData = new FormData();
              formData.append('file', file);
              useUploadSignature(formData).then((res) => {
                if (res.success) {
                  const initialUrl = res.url;
                  if (signatures.length > 0) {
                    //update
                    const temp = signatures.map((x) => {
                      x.isSelected = false;
                      return x;
                    });

                    setSignatures(temp);
                    if (item.id > 0) {
                      // open from edit
                      const payload = {
                        email: recipient.email,

                        signatures: temp.map((x) => {
                          if (x.id === item.id) {
                            x.fullName = form.fullName;
                            x.isSelected = true;
                            x.path = signUrl;
                            x.initials = {
                              initial: form.initials.initial,
                              path: initialUrl
                            };
                          }
                          return x;
                        }),
                        stamps: stamps
                      };

                      useEditSignatureAndInitial(signatureId, true, item.id, payload, true).then(
                        (res) => {
                          if (res.success) {
                            //update signatures

                            setSignatures(res.data.signatures);
                            toggle();
                          }
                        }
                      );
                    } else {
                      const payload = {
                        email: recipient.email,
                        signatures: [
                          ...temp,
                          {
                            id: signatures.length + 1,
                            fullName: form.fullName,
                            isSelected: true,
                            path: signUrl,
                            initials: {
                              initial: form.initials.initial,
                              path: initialUrl
                            }
                          }
                        ],
                        stamps: stamps
                      };
                      useEditSignatureAndInitial(signatureId, true, 0, payload, true).then(
                        (res) => {
                          if (res.success) {
                            setSignatures(res.data.signatures);
                            toggle();
                          }
                        }
                      );
                    }
                  } else {
                    const payload = {
                      email: recipient.email,
                      signatures: [
                        {
                          id: 1,
                          fullName: form.fullName,
                          isSelected: true,
                          path: signUrl,
                          initials: {
                            initial: form.initials.initial,
                            path: initialUrl
                          }
                        }
                      ],
                      stamps: []
                    };
                    useAddSignatureAndInitial(payload).then((res) => {
                      if (res.success) {
                        setSignatures(res.data.signatures);
                        setSignatureId(res.data._id);
                        toggle();
                      }
                    });
                  }
                }
              });
            }, 'image/png');
          }
        });
      }, 'image/png');
    } else if (selectedTab === 2) {
      drawingRef.current.exportImage('png').then((data) => {
        const blob = b64toBlob(data);
        const file = new File([blob], 'signature.png', {
          type: 'image/png'
        });

        const formData = new FormData();
        formData.append('file', file);
        useUploadSignature(formData).then((res) => {
          if (res.success) {
            if (signatures.length > 0) {
              //signature or initial is available
              const temp = signatures.map((x) => {
                x.isSelected = false;
                return x;
              });

              setSignatures(temp);
              // is from edit or not
              if (item.id > 0) {
                // open from edit form
                let payload = {};
                if (type === 'signature') {
                  payload = {
                    email: recipient.email,
                    signatures: temp.map((x) => {
                      if (x.id === item.id) {
                        x.fullName = form.fullName;
                        x.isSelected = true;
                        x.path = res.url;
                        x.initials = {
                          initial: form.initials.initial,
                          path: item.initials.path // initial path no change
                        };
                      }
                      return x;
                    }),
                    stamps: stamps
                  };

                  useEditSignatureAndInitial(signatureId, true, item.id, payload, false).then(
                    (res) => {
                      if (res.success) {
                        //update signatures
                        setSignatures(res.data.signatures);
                        toggle();
                      }
                    }
                  );
                } else if (type === 'initial') {
                  payload = {
                    email: recipient.email,
                    signatures: temp.map((x) => {
                      if (x.id === item.id) {
                        x.fullName = form.fullName;
                        x.isSelected = true;
                        x.path = item.path; // signature no change
                        x.initials = {
                          initial: form.initials.initial,
                          path: res.url
                        };
                      }
                      return x;
                    }),
                    stamps: stamps
                  };
                  useEditSignatureAndInitial(signatureId, true, item.id, payload, true).then(
                    (res) => {
                      if (res.success) {
                        //update signatures
                        setSignatures(res.data.signatures);
                        toggle();
                      }
                    }
                  );
                }
              } else {
                // open from add
                let payload = {};
                if (type === 'signature') {
                  payload = {
                    email: recipient.email,
                    signatures: [
                      ...temp,
                      {
                        id: signatures.length + 1,
                        fullName: form.fullName,
                        isSelected: true,
                        path: res.url,
                        initials: {
                          initial: form.initials.initial,
                          path: '' // initial doesn't exists
                        }
                      }
                    ],
                    stamps: stamps
                  };
                  useEditSignatureAndInitial(signatureId, true, 0, payload, false).then((res) => {
                    if (res.success) {
                      setSignatures(res.data.signatures);
                      toggle();
                    }
                  });
                } else if (type === 'initial') {
                  payload = {
                    email: recipient.email,
                    signatures: [
                      ...temp,
                      {
                        id: signatures.length + 1,
                        fullName: form.fullName,
                        isSelected: true,
                        path: item.path, // signature path doesn't change
                        initials: {
                          initial: form.initials.initial,
                          path: res.url
                        }
                      }
                    ],
                    stamps: stamps
                  };
                  useEditSignatureAndInitial(signatureId, true, 0, payload, true).then((res) => {
                    if (res.success) {
                      setSignatures(res.data.signatures);
                      toggle();
                    }
                  });
                }
              }
            } else {
              //initial and signature not available
              let payload = {};
              if (stamps.length > 0) {
                if (type === 'signature') {
                  payload = {
                    email: recipient.email,
                    signatures: [
                      {
                        id: 1,
                        fullName: form.fullName,
                        isSelected: true,
                        path: res.url,
                        initials: {
                          initial: form.initials.initial,
                          path: ''
                        }
                      }
                    ]
                  };
                  useEditSignatureAndInitial(signatureId, true, 0, payload, false).then((res) => {
                    setSignatures(res.data.signatures);
                    toggle();
                  });
                } else if (type === 'initial') {
                  payload = {
                    email: recipient.email,
                    signatures: [
                      {
                        id: 1,
                        fullName: form.fullName,
                        isSelected: true,
                        path: '',
                        initials: {
                          initial: form.initials.initial,
                          path: res.url
                        }
                      }
                    ]
                  };
                  useEditSignatureAndInitial(signatureId, true, 0, payload, true).then((res) => {
                    setSignatures(res.data.signatures);
                    toggle();
                  });
                }
              } else {
                //nothing is available
                if (type === 'signature') {
                  payload = {
                    email: recipient.email,
                    signatures: [
                      {
                        id: 1,
                        fullName: form.fullName,
                        isSelected: true,
                        path: res.url,
                        initials: {
                          initial: form.initials.initial,
                          path: ''
                        }
                      }
                    ],

                    stamps: []
                  };
                } else if (type === 'initial') {
                  payload = {
                    email: recipient.email,
                    signatures: [
                      {
                        id: 1,
                        fullName: form.fullName,
                        isSelected: true,
                        path: '',
                        initials: {
                          initial: form.initials.initial,
                          path: res.url
                        }
                      }
                    ],
                    stamps: []
                  };
                }

                useAddSignatureAndInitial(payload).then((res) => {
                  if (res.success) {
                    setSignatures(res.data.signatures);
                    setSignatureId(res.data._id);
                    toggle();
                  }
                });
              }
            }
          }
        });
      });
    } else if (selectedTab === 3) {
      //upload only signature from file
      const canvasSignature = uploadRef.current;
      canvasSignature.toBlob((blob) => {
        let file = new File([blob], 'signature.png', {
          type: 'image/png'
        });
        //upload signature
        const formData = new FormData();
        formData.append('file', file);
        useUploadSignature(formData).then((res) => {
          if (res.success) {
            if (signatures.length > 0) {
              //update
              const temp = signatures.map((x) => {
                x.isSelected = false;
                return x;
              });

              setSignatures(temp);
              if (item.id > 0) {
                // open from edit
                let payload = {};
                if (type === 'signature') {
                  payload = {
                    email: recipient.email,

                    signatures: temp.map((x) => {
                      if (x.id === item.id) {
                        x.fullName = form.fullName;
                        x.isSelected = true;
                        x.path = res.url;
                        x.initials = {
                          initial: form.initials.initial,
                          path: x.initials.path
                        };
                      }
                      return x;
                    }),
                    stamps: stamps
                  };
                  useEditSignatureAndInitial(signatureId, true, item.id, payload, false).then(
                    (res) => {
                      if (res.success) {
                        //update signatures
                        setSignatures(res.data.signatures);
                        toggle();
                      }
                    }
                  );
                } else if (type === 'initial') {
                  payload = {
                    email: recipient.email,

                    signatures: temp.map((x) => {
                      if (x.id === item.id) {
                        x.fullName = form.fullName;
                        x.isSelected = true;

                        x.initials = {
                          initial: form.initials.initial,
                          path: res.url
                        };
                      }
                      return x;
                    }),
                    stamps: stamps
                  };
                  useEditSignatureAndInitial(signatureId, true, item.id, payload, true).then(
                    (res) => {
                      if (res.success) {
                        //update signatures
                        setSignatures(res.data.signatures);
                        toggle();
                      }
                    }
                  );
                }
              } else {
                let payload = {};
                if (type === 'signature') {
                  payload = {
                    email: recipient.email,
                    signatures: [
                      ...temp,
                      {
                        id: signatures.length + 1,
                        fullName: form.fullName,
                        isSelected: true,
                        path: res.url,
                        initials: {
                          initial: form.initials.initial,
                          path: ''
                        }
                      }
                    ],
                    stamps: stamps
                  };
                  useEditSignatureAndInitial(signatureId, true, 0, payload, false).then((res) => {
                    if (res.success) {
                      setSignatures([res.data.signatures]);
                      toggle();
                    }
                  });
                } else if (type == 'initial') {
                  payload = {
                    email: recipient.email,
                    signatures: [
                      ...temp,
                      {
                        id: signatures.length + 1,
                        fullName: form.fullName,
                        isSelected: true,
                        path: form.path,
                        initials: {
                          initial: form.initials.initial,
                          path: res.url
                        }
                      }
                    ],
                    stamps: stamps
                  };
                  useEditSignatureAndInitial(signatureId, true, 0, payload, true).then((res) => {
                    if (res.success) {
                      setSignatures([res.data.signatures]);
                      toggle();
                    }
                  });
                }
              }
            } else {
              if (stamps.length > 0) {
                let payload = {};
                if (type === 'signature') {
                  payload = {
                    email: recipient.email,
                    signatures: [
                      {
                        id: 1,
                        fullName: form.fullName,
                        isSelected: true,
                        path: res.url,
                        initials: {
                          initial: form.initials.initial,
                          path: ''
                        }
                      }
                    ]
                  };
                } else if (type === 'initial') {
                  payload = {
                    email: recipient.email,
                    signatures: [
                      {
                        id: 1,
                        fullName: form.fullName,
                        isSelected: true,
                        path: '',
                        initials: {
                          initial: form.initials.initial,
                          path: res.url
                        }
                      }
                    ]
                  };
                }

                useEditSignatureAndInitial(signatureId, true, item.id, payload, false).then(
                  (res) => {
                    if (res.success) {
                      //update signatures
                      setSignatures(res.data.signatures);
                      setSignatureId(res.data._id);
                      toggle();
                    }
                  }
                );
              } else {
                const payload = {
                  email: recipient.email,
                  signatures: [
                    {
                      id: 1,
                      fullName: form.fullName,
                      isSelected: true,
                      path: res.url,
                      initials: {
                        initial: form.initials.initial,
                        path: ''
                      }
                    }
                  ],
                  stamps: []
                };
                useAddSignatureAndInitial(payload).then((res) => {
                  if (res.success) {
                    setSignatures(res.data.signatures);
                    setSignatureId(res.data._id);
                    toggle();
                  }
                });
              }
            }
          }
        });
      }, 'image/png');
    }
  };

  useEffect(() => {
    if (item) {
      setForm(item);
    }
  }, [item]);

  useEffect(() => {
    if (selectedTab === 1 && (form.fullName === '' || form.initials?.initial === '')) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [form, selectedTab]);

  return (
    <Modal isOpen={open} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Adopt Your Signature</ModalHeader>
      <ModalBody>
        <p>Confirm your name, initials, and signature.</p>
        <Row>
          <Col md="8">
            <FormGroup>
              <Label for="fullName">Full Name</Label>
              <Input
                type="text"
                placeholder="Full Name"
                id="fullName"
                name="fullName"
                onChange={handleChangeForm}
                value={form?.fullName}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="initials">Initials</Label>
              <Input
                type="text"
                placeholder="Initials"
                id="initials"
                name="initial"
                onChange={handleChangeForm}
                maxLength={4}
                value={form?.initials?.initial}
              />
            </FormGroup>
          </Col>
        </Row>
        <div>
          <Nav>
            {tabs &&
              tabs.map((tab, idx) => {
                return (
                  <NavItem key={idx}>
                    <Button
                      color="link"
                      className={`px-0 me-2 ${tab.isActive ? 'active' : ''}`}
                      onClick={() => handleTabChange(tab.tabId)}
                    >
                      {tab.name}
                    </Button>
                  </NavItem>
                );
              })}
          </Nav>
          <hr />
          <TabContent activeTab={selectedTab}>
            <TabPane tabId={1}>
              <SelectStyle form={form} signatureRef={signatureRef} initialRef={initialRef} />
            </TabPane>
            <TabPane tabId={2}>
              <DrawSigniture form={form} signatureRef={drawingRef} />
            </TabPane>
            <TabPane tabId={3}>
              <Upload signatureRef={uploadRef} type={type} />
            </TabPane>
          </TabContent>
          <p>
            By selecting Adopt and Sign, I agree that the signature and initials will be the
            electronic representation of my signature and initials for all purposes when I (or my
            agent) use them on documents, including legally binding contracts - just the same as a
            pen-and-paper signature or initial.
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-start">
          <Button
            color="primary"
            className=" me-2"
            onClick={handleAddSignature}
            disabled={disabled}
          >
            <Check className="align-middle d-sm-inline-block" />
            <span className="align-middle d-sm-inline-block d-none">Adopt & Sign</span>
          </Button>
          <Button color="primary" outline onClick={toggle}>
            <X className="align-middle d-sm-inline-block" />
            <span className="align-middle d-sm-inline-block d-none">Cancel</span>
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
