import * as PDFJS from 'pdfjs-dist/legacy/build/pdf';
import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { Copy, Minus, Plus, Trash } from 'react-feather';
import { FaRedo, FaUndo } from 'react-icons/fa';
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledButtonDropdown
} from 'reactstrap';
import ApproveBoard from './drags/approve/ApproveBoard';
import { DocumentContext } from '../../../utility/context/Document';
import PropertiesMenu from './drags/PropertiesMenu';
import AttachmentBoard from './drags/attachment/AttachmentBoard';
import SignBoard from './drags/sign/SignBoard';
import InitialBoard from './drags/initial/InitialBoard';
import StampBoard from './drags/stamp/StampBoard';
import SignDateBoard from './drags/signDate/SignDateBoard';
import NameBoard from './drags/name/NameBoard';
import EmailBoard from './drags/email/EmailBoard';
import CompanyBoard from './drags/company/CompanyBoard';
import TitleBoard from './drags/title/TitleBoard';
import CheckboxBoard from './drags/checkbox/CheckboxBoard';
import TextBoard from './drags/text/TextBoard';
import DropdownBoard from './drags/dropdown/DropdownBoard';
import DrawingBoard from './drags/drawing/DrawingBoard';
import FormulaBoard from './drags/formula/FormulaBoard';
import NoteBoard from './drags/note/NoteBoard';
import DeclineBoard from './drags/decline/DeclineBoard';
import RadioBoard from './drags/radio/RadioBoard';
import LineBoard from './drags/line/LineBoard';

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

