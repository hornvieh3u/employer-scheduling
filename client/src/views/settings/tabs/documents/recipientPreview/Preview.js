import React, { useContext, useRef, useState, useCallback, useEffect } from 'react';
import SlideDown from 'react-slidedown';
import Repeater from '../../../@core/components/repeater';
import { DocumentContext } from '../../../utility/context/Document';
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf';
import { decodeFromBase64 } from 'pdf-lib';

import { getEmailLink } from '../../../requests/documents/create-doc';
import Sign from './properties/sign/Sign';
import Approve from './properties/Approve';
import Decline from './properties/decline/Decline';
import Radio from './properties/Radio';
import Checkbox from './properties/Checkbox';
import SignedDate from './properties/SignedDate';
import Name from './properties/Name';
import Email from './properties/Email';
import Drawing from './properties/Drawing/Drawing';
import Note from './properties/Note';
import Title from './properties/Title';
import Company from './properties/Company';
import Initial from './properties/Initial';
import Formula from './properties/Formula';
import Text from './properties/Text';
import Stamp from './properties/stamp/Stamp';
import Attachment from './properties/Attachment';
import Dropdown from './properties/Dropdown';
import { Button } from 'reactstrap';

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

export default function Preview() {
  const [pageCnt, setPageCnt] = useState(0);
  const [pdfFile, setPdfFile] = useState();
  const [boardDimention, setBoardDimention] = useState({ x: 0, y: 0 });

  // ** Context
  const { board, scale, setBoard, setScale, setRecipients, setHashcode, hashcode } =
    useContext(DocumentContext);

  const canvasRef = useRef([]);

  const renderPages = useCallback(async () => {
    if (pdfFile != null && pageCnt > 0) {
      for (let index = 0; index < pageCnt; index++) {
        const page = await pdfFile.getPage(index + 1);
        const viewport = page.getViewport({ scale: 1.5 * scale });
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
  }, [pageCnt, pdfFile, scale]);

  const handleFinishLater = () => {
    //save
  };
  const handleFinish = () => {
    //save
    //send email that is done
    //no change can be done after that
  };

  useEffect(() => {
    const windowUrl = window.location.href.split('/');
    const hashcode = windowUrl[windowUrl.length - 1];
    setHashcode(hashcode);
    getEmailLink(hashcode).then((data) => {
      const doc = data.data;
      const loadingTask = PDFJS.getDocument(data.data.documentUrl);
      loadingTask.promise.then((loadedPdf) => {
        setPdfFile(loadedPdf);
        setPageCnt(loadedPdf.numPages);
        setBoard(doc.properties);
        setRecipients(doc.recipients);
        setScale(doc.properties[0].scale);
      });
    });

    //get document from localDB
    // const pdf = decodeFromBase64(localStorage['pdf'])
    // const loadingTask = PDFJS.getDocument(pdf)
  }, []);

  //render page on canvas
  useEffect(() => {
    if (pdfFile != null && pageCnt > 0 && board.length > 0) {
      renderPages();
    }
  }, [scale]);

  return (
    <>
      <div className="container-fluid ">
        <div className="d-flex justify-content-end pt-1">
          <Button color="primary" className="me-2" onClick={handleFinish}>
            Finish
          </Button>
          <Button color="primary" outline onClick={handleFinishLater}>
            Finish later
          </Button>
        </div>
      </div>
      <hr />
      <div>
        <div className="d-flex justify-content-center">
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
                    {board
                      .filter((x) => x.page === i + 1 && x.recipient.hashCode === hashcode)
                      .map((item, idx) => {
                        switch (item?.type) {
                          case 'sign':
                            return <Sign key={idx} item={item} scale={scale} />;
                          case 'initial':
                            return <Initial key={idx} item={item} scale={scale} />;
                          case 'stamp':
                            return <Stamp key={idx} item={item} scale={scale} />;
                          case 'signDate':
                            return <SignedDate key={idx} item={item} scale={scale} />;

                          case 'name':
                            return <Name key={idx} item={item} scale={scale} />;
                          case 'email':
                            return <Email key={idx} item={item} scale={scale} />;
                          case 'company':
                            return <Company key={idx} item={item} scale={scale} />;
                          case 'title':
                            return <Title key={idx} item={item} scale={scale} />;
                          case 'text':
                            return <Text key={idx} item={item} scale={scale} />;
                          case 'checkbox':
                            return <Checkbox key={idx} item={item} scale={scale} />;
                          case 'radio':
                            return <Radio key={idx} item={item} scale={scale} />;
                          case 'dropdown':
                            return <Dropdown key={idx} item={item} scale={scale} />;
                          case 'drawing':
                            return <Drawing key={idx} item={item} scale={scale} />;
                          case 'formula':
                            return <Formula key={idx} item={item} scale={scale} />;
                          case 'attachment':
                            return <Attachment key={idx} item={item} scale={scale} />;
                          case 'note':
                            return <Note key={idx} item={item} scale={scale} />;
                          case 'approve':
                            return <Approve key={idx} item={item} scale={scale} />;
                          case 'decline':
                            return <Decline key={idx} item={item} scale={scale} />;
                          // case 'line':
                          //     return (
                          //         <LineBoard
                          //             key={idx}
                          //             item={item}
                          //         />
                          //     )
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
    </>
  );
}
