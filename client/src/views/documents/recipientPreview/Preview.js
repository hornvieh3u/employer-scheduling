import React, { useContext, useRef, useState, useCallback, useEffect } from 'react';
import SlideDown from 'react-slidedown';
import Repeater from '../../../@core/components/repeater';
import { DocumentContext } from '../../../utility/context/Document';
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf';
import { getDocumentWithToken } from '../../../requests/documents/create-doc';
import Sign from './properties/sign/Sign';
import Approve from './properties/Approve';
import Decline from './properties/decline/Decline';
import Radio from './properties/Radio';
import Checkbox from './properties/Checkbox';
import SignedDate from './properties/SignedDate';
import Name from './properties/Name';
import Email from './properties/Email';
import Drawing from './properties/drawing/Drawing';
import Note from './properties/Note';
import Title from './properties/Title';
import Company from './properties/Company';
import Initial from './properties/Initial';
import Formula from './properties/Formula';
import Text from './properties/Text';
import Stamp from './properties/stamp/Stamp';
import Attachment from './properties/attachment/Attachment';
import Dropdown from './properties/Dropdown';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';
import {
  editDocFromRecipientNoReturn,
  editDocFromRecipient,
  useUploadSignature
} from '../../../requests/documents/recipient-doc';

import SessionExpires from './SessionExpires';
import { mergeAllFiles } from '../helpers/loadPdfHelper';
import { isMobile } from 'react-device-detect';
import Line from './properties/Line';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import FileSaver from 'file-saver';

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