export default function PdfViewer() {
  // ** States
  const [pageCnt, setPageCnt] = useState(0);
  const [pdfFile, setPdfFile] = useState();
  const [dropWidth, setDropWidth] = useState('100%');
  const [dropHeight, setDropHeight] = useState('100%');
  const [itemProps, setItemProps] = useState({});
  const [boardCurrent, setBoardCurrent] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
 

  // ** Reference
  const canvasRef = useRef(null);
  const parent = useRef(null);

  // ** Contexts
  const {
    board,
    setBoard,
    selectedItem,
    url,
    setSelectedItem,
    currentPage,
    setCurrentPage,
    undoList,
    setUndoList,
    redoList,
    setRedoList,
    setIsUndoRedo,
    zoom,setZoom
  } = useContext(DocumentContext);

  //** Functions
  const handleZoomDropdown = () => {
    setZoomOpen(!zoomOpen);
  };

  const handleZoomChange = (val) => {
    if (val === 0) {
      //zoomInstance.smoothZoom(0.5, 0, (isMobile ? 0.4 : 1) / zoom);
      setZoom(1);
    } else {
      //zoomInstance.smoothZoom(0.5, 0, val / zoom);
      setZoom(val);
    }
  };

  const handleDisabled = () => {
    setIsDisabled(!isDisabled);
  };
  const handlePageClick = (pageNumber) => {
    setIsUndoRedo(true);
    setSelectedItem({});
    renderPage(pageNumber);
    setCurrentPage(pageNumber);
  };

  const OnClickUndo = () => {
    if (undoList.length > 0) {
      setIsUndoRedo(true);
      setRedoList([...redoList, undoList[undoList.length - 1]]);
      if (undoList[undoList.length - 2]) {
        if (
          undoList[undoList.length - 2].id === undoList[undoList.length - 1].id &&
          undoList[undoList.length - 2].type === undoList[undoList.length - 2].type
        ) {
          let temp = board.map((b) => {
            let x = b;
            if (
              b.id === undoList[undoList.length - 2].id &&
              b.type === undoList[undoList.length - 2].type
            ) {
              x = undoList[undoList.length - 2];
            }
            return x;
          });
          setBoard(temp);
          setSelectedItem(undoList[undoList.length - 2]);
        } else {
          const item = board.find(
            (x) =>
              x.id === undoList[undoList.length - 1].id &&
              x.type === undoList[undoList.length - 1].type
          );
          const reverseItems = undoList.filter((x) => x.id === item.id && x.type === item.type);
          let reverseItem;
          if (reverseItems.length > 1) {
            reverseItem = reverseItems[reverseItems.length - 2];
            let temp = board.map((b) => {
              let x = b;
              if (b.id === reverseItem.id && b.type === reverseItem.type) {
                x = reverseItem;
              }
              return x;
            });
            setBoard(temp);
            setSelectedItem(reverseItem);
          } else {
            setBoard((board) =>
              board.filter(
                (x) =>
                  x.id !== undoList[undoList.length - 1].id &&
                  x.type !== undoList[undoList.length - 1].type
              )
            );
          }
        }
      } else {
        setBoard((board) =>
          board.filter(
            (x) =>
              x.id !== undoList[undoList.length - 1].id &&
              x.type !== undoList[undoList.length - 1].type
          )
        );
      }
      setUndoList(undoList.slice(0, -1));
    }
  };

  const OnClickRedo = () => {
    setIsUndoRedo(true);
    setUndoList([...undoList, redoList[redoList.length - 1]]);
    if (board.length > 0) {
      const items = board.filter(
        (x) =>
          x.id === redoList[redoList.length - 1].id && x.type === redoList[redoList.length - 1].type
      );
      if (items.length > 0) {
        setBoard((board) =>
          board.map((b) => {
            let x = b;
            if (
              x.id === redoList[redoList.length - 1].id &&
              x.type === redoList[redoList.length - 1].type
            ) {
              x = redoList[redoList.length - 1];
            }
            return x;
          })
        );
        setSelectedItem(redoList[redoList.length - 1]);
      } else {
        setBoard([...board, redoList[redoList.length - 1]]);
        setSelectedItem(redoList[redoList.length - 1]);
      }
    } else {
      setBoard([...board, redoList[redoList.length - 1]]);
      setSelectedItem(redoList[redoList.length - 1]);
    }
    setRedoList(redoList.slice(0, -1));
  };

  const onCopy = () => {
    let item = {
      ...selectedItem,
      x: selectedItem.x + 20,
      y: selectedItem.y + 20,
      id: selectedItem.id + 1,
      dataLabel: `${selectedItem.dataLabel}_copy`
    };
    setSelectedItem(item);
    setItemProps(item);
    setUndoList((undoList) => [...undoList, item]);
    setBoard((board) => [...board, item]);
  };

  const renderPage = useCallback(
    async (currentPage) => {
      if (pdfFile != null) {
        const page = await pdfFile.getPage(currentPage);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        setDropHeight(`${canvas.height}px`);
        setDropWidth(`${canvas.width}px`);
        const renderContext = { canvasContext, viewport };
        page.render(renderContext);
      }
    },
    [pdfFile]
  );

  const renderPages = useCallback(async () => {
    if (pdfFile != null && pageCnt > 0) {
      for (let index = 1; index <= pageCnt; index++) {
        const page = await pdfFile.getPage(index);
        const viewport = page.getViewport({ scale: 0.3 });
        const canvas = document.createElement('canvas');
        const canvasContext = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.id = index;
        const p = document.createElement('p');
        p.innerHTML = index;
        p.className = 'text-center';
        const div = document.createElement('div');
        div.className = 'text-center';
        div.appendChild(canvas);
        div.appendChild(p);
        div.addEventListener('click', () => handlePageClick(index));
        const renderContext = { canvasContext, viewport };
        page.render(renderContext);

        parent.current.appendChild(div);
      }
    }
  }, [pageCnt, pdfFile]);

  //loading pdf from url
  useEffect(() => {
    const loadingTask = PDFJS.getDocument(url.url);
    loadingTask.promise.then((loadedPdf) => {
      setPdfFile(loadedPdf);
      setPageCnt(loadedPdf.numPages);
    });
  }, []);

  //render page on canvas
  useEffect(() => {
    if (pdfFile != null) {
      renderPage(currentPage);
    }
  }, [canvasRef, pdfFile]);

  //render all pages on side menu
  useEffect(() => {
    if (pdfFile != null && pageCnt > 0) {
      renderPages();
    }
  }, [pageCnt]);

  useEffect(() => {
    setBoardCurrent(board.filter((b) => b.page === currentPage));
  }, [currentPage]);

  useEffect(() => {
    setBoardCurrent(board.filter((x) => x.page === currentPage));
  }, [board]);
  return (
    <>
      {
        <Row>
          <Col sm="10">
            <div className="w-100 text-center mb-1 d-flex justify-content-center">
              <Button
                color="link"
                className="px-1 py-0"
                onClick={OnClickUndo}
                disabled={undoList.length > 0 ? false : true}
              >
                <FaUndo />
              </Button>
              <Button
                color="link"
                className="px-1 py-0"
                onClick={OnClickRedo}
                disabled={redoList.length > 0 ? false : true}
              >
                <FaRedo />
              </Button>
              <Button
                color="link"
                className="px-1 py-0"
                onClick={onCopy}
                disabled={board.length > 0 ? false : true}
              >
                <Copy />
              </Button>
              <div>
                <UncontrolledButtonDropdown
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
            </div>

            <div>
              <div>
                <div
                  className="container-fluid mx-auto"
                  style={{
                    width: `${dropWidth + 50}px`,
                    overflow: 'hidden'
                  }}
                >
                  {/* style={{ transform: `scale(${zoom})`, transformOrigin: '0 0'  }} */}
                  <div style={{ overflowX: 'scroll' }}>
                    <div  style={{ transform: `scale(${zoom})`, transformOrigin: '0 0'  }}>
                     <div>
                     <div className="d-flex justify-content-center w-100 text-center" >
                        <canvas ref={canvasRef} />
                        <div
                          className="Board border-primary mx-0"
                          style={{
                            position: 'absolute',
                            display: 'block',
                            width: `${dropWidth}`,
                            height: `${dropHeight}`
                          }}
                          id="dropDiv"
                          onDragOver={(e)=>e.preventDefault()}
                        >
                          {board &&
                            boardCurrent &&
                            boardCurrent.length > 0 &&
                            boardCurrent.map((item, idx) => {
                              switch (item?.type) {
                                case 'sign':
                                  return (
                                    <SignBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                case 'initial':
                                  return (
                                    <InitialBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                case 'stamp':
                                  return (
                                    <StampBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                case 'signDate':
                                  return (
                                    <SignDateBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );

                                case 'name':
                                  return (
                                    <NameBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                case 'email':
                                  return (
                                    <EmailBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                case 'company':
                                  return (
                                    <CompanyBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                case 'title':
                                  return (
                                    <TitleBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                case 'text':
                                  return (
                                    <TextBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                case 'checkbox':
                                  return (
                                    <CheckboxBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                  
                                case 'radio':
                                  return (
                                    <RadioBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                case 'dropdown':
                                  return (
                                    <DropdownBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                case 'drawing':
                                  return (
                                    <DrawingBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                case 'formula':
                                  return (
                                    <FormulaBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                case 'attachment':
                                  return (
                                    <AttachmentBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                case 'note':
                                  return (
                                    <NoteBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                case 'approve':
                                  return (
                                    <ApproveBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                case 'decline':
                                  return (
                                    <DeclineBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                case 'line':
                                  return (
                                    <LineBoard
                                      key={idx}
                                      item={item}
                                      handleDisabled={handleDisabled}
                                      scale={zoom}
                                    />
                                  );
                                default:
                                  return <></>;
                              }
                            })}
                        </div>
                      </div>
                     </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col sm="2">
            <PropertiesMenu item={itemProps} />
            <div ref={parent}></div>
          </Col>
        </Row>
      }
    </>
  );
}
