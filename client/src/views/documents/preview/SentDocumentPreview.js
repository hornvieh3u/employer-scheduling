import React, { useContext, useRef, useState, useCallback, useEffect } from 'react';
import SlideDown from 'react-slidedown';
import Repeater from '../../../@core/components/repeater';
import { DocumentContext } from '../../../utility/context/Document';
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf';
import { decodeFromBase64 } from 'pdf-lib';
import Sign from '../recipientPreview/properties/sign/Sign';
import Initial from '../recipientPreview/properties/Initial';
import Stamp from '../recipientPreview/properties/stamp/Stamp';
import SignedDate from '../recipientPreview/properties/SignedDate';
import Name from '../recipientPreview/properties/Name';
import Email from '../recipientPreview/properties/Email';
import Company from '../recipientPreview/properties/Company';
import Title from '../recipientPreview/properties/Title';
import Text from '../recipientPreview/properties/Text';
import Checkbox from '../recipientPreview/properties/Checkbox';
import Radio from '../recipientPreview/properties/Radio';
import Dropdown from '../recipientPreview/properties/Dropdown';
import Drawing from '../recipientPreview/properties/drawing/Drawing';
import Formula from '../recipientPreview/properties/Formula';
import Attachment from '../recipientPreview/properties/attachment/Attachment';
import Note from '../recipientPreview/properties/Note';
import Approve from '../recipientPreview/properties/Approve';
import Decline from '../recipientPreview/properties/decline/Decline';
import Line from '../recipientPreview/properties/Line';
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

export default function SentDocumentPreview({ recipient,isAll, boardDimention,setBoardDimention }) {
  const [pageCnt, setPageCnt] = useState(0);
  const [pdfFile, setPdfFile] = useState();
 
  // ** Context
  const { board, url } = useContext(DocumentContext);

  const canvasRef = useRef([]);


  const renderPages = useCallback(async () => {
    if (pdfFile != null && pageCnt > 0) {
      for (let index = 0; index < pageCnt; index++) {
        const page = await pdfFile.getPage(index + 1);
        const viewport = page.getViewport({ scale: 1.5 });
        //const canvas = document.createElement('canvas')
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

  useEffect(() => {
    
    const loadingTask = PDFJS.getDocument(url.url);
    loadingTask.promise.then((loadedPdf) => {
      setPdfFile(loadedPdf);
      setPageCnt(loadedPdf.numPages);
    });
  }, []);
  //render page on canvas
  useEffect(() => {
    if (pdfFile != null && pageCnt > 0) {
      renderPages();
    }
  }, [pageCnt, canvasRef]);

  return (
    <div className="d-flex justify-content-center" >
      <div id='pageContainer'>
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
                {(isAll===true?board
                  .filter((x) => x.page === i + 1):board
                  .filter((x) => x.page === i + 1 && x.recipient.email === recipient.email))
                  .map((item, idx) => {
                    switch (item?.type) {
                      case 'sign':
                        return <Sign key={idx} item={item} />;
                      case 'initial':
                        return <Initial key={idx} item={item} />;
                      case 'stamp':
                        return <Stamp key={idx} item={item} />;
                      case 'signDate':
                        return <SignedDate key={idx} item={item} />;

                      case 'name':
                        return <Name key={idx} item={item} />;
                      case 'email':
                        return <Email key={idx} item={item} />;
                      case 'company':
                        return <Company key={idx} item={item} />;
                      case 'title':
                        return <Title key={idx} item={item} />;
                      case 'text':
                        return <Text key={idx} item={item} />;
                      case 'checkbox':
                        return <Checkbox key={idx} item={item} />;
                      case 'radio':
                        return <Radio key={idx} item={item} />;
                      case 'dropdown':
                        return <Dropdown key={idx} item={item} />;
                      case 'drawing':
                        return <Drawing key={idx} item={item} />;
                      case 'formula':
                        return <Formula key={idx} item={item} />;
                      case 'attachment':
                        return <Attachment key={idx} item={item} />;
                      case 'note':
                        return <Note key={idx} item={item} />;
                      case 'approve':
                        return <Approve key={idx} item={item} />;
                      case 'decline':
                        return <Decline key={idx} item={item} />;
                      case 'line':
                          return (
                              <Line
                                  key={idx}
                                  item={item}
                              />
                          )
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
  );
}
