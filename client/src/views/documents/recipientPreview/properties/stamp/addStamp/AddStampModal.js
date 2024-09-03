import React, { useContext, useRef, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  TabContent,
  TabPane,
  NavItem,
  Button,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import {
  useAddSignatureAndInitial,
  useEditSignatureAndInitial,
  useUploadSignature
} from '../../../../../../requests/documents/recipient-doc';
import { DocumentContext } from '../../../../../../utility/context/Document';
import Upload from '../../sign/addSignTypes/Upload';
import Choose from './Choose';

export default function AddStampModal({ toggle, open }) {
  // ** States
  const [tabs, setTabs] = useState([
    //  {
    //     tabId: 1,
    //     isActive: true,
    //     name: 'Choose'
    // },
    {
      tabId: 2,
      isActive: false,
      name: 'Upload'
    }
  ]);
  const [selectedTab, setSelectedTab] = useState(2);
  const [departmentName, setDepartmentName] = useState();

  // ** Contexts
  const { recipients, hashcode, stamps, setStamps, signatures, signatureId, setSignatureId } =
    useContext(DocumentContext);

  const uploadRef = useRef();
  // ** Functions
  const handleTabChange = (id) => {
    setSelectedTab(id);
  };
  const handleAddStamp = () => {
    const recipient = recipients.find((x) => x.hashCode === hashcode);
    if (selectedTab === 2) {
      const canvasStamp = uploadRef.current;
      canvasStamp.toBlob((blob) => {
        let file = new File([blob], 'stamp.png', { type: 'image/png' });
        const formData = new FormData();
        formData.append('file', file);
        useUploadSignature(formData).then((res) => {
          if (res.success) {
            const url = res.url;
            if (stamps.length > 0) {
              const temp = stamps.map((x) => {
                x.isSelected = false;
                return x;
              });
              setStamps(temp);

              const payload = {
                stamps: [
                  ...stamps,
                  {
                    id: stamps.length + 1,
                    path: url,
                    isSelected: true,
                    departmentName: departmentName
                  }
                ]
              };
              useEditSignatureAndInitial(signatureId, false, 0, payload, false).then((res) => {
                if (res.success) {
                  setStamps(res.data.stamps);
                  toggle();
                }
              });
            } else {
              if (signatures.length > 0) {
                const payload = {
                  stamps: [
                    {
                      id: 1,
                      path: url,
                      isSelected: true,
                      departmentName: departmentName
                    }
                  ]
                };
                useEditSignatureAndInitial(signatureId, false, 0, payload, false).then((res) => {
                  if (res.success) {
                    setStamps(res.data.stamps);
                    toggle();
                  }
                });
              } else {
                const payload = {
                  email: recipient.email,
                  signatures: [],
                  stamps: [
                    {
                      id: 1,
                      path: url,
                      isSelected: true,
                      departmentName: departmentName
                    }
                  ]
                };
                useAddSignatureAndInitial(payload).then((res) => {
                  if (res.success) {
                    setStamps(res.data.stamps);
                    setSignatureId(res.data._id);
                    toggle();
                  }
                });
              }
            }
          }
        });
      });
    }
  };
  return (
    <Modal toggle={toggle} isOpen={open} size="lg">
      <ModalHeader toggle={toggle}>
        Adopt a stamp
        <p>
          <small>Adopt a stamp to finish this document</small>
        </p>
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="departmentName">Department Name</Label>
          <Input
            type="text"
            placeholder="Department Name"
            id="departmentName"
            name="departmentName"
            onChange={(e) => {
              setDepartmentName(e.target.value);
            }}
            value={departmentName}
          />
        </FormGroup>
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
            <Choose />
          </TabPane>
          <TabPane tabId={2}>
            <Upload signatureRef={uploadRef} type="stamp" />
          </TabPane>
        </TabContent>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-start">
          <Button color="primary" className=" me-2" onClick={handleAddStamp}>
            <span className="align-middle d-sm-inline-block d-none">Adopt</span>
          </Button>
          <Button color="primary" outline onClick={toggle}>
            <span className="align-middle d-sm-inline-block d-none">Cancel</span>
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
