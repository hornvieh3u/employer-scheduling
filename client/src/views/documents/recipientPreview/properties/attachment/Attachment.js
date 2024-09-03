import React, { useContext, useEffect, useRef, useState } from 'react';
import { Check, Paperclip } from 'react-feather';
import { DocumentContext } from '../../../../../utility/context/Document';
import AttachmentModal from './AttachmentModal';

export default function Attachment({ item,  attachments, setAttachments, isDone }) {
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);

  const fileUpload = useRef();
  const { setBoard } = useContext(DocumentContext);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleFileUpload = () => {
    
    if (isDone === false) {

      if (item.list && item.list.length > 0) {
        toggleOpen();
      } else {
        fileUpload.current.click();
      }
    }
    else{
      if (item.list && item.list.length > 0) {
        toggleOpen();
      }
    }
    
  };
  const handleUploadNew = (e) => {
    
    setFiles(e.target.files)
    //fileUpload.current.click();
  };

  useEffect(() => {
    
    if (files.length > 0) {
      if (attachments.find((x) => x.id === item.id)) {
        const temp = attachments.filter((x) => x.id != item.id);
        setAttachments([...temp, { id: item.id, files: files }]);
        setBoard((board) =>
          board.map((b) => {
            if (b.id === item.id && b.type === item.type) {
              b.isDone = true;
            }
            return b;
          })
        );
      } else {
        setAttachments([...attachments, { id: item.id, files: files }]);
        setBoard((board) =>
          board.map((b) => {
            if (b.id === item.id && b.type === item.type) {
              b.isDone = true;
            }
            return b;
          })
        );
      }
    }
  }, [files]);

  return (
    <>
      {isDone === true?(<>
      <p className='text-success'> This Document contains attachment files</p>
      </>):(
        <>
        <div
        style={{
          left: `${item.left}px`,
          top: `${item.top}px`,
          width: '80px',
          height: '70px',
          position: 'absolute'
        }}
      >
        <input
          type="file"
          className="hidden"
          ref={fileUpload}
          multiple
          onChange={handleUploadNew}
          id={item.id}
        />
        <div
          className=" border border-dark text-center bg-primary"
          style={{
            paddingBottom: '5px',
            paddingTop: '5px',
            color: item.fontColor,
            font: item.font,
            fontSize: `${item.fontSize}px`,
            fontStyle: item.italic ? 'italic' : 'normal',
            fontWeight: item.bold ? 'bold' : 'normal',
            textDecoration: item.underline ? 'underline' : 'normal',
            transform: `scale(${item.formatting / 100})`,
            id: `${item.type}-${item.DataLabel}-${item.id}`,
            cursor: 'pointer'
          }}
          onClick={handleFileUpload}
        >
          Attachment
          <br />
          {files.length> 0 ? <Check/> :<Paperclip />}
        </div>
      </div>
      </>)}
      <AttachmentModal
        open={open}
        toggle={toggleOpen}
        files={item?.list}
        handleFileUpload={handleUploadNew}
        isDone ={isDone}
      />
    </>
  );
}
