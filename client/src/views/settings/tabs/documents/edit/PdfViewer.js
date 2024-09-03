import { decodeFromBase64 } from 'pdf-lib';
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf';
import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { Copy } from 'react-feather';
import { FaRedo, FaUndo } from 'react-icons/fa';
import {
  Button,
  Col,
  Dropdown,
  Row,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Card
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

//import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;
export default function PdfViewer() {
  // ** States
  const [zoomOpen, setzoomOpen] = useState(false);
  const [pageCnt, setPageCnt] = useState(0);
  const [pdfFile, setPdfFile] = useState();

  const [indexUndoRedo, setIndexUndoRedo] = useState(1);
  const [isChanged, setIsChanged] = useState(false);
  const [zoom, setZoom] = useState(5);
  const [dropWidth, setDropWidth] = useState('100%');
  const [dropHeight, setDropHeight] = useState('100%');
  const [itemProps, setItemProps] = useState({});
  const [boardCurrent, setBoardCurrent] = useState([]);
  // ** Reference
  const canvasRef = useRef(null);
  const parent = useRef(null);
  // ** Contexts
  const {
    board,
    setBoard,
    openProps,
    setOpenProps,
    boardAll,
    setBoardAll,
    selectedItem,
    url,
    setSelectedItem,
    setScale,
    scale,
    currentPage,
    setCurrentPage
  } = useContext(DocumentContext);

  //** Functions
  const handleZoomDropdown = () => setzoomOpen((prevState) => !prevState);
  const handleChangeZoom = (value) => setZoom(value);
  const handlePageClick = (pageNumber) => {
    renderPage(pageNumber);
    //update page properties
    setCurrentPage(pageNumber);
    //get new page previous properties
  };

  const OnClickUndo = () => {
    var index = indexUndoRedo;
    if (isChanged) {
      index = 1;
    }
    if (board.length > 0 && boardAll.length - index - 1 >= 0) {
      var undo = boardAll[boardAll.length - index - 1];
      var last = boardAll[boardAll.length - index];
      if (last.id === undo.id && last.type === undo.type) {
        setBoard((board) =>
          board.map((x) => {
            if (x.id === undo.id && x.type === undo.type) {
              x = undo;
            }
            return x;
          })
        );
      } else {
        const tempBoardLast = boardAll.filter((x) => x.id === last.id && x.type === last.type);
        const existsInBoard = board.find((x) => x.id === last.id && x.type === last.type);
        if (existsInBoard != undefined) {
          //indexoflast element
          const i = tempBoardLast.findIndex(
            (x) => x.left === existsInBoard.left && x.top === existsInBoard.top
          );
          if (i > 0) {
            setBoard((board) =>
              board.map((x) => {
                if (x.id === existsInBoard.id && x.type === existsInBoard.type) {
                  x = tempBoardLast[i - 1];
                }
                return x;
              })
            );
          } else if (i === 0) {
            setBoard(
              board.filter((x) => x.id !== existsInBoard.id && x.type !== existsInBoard.type)
            );
          }
        }
      }

      setIndexUndoRedo(index + 1);
      setIsChanged(false);
    } else if (board.length > 0 && boardAll.length - index - 1 < 0) {
      setBoard(() => []);
      setBoardAll(() => []);
      setIndexUndoRedo(1);
      setIsChanged(true);
    }
    //setSelectedItem(board.find((x)=>x.id===selectedItem.id && x.type===selectedItem.type))
  };
  const OnClickRedo = () => {
    var index = indexUndoRedo;
    if (isChanged) {
      //redo deactive
      index = 1;
    }

    if (boardAll.length - index + 1 > 0) {
      var redo = boardAll[boardAll.length - index + 1];
      var last = boardAll[boardAll.length - index];

      if (redo.id === last.id && redo.type === last.type) {
        setBoard((board) =>
          board.map((x) => {
            if (x.id === last.id && x.type === last.type) {
              x = redo;
            }
            return redo;
          })
        );
      } else {
        setBoard((board) =>
          board.map((x) => {
            if (x.id === redo.id && x.type === redo.type) {
              x = redo;
            }
            return x;
          })
        );
      }

      setIndexUndoRedo(index + 1);
      setIsChanged(false);
    } else {
      setIsChanged(true);
      setIndexUndoRedo(1);
    }
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
    setBoardAll((boardAll) => [...boardAll, item]);
    setIsChanged(true);
    setBoard((board) => [...board, item]);
  };

  const renderPage = useCallback(
    async (currentPage) => {
      if (pdfFile != null) {
        const page = await pdfFile.getPage(currentPage);
        let s = zoom;
        if (zoom === 5) {
          const parent = canvasRef.current.parentElement;
          s = parent.offsetWidth / page.getViewport({ scale: 1.5 }).width;
        }
        setScale(s);
        const viewport = page.getViewport({ scale: 1.5 * s });

        // Prepare canvas using PDF page dimensions.
        const canvas = canvasRef.current;

        const canvasContext = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        setDropHeight(`${canvas.height}px`);
        setDropWidth(`${canvas.width}px`);
        // Render PDF page into canvas context.
        const renderContext = { canvasContext, viewport };
        page.render(renderContext);
      }
    },
    [zoom, pdfFile]
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
        // div.onclick = handlePageClick(canvas.id)
        div.addEventListener('click', () => handlePageClick(index));
        const renderContext = { canvasContext, viewport };
        page.render(renderContext);

        parent.current.appendChild(div);
      }
    }
  }, [pageCnt, pdfFile]);

  //loading pdf from url
  useEffect(() => {
    //get document from localDB
    //const pdf = decodeFromBase64(localStorage['pdf'])
    //const loadingTask = PDFJS.getDocument(pdf)

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
  }, [zoom, canvasRef, pdfFile]);

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
  useEffect(() => {
    setBoard(
      board.map((b) => {
        const temp = b;
        return {
          ...b,
          left: (temp.left * scale) / temp.scale,
          top: (temp.top * scale) / temp.scale,
          formatting: scale * 100,
          scale: scale
        };
      })
    );
  }, [scale]);
  return (
    <>
      <Row>
        <Col sm="10">
          <div className="w-100 text-center">
            <Button
              color="link"
              className="px-1 py-0"
              onClick={OnClickUndo}
              disabled={board.length > 0 ? false : true}
            >
              <FaUndo />
            </Button>
            <Button
              color="link"
              className="px-1 py-0"
              onClick={OnClickRedo}
              disabled={indexUndoRedo > 1 ? false : true}
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
            <Dropdown
              isOpen={zoomOpen}
              toggle={handleZoomDropdown}
              direction="bottom"
              className=" border-dark text-start d-inline-block"
              style={{ width: '160px' }}
            >
              <DropdownToggle
                caret
                className="w-100"
                style={{ borderRadius: 'none' }}
                color="light-1-secondary"
              >
                {zoom && (zoom === 5 ? 'Fit to window' : `${zoom * 100} %`)}
              </DropdownToggle>
              <DropdownMenu className="w-100">
                <DropdownItem className="w-100" onClick={() => handleChangeZoom(0.25)}>
                  25%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleChangeZoom(0.5)}>
                  50%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleChangeZoom(0.75)}>
                  75%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleChangeZoom(1.0)}>
                  100%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleChangeZoom(1.25)}>
                  125%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleChangeZoom(1.5)}>
                  150%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleChangeZoom(2.0)}>
                  200%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleChangeZoom(4.0)}>
                  400%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleChangeZoom(5)}>
                  Fit to window
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="d-flex justify-content-center">
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
            >
              {boardCurrent.length > 0 &&
                boardCurrent.map((item, idx) => {
                  switch (item?.type) {
                    case 'sign':
                      return <SignBoard key={idx} item={item} scale={scale} />;
                    case 'initial':
                      return <InitialBoard key={idx} item={item} scale={scale} />;
                    case 'stamp':
                      return <StampBoard key={idx} item={item} scale={scale} />;
                    case 'signDate':
                      return <SignDateBoard key={idx} item={item} scale={scale} />;

                    case 'name':
                      return <NameBoard key={idx} item={item} scale={scale} />;
                    case 'email':
                      return <EmailBoard key={idx} item={item} scale={scale} />;
                    case 'company':
                      return <CompanyBoard key={idx} item={item} scale={scale} />;
                    case 'title':
                      return <TitleBoard key={idx} item={item} scale={scale} />;
                    case 'text':
                      return <TextBoard key={idx} item={item} scale={scale} />;
                    case 'checkbox':
                      return <CheckboxBoard key={idx} item={item} scale={scale} />;
                    case 'radio':
                      return <RadioBoard key={idx} item={item} scale={scale} />;
                    case 'dropdown':
                      return <DropdownBoard key={idx} item={item} scale={scale} />;
                    case 'drawing':
                      return <DrawingBoard key={idx} item={item} scale={scale} />;
                    case 'formula':
                      return <FormulaBoard key={idx} item={item} scale={scale} />;
                    case 'attachment':
                      return <AttachmentBoard key={idx} item={item} scale={scale} />;
                    case 'note':
                      return <NoteBoard key={idx} item={item} scale={scale} />;
                    case 'approve':
                      return <ApproveBoard key={idx} item={item} scale={scale} />;
                    case 'decline':
                      return <DeclineBoard key={idx} item={item} scale={scale} />;
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
          </div>
        </Col>
        <Col sm="2">
          <PropertiesMenu item={itemProps} />
          <div ref={parent}></div>
        </Col>
      </Row>
    </>
  );
}
