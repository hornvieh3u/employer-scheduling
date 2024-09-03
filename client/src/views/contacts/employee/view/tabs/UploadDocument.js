// import React, { useState } from 'react';
// import {
//   Alert,
//   Badge,
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   CardTitle,
//   Col,
//   Input,
//   Label,
//   Modal,
//   ModalBody,
//   ModalFooter,
//   ModalHeader,
//   Row
// } from 'reactstrap';

// function UploadDocument() {
//   const [file, setFile] = useState(null);
//   const [status, setStatus] = useState('NOT COMPLETE');
//   const [modal, setModal] = useState(false);

//   const handleFileSelect = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const toggle = () => setModal(!modal);

//   const handleUpload = () => {
//     setStatus('PLEASE WAIT');
//     setStatus('SUBMITTED');
//   };

//   const handleConfirm = () => {
//     setStatus('COMPLETED');
//   };

//   return (
//     <Card>
//       <CardHeader className="py-1">
//         <CardTitle tag="h4">Upload Documents</CardTitle>
//         <div className="d-flex">
//           <Button
//             color="primary"
//             onClick={status === 'SUBMITTED' ? toggle : handleUpload}
//             className="mt-1"
//             style={{
//               backgroundColor:
//                 status === 'NOT COMPLETE'
//                   ? '#80ff0c8a !important'
//                   : status === 'SUBMITTED'
//                   ? '#fff80c8a'
//                   : '#80ff0c8a !important',
//               color: status === 'NOT COMPLETE' ? 'red' : status === 'SUBMITTED' ? 'yellow' : 'green'
//             }}
//           >
//             Upload
//           </Button>
//         </div>
//       </CardHeader>
//       <CardBody>
//         <Row>
//           <Col md={6}>
//             <div className="file-upload">
//               <div className="file-upload-controls">
//                 <Input type="file" onChange={handleFileSelect} />
//               </div>
//               <div className="file-upload-status mt-1">
//                 <Label
//                   style={{
//                     borderRadius: '25px',
//                     padding: '2px',
//                     color:
//                       status === 'NOT COMPLETE'
//                         ? 'red'
//                         : status === 'SUBMITTED'
//                         ? '#b3ae70'
//                         : 'green',
//                     backgroundColor:
//                       status === 'NOT COMPLETE'
//                         ? 'rgb(255 12 12 / 18%)'
//                         : status === 'SUBMITTED'
//                         ? '#fff815d9'
//                         : '#0080003b'
//                   }}
//                 >
//                   <b>{status}</b>
//                 </Label>
//                 {status === 'SUBMITTED' && (
//                   <Modal isOpen={modal} toggle={toggle}>
//                     <ModalHeader>Please Confirm</ModalHeader>
//                     <ModalBody>

//                     </ModalBody>
//                     <ModalFooter>
//                       <Button>Cancel</Button>
//                       <Button color='primary' onClick={handleConfirm}>Confirm</Button>
//                     </ModalFooter>
//                   </Modal>
//                 )}
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </CardBody>
//     </Card>
//   );
// }

// export default UploadDocument;
