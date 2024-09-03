import React, { useEffect } from 'react';
import { Paperclip } from 'react-feather';

import { Modal, ModalBody, ModalFooter, ModalHeader, Table, Button } from 'reactstrap';

export default function AttachmentModal({ toggle, open, files, handleFileUpload,isDone }) {

  return (
    <Modal isOpen={open} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Uploaded Files</ModalHeader>
      <ModalBody>
        <Table>
          <tbody>
            {files.length>0 && (
                  <tr>
                    <td>
                      {['png', 'jpg', 'jpeg'].includes(
                        files[0]?.split('.')[files[0].split('.').length - 1]
                      ) ? (
                        <img src={files[0]} width="100" />
                      ) : (
                        <Paperclip />
                      )}
                    </td>
                    <td>
                      <a href={files[0]} target="_blank">
                        {files[0]?.split('-')[files[0].split('-').length - 1]}
                      </a>
                    </td>
                  </tr>
                )}
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-start">
          {isDone===false && <Button color="primary" className=" me-2" onClick={handleFileUpload}>
            <span className="align-middle d-sm-inline-block d-none">Upload New Files</span>
          </Button>}
          <Button color="primary" outline onClick={toggle}>
            <span className="align-middle d-sm-inline-block d-none">Close</span>
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