export default function Preview() {
  const [pageCnt, setPageCnt] = useState(0);
  const [pdfFile, setPdfFile] = useState();
  const [boardDimention, setBoardDimention] = useState({ x: 0, y: 0 });
  const [documentId, setDocumentId] = useState();
  const [isDone, setIsDone] = useState(false);
  const [attachments, setAttachments] = useState([]); //{id:,files:[]}
  const [sessionExpired, setSessionExpired] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoom, setZoom] = useState();
  const [title, setTitle] = useState('');

  // ** Context
  const {
    board,
    setBoard,

    setRecipients,
    setHashcode,
    recipients,
    hashcode,
    signature,
    selectedItem,
    stamp
  } = useContext(DocumentContext);

  const canvasRef = useRef([]);

  const handleZoomDropdown = () => {
    setZoomOpen(!zoomOpen);
  };

  const handleZoomChange = (val) => {
    if (val === 0) {
      //zoomInstance.smoothZoom(0.5, 0, (isMobile ? 0.4 : 1) / zoom);
      setZoom(isMobile ? 0.4 : 1);
    } else {
      //zoomInstance.smoothZoom(0.5, 0, val / zoom);
      setZoom(val);
    }
  };
  const renderPages = useCallback(async () => {
    if (pdfFile != null && pageCnt > 0) {
      for (let index = 0; index < pageCnt; index++) {
        const page = await pdfFile.getPage(index + 1);
        const viewport = page.getViewport({ scale: 1.5 });
        const temp = canvasRef.current;
        const canvas = temp[index];

        const canvasContext = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.id = index;
        setBoardDimention({ x: canvas.width, y: canvas.height });

        const renderContext = { canvasContext, viewport };
        page.render(renderContext);
        //parent.current.appendChild(div)
      }
    }
  }, [pageCnt, pdfFile]);

  const handleFinishLater = async () => {
    let boardTemp = board;
    if (attachments.length > 0) {
      const mergedFile = await mergeAllFiles(attachments[0].files);
      const formData = new FormData();
      formData.append('file', mergedFile);
      const data = await useUploadSignature(formData);

      if (data.success === true) {
        boardTemp.map((b) => {
          let temp = b;
          if (temp.id === attachments[0].id && temp.type === 'attachment') {
            temp.list = [];
            temp.list.push(data.url);
          }
          return temp;
        });
        const payload = {
          properties: boardTemp
        };
        editDocFromRecipient(
          documentId,
          payload,
          false,
          localStorage.getItem('recipientToken')
        ).then((res) => {
          if (res.success) {
            setIsDone(false);
            setBoard(res.data.properties);
            setRecipients(res.data.recipients);
            window.location.href = `/document/email-link/${hashcode}`
          }
        });
      }
    } else {
      const payload = {
        properties: boardTemp
      };

      editDocFromRecipient(documentId, payload, false, localStorage.getItem('recipientToken')).then(
        (res) => {
          if (res.success) {
            setIsDone(false);
            setBoard(res.data.properties);
            setRecipients(res.data.recipients);
            window.location.href = `/document/email-link/${hashcode}`
          }
        }
      );
    }
  };
  const handleFinish = async () => {
    const thisBoard = board.filter((b) => b.recipient.hashCode === hashcode);
    const shouldBeDone = thisBoard.filter((b) => b.required === true);

    const isDone = thisBoard.filter((x) => x.isDone === true);
    if (shouldBeDone.length === isDone.length) {
      //update recipients where is finished
      let recipientsTemp = recipients;
      recipientsTemp.map((rec) => {
        if (rec.hashCode === hashcode) {
          rec.isDone = true;
        }
        return rec;
      });

      let boardTemp = board;

      if (attachments.length > 0) {
        const mergedFile = await mergeAllFiles(attachments[0].files);
        const formData = new FormData();
        formData.append('file', mergedFile);
        const data = await useUploadSignature(formData);

        boardTemp.map((b) => {
          let temp = b;
          if (temp.id === attachments[0].id && temp.type === 'attachment') {
            temp.list.push(data.url);
          }
          if (temp.recipient.hashCode === hashcode && temp.isDone) {
            temp.recipient.isDone = true;
          }
          return temp;
        });
        const allIsDone = recipientsTemp.every((x) => x.isDone === true);
        //save -- update recipient board
        const payload = {
          recipients: recipientsTemp,
          properties: boardTemp,
          isDone: allIsDone
        };
        editDocFromRecipient(
          documentId,
          payload,
          false,
          localStorage.getItem('recipientToken')
        ).then((res) => {
          if (res.success) {
            setIsDone(true);
            setBoard(res.data.properties);
            setRecipients(res.data.recipients);
            window.location.href = `/document/email-link/${hashcode}`
          }
        });
      } else {
        boardTemp.map((b) => {
          let temp = b;

          if (temp.recipient.hashCode === hashcode && temp.isDone) {
            temp.recipient.isDone = true;
          }
          return temp;
        });
        const allIsDone = recipientsTemp.every((x) => x.isDone === true);
        //save -- update recipient board
        const payload = {
          recipients: recipientsTemp,
          properties: boardTemp,
          isDone: allIsDone
        };

        editDocFromRecipient(
          documentId,
          payload,
          false,
          localStorage.getItem('recipientToken')
        ).then((res) => {
          if (res.success) {
            setIsDone(true);
            setBoard(res.data.properties);
            setRecipients(res.data.recipients);
            window.location.href = `/document/email-link/${hashcode}`
           
          }
        });
      }
    } else {
      //not all is done
      toast.error('Please fill all the required fields before submitting!');
    }
  };

  const handleDecline = () => {
    let recipientsTemp = recipients;
    let boardTemp = board;
    recipientsTemp.map((rec) => {
      if (rec.hashCode === hashcode) {
        rec.isDone = true;
      }
      return rec;
    });
    boardTemp.map((b) => {
      let temp = b;

      if (temp.recipient.hashCode === hashcode && temp.isDone) {
        temp.recipient.isDone = true;
      }
      return temp;
    });
    const allIsDone = recipientsTemp.every((x) => x.isDone === true);
    //save -- update recipient board
    const payload = {
      recipients: recipientsTemp,
      properties: boardTemp,
      isDone: allIsDone,
      isVoided: true
    };
    editDocFromRecipient(documentId, payload, false, localStorage.getItem('recipientToken')).then(
      (res) => {
        if (res.success) {
          setIsDone(true);
          setBoard(res.data.properties);
          setRecipients(res.data.recipients);
        }
      }
    );
  };

  const handleDownload = async () => {
    var elementHTML = document.querySelector('#pageContainer');
    const prevZoom = zoom;
    if (prevZoom != 1) {
      setZoom(1);
    }
    const doc = new jsPDF('p', 'px', [boardDimention.x + 1, boardDimention.y + 1]);
    doc.html(elementHTML, {
      callback: function (doc) {
        doc.save(`${title}.pdf`);
        setZoom(prevZoom);
      }
    });
    const attachments = board.filter(x=>x.type==='attachment');
    if(attachments.length>0){
      attachments.map(x=>{
       if(x.isDone===true){
        FileSaver.saveAs(x.list[0],`attachment-${title}-${x.recipient.name}.pdf`)
       }
      })
    }
  };
  useEffect(() => {
    isMobile ? setZoom(0.4) : setZoom(1);
    const windowUrl = window.location.href.split('/');
    const hashcode = windowUrl[windowUrl.length - 1];
    setHashcode(hashcode);
    const token = localStorage.getItem('recipientToken');
    const expTime = localStorage.getItem('recipientExpireTime');
    const now = Date.now();
    if (now < Number(expTime) && token) {
      setSessionExpired(false);
      getDocumentWithToken(token, hashcode).then((data) => {
        const doc = data;
        setTitle(doc.title);
        setDocumentId(doc.documentId);
        if (doc.recipients.find((x) => x.hashCode === hashcode).isDone === true) {
          setIsDone(true);
        } else {
          setIsDone(false);
        }
        const loadingTask = PDFJS.getDocument(doc.documentUrl);
        loadingTask.promise.then((loadedPdf) => {
          setPdfFile(loadedPdf);
          setPageCnt(loadedPdf.numPages);
          setBoard(doc.properties);
          setRecipients(doc.recipients);
        });

        //set hasViewed true

        let rec = doc.recipients.find((x) => x.hashCode === hashcode);
        rec = { ...rec, hasViewed: true };
        if (rec.roleOption === 'read') {
          setIsDone(true);
        }
        let recs = doc.recipients.filter((x) => x.hashCode != hashcode);
        const payload = {
          recipients: [...recs, rec]
        };
        editDocFromRecipientNoReturn(
          doc.documentId,
          payload,
          false,
          localStorage.getItem('recipientToken')
        );
      });
    } else {
      // your session is expired
      setSessionExpired(true);
    }
  }, []);

  //render page on canvas

  useEffect(() => {
    let temp = [];

    if (selectedItem.type === 'sign' && signature.initials) {
      //when initial & signature selected together
      for (const b of board) {
        let i = b;
        if (i.type === 'sign' && i.recipient.hashCode === hashcode) {
          if (signature.id) {
            i.isDone = true;
            i.signValue = {
              name: signature.fullName,
              path: signature.path
            };
            //i.recipient.isDone=true
          } else {
            i.isDone = false;
            i.signValue = {};
            //i.recipient.isDone=false
          }
        } else if (i.type === 'initial' && i.recipient.hashCode === hashcode) {
          if (signature.id) {
            i.isDone = true;
            i.signValue = {
              name: signature.initials.initial,
              path: signature.initials.path
            };
            //i.recipient.isDone=true
          } else {
            i.isDone = false;
            i.signValue = {};
            //i.recipient.isDone=false
          }
        }
        temp.push(i);
      }
    } else if (selectedItem.type === 'stamp') {
      for (const b of board) {
        let i = b;
        if (i.type === 'stamp' && i.recipient.hashCode === hashcode) {
          if (stamp.id) {
            i.isDone = true;
            i.signValue = {
              name: stamp.departmentName,
              path: stamp.path
            };
            //i.recipient.isDone=true
          } else {
            i.isDone = false;
            i.signValue = {};
            //i.recipient.isDone=false
          }
        }
        temp.push(i);
      }
    } else if (selectedItem.type === 'initial') {
      if (signature.path !== '') {
        for (const b of board) {
          let i = b;
          if (i.type === 'initial' && i.recipient.hashCode === hashcode) {
            if (selectedItem.type === 'initial') {
              if (signature.id) {
                i.isDone = true;
                i.signValue = {
                  name: signature.initials.initial,
                  path: signature.initials.path
                };
                //i.recipient.isDone=true
              } else {
                i.isDone = false;
                i.signValue = {};
                //i.recipient.isDone=false
              }
            } else {
              if (signature.id) {
                i.isDone = true;
                i.signValue = {
                  name: signature.fullName,
                  path: signature.path
                };
                //i.recipient.isDone=true
              } else {
                i.isDone = false;
                i.signValue = {};
                //i.recipient.isDone=false
              }
            }
          } else if (i.type === 'sign' && i.recipient.hashCode === hashcode) {
            if (signature.id) {
              i.isDone = true;
              i.signValue = {
                name: signature.fullName,
                path: signature.path
              };
              //i.recipient.isDone=true
            } else {
              i.isDone = false;
              i.signValue = {};
              //i.recipient.isDone=false
            }
          }
          temp.push(i);
        }
      } else {
        for (const b of board) {
          let i = b;
          if (i.type === 'initial' && i.recipient.hashCode === hashcode) {
            if (selectedItem.type === 'initial') {
              if (signature.id) {
                i.isDone = true;
                i.signValue = {
                  name: signature.initials.initial,
                  path: signature.initials.path
                };
                //i.recipient.isDone=true
              } else {
                i.isDone = false;
                i.signValue = {};
                //i.recipient.isDone=false
              }
            } else {
              if (signature.id) {
                i.isDone = true;
                i.signValue = {
                  name: signature.fullName,
                  path: signature.path
                };
                //i.recipient.isDone=true
              } else {
                i.isDone = false;
                i.signValue = {};
                //i.recipient.isDone=false
              }
            }
          }
          temp.push(i);
        }
      }
    }

    setBoard(temp);
  }, [signature, stamp]);
  useEffect(() => {
    if (pdfFile != null && pageCnt > 0 && board.length > 0) {
      renderPages();
    }
  }, [board]);

  return (
    <>
      {sessionExpired === true ? (
        <SessionExpires />
      ) : (
        <>
          <div className="container-fluid ">
            <div className="d-flex justify-content-between pt-1">
              {/* zoom out zoom in  */}
              <div>
                <UncontrolledButtonDropdown
                  className={`${isMobile ? 'w-100' : ''}`}
                  isOpen={zoomOpen}
                  toggle={handleZoomDropdown}
                  style={{ width: '160px' }}
                >
                  <DropdownToggle
                    outline
                    color="primary"
                    caret
                    className="w-100"
                    style={{ borderRadius: 'none' }}
                  >
                    {zoom && (zoom === 0 ? 'Fit to window' : `${zoom * 100} %`)}
                  </DropdownToggle>
                  <DropdownMenu className="w-100">
                    <DropdownItem className="w-100" onClick={() => handleZoomChange(0.25)}>
                      25%
                    </DropdownItem>
                    <DropdownItem className="w-100" onClick={() => handleZoomChange(0.5)}>
                      50%
                    </DropdownItem>
                    <DropdownItem className="w-100" onClick={() => handleZoomChange(0.75)}>
                      75%
                    </DropdownItem>
                    <DropdownItem className="w-100" onClick={() => handleZoomChange(1)}>
                      100%
                    </DropdownItem>
                    <DropdownItem className="w-100" onClick={() => handleZoomChange(1.25)}>
                      125%
                    </DropdownItem>
                    <DropdownItem className="w-100" onClick={() => handleZoomChange(1.5)}>
                      150%
                    </DropdownItem>
                    <DropdownItem className="w-100" onClick={() => handleZoomChange(1.75)}>
                      175%
                    </DropdownItem>
                    <DropdownItem className="w-100" onClick={() => handleZoomChange(2)}>
                      200%
                    </DropdownItem>
                    <DropdownItem className="w-100" onClick={() => handleZoomChange(0)}>
                      Fit to window
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
              {isDone === false ? (
                <div>
                  <Button color="primary" className="me-2" onClick={handleFinish}>
                    Finish
                  </Button>
                  <Button color="primary" outline onClick={handleFinishLater}>
                    Finish later
                  </Button>
                </div>
              ) : (
                <div>
                  <Button color="primary" className="me-2" onClick={handleDownload}>
                    Download
                  </Button>
                </div>
              )}
            </div>
          </div>

          <hr />
          <div>
            <div
              className="container-fluid mx-auto"
              style={{
                width: `${isMobile ? window.innerWidth : boardDimention.x + 50}px`,
                overflow: 'hidden'
              }}
              id="boundDiv"
            >
              <div style={{ overflowX: 'scroll' }}>
                <div
                  id="pageContainer"
                  style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}
                >
                  <Repeater count={pageCnt}>
                    {(i = 1) => {
                      const Tag = i === 0 ? 'div' : SlideDown;
                      return (
                        <Tag key={i} className="d-flex ">
                          <canvas ref={(ref) => canvasRef.current.push(ref)}></canvas>
                          <div
                            className="Board border-primary mx-0"
                            style={{
                              position: 'absolute',
                              display: 'block',
                              width: `${boardDimention.x}px`,
                              height: `${boardDimention.y}px`
                            }}
                          >
                            {board &&
                              board
                                .filter(
                                  (x) =>
                                    x.page === i + 1 &&
                                    (x.recipient.hashCode === hashcode ||
                                      x.recipient.isDone === true)
                                )
                                .map((item, idx) => {
                                  switch (item?.type) {
                                    case 'sign':
                                      return <Sign key={idx} item={item} isDone={isDone} />;
                                    case 'initial':
                                      return <Initial key={idx} item={item} isDone={isDone} />;
                                    case 'stamp':
                                      return <Stamp key={idx} item={item} isDone={isDone} />;
                                    case 'signDate':
                                      return <SignedDate key={idx} item={item} />;

                                    case 'name':
                                      return <Name key={idx} item={item} />;
                                    case 'email':
                                      return <Email key={idx} item={item} />;
                                    case 'company':
                                      return <Company key={idx} item={item} isDone={isDone} />;
                                    case 'title':
                                      return <Title key={idx} item={item} isDone={isDone} />;
                                    case 'text':
                                      return <Text key={idx} item={item} isDone={isDone} />;
                                    case 'checkbox':
                                      return <Checkbox key={idx} item={item} isDone={isDone} />;
                                    case 'radio':
                                      return <Radio key={idx} item={item} isDone={isDone} />;
                                    case 'dropdown':
                                      return <Dropdown key={idx} item={item} isDone={isDone} />;
                                    case 'drawing':
                                      return <Drawing key={idx} item={item} isDone={isDone} />;
                                    case 'formula':
                                      return <Formula key={idx} item={item} />;
                                    case 'attachment':
                                      return (
                                        <Attachment
                                          key={idx}
                                          item={item}
                                          attachments={attachments}
                                          setAttachments={setAttachments}
                                          isDone={isDone}
                                        />
                                      );
                                    case 'note':
                                      return <Note key={idx} item={item} />;
                                    case 'approve':
                                      return <Approve key={idx} item={item} isDone={isDone} />;
                                    case 'decline':
                                      return (
                                        <Decline
                                          key={idx}
                                          item={item}
                                          isDone={isDone}
                                          handleDecline={handleDecline}
                                        />
                                      );
                                    case 'line':
                                      return <Line key={idx} item={item} />;
                                    default:
                                      return <></>;
                                  }
                                })}
                          </div>
                        </Tag>
                      );
                    }}
                  </Repeater>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
