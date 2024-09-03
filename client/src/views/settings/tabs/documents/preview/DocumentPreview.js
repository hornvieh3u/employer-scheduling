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
import Drawing from '../recipientPreview/properties/Drawing/Drawing';
import Formula from '../recipientPreview/properties/Formula';
import Attachment from '../recipientPreview/properties/Attachment';
import Note from '../recipientPreview/properties/Note';
import Approve from '../recipientPreview/properties/Approve';
import Decline from '../recipientPreview/properties/decline/Decline';

export default function DocumentPreview({ recipient }) {
  const [pageCnt, setPageCnt] = useState(0);
  const [pdfFile, setPdfFile] = useState();
  const [boardDimention, setBoardDimention] = useState({ x: 0, y: 0 });
  // ** Context
  const { board, url, scale } = useContext(DocumentContext);

  const canvasRef = useRef([]);

  const renderPages = useCallback(async () => {
    if (pdfFile != null && pageCnt > 0) {
      for (let index = 0; index < pageCnt; index++) {
        const page = await pdfFile.getPage(index + 1);
        const viewport = page.getViewport({ scale: 1.5 * scale });
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
    //get document from localDB
    const pdf = decodeFromBase64(localStorage['pdf']);
    const loadingTask = PDFJS.getDocument(pdf);

    //const loadingTask = PDFJS.getDocument(url.url)
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
                  .filter((x) => x.page === i + 1 && x.recipient.email === recipient.email)
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
  );
}
