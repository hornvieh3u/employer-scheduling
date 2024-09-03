import React, { memo, useState } from 'react';

import { FaAlignJustify } from 'react-icons/fa';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import TextTemplateListing from './TamplateListing/TextTemplateListing'
import TextTemplateSidebar from './Sidebar/index'

const data = [
  {
      "subFolder": [
          {
              "template": [],
              "_id": "63890b83006d4d65a9d8ea65",
              "subFolderName": "Leads",
              "adminId": "6138893333c9482cb41d88d5",
              "folderId": "625eaf9c7dfa372ec6fe193f",
              "__v": 0
          }
      ],
      "_id": "625eaf9c7dfa372ec6fe193f",
      "folderName": "Russian",
      "adminId": "6138893333c9482cb41d88d5",
      "__v": 0
  },
  {
      "subFolder": [
          {
              "template": [
                  {
                      "_id": "625af3ff4981c75b08c6c6e4",
                      "template_name": "testing temp",
                      "text": "hdjshdushdshdjshdjsd",
                      "subFolderId": "625af3954981c75b08c6c6de",
                      "rootFolderId": "625af1764981c75b08c6c6bc",
                      "userId": "606aea95a145ea2d26e0f1ab",
                      "__v": 0
                  },
                  {
                      "_id": "625dbe58c1794d1de0ffa1e4",
                      "template_name": "test",
                      "text": "hey bro!",
                      "subFolderId": "625af3954981c75b08c6c6de",
                      "rootFolderId": "625af1764981c75b08c6c6bc",
                      "userId": "606aea95a145ea2d26e0f1ab",
                      "__v": 0
                  }
              ],
              "_id": "625af3954981c75b08c6c6de",
              "subFolderName": "checking",
              "userId": "606aea95a145ea2d26e0f1ab",
              "folderId": "625af1764981c75b08c6c6bc",
              "__v": 0
          },
          {
              "template": [
                  {
                      "_id": "63b8580166ddfb307b40a091",
                      "template_name": "test",
                      "text": "mujahid",
                      "subFolderId": "63b857ea66ddfb307b40a08a",
                      "rootFolderId": "625af1764981c75b08c6c6bc",
                      "userId": "606aea95a145ea2d26e0f1ab",
                      "__v": 0
                  },
                  {
                      "_id": "63ead204812d1e74e8a4700c",
                      "template_name": "hello",
                      "text": "sfsdfsdf",
                      "subFolderId": "63b857ea66ddfb307b40a08a",
                      "rootFolderId": "625af1764981c75b08c6c6bc",
                      "userId": "606aea95a145ea2d26e0f1ab",
                      "__v": 0
                  }
              ],
              "_id": "63b857ea66ddfb307b40a08a",
              "subFolderName": "add",
              "userId": "606aea95a145ea2d26e0f1ab",
              "folderId": "625af1764981c75b08c6c6bc",
              "__v": 0
          }
      ],
      "_id": "625af1764981c75b08c6c6bc",
      "folderName": "new folder muj",
      "userId": "606aea95a145ea2d26e0f1ab",
      "__v": 0
  }
]

function TextTemplate() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button
        color="link"
        size="sm"
        className="btn-icon"
        onClick={() => handleClose()}
      >
        <FaAlignJustify size={16} />
      </Button>
        <Modal
          isOpen={open}
          size='xl'
          toggle={() => handleClose()}
        >
          <ModalBody className='px-0'>
            <Row>
              <Col md={3}>
                <TextTemplateSidebar data={data} />
              </Col>
              <Col md={9}>
                <TextTemplateListing data={data} />
              </Col>
            </Row>
          </ModalBody>
        </Modal>
   </div>
  );
}

export default memo(TextTemplate);
