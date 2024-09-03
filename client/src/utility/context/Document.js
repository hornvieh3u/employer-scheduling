import React, { createContext, useState } from 'react';

export const DocumentContext = createContext(null);

export const DocumentProvider = (props) => {
  const [board, setBoard] = useState([]);

  const [boardCurrent, setBoardCurrent] = useState([]);
  const [openProps, setOpenProps] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [recipients, setRecipients] = useState([]);
  const [url, setUrl] = useState({});
  const [documentFiles, setDocumentFiles] = useState([]);
  const [docMessage, setDocMessage] = useState({ subject: '', message: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [isOnlySigner, setIsOnlySigner] = useState(false);
  const [hashcode, setHashcode] = useState('');
  const [signatures, setSignatures] = useState([]);
  const [stamps, setStamps] = useState([]);
  const [signatureId, setSignatureId] = useState();
  const [signature, setSignature] = useState({});
  const [stamp, setStamp] = useState({});
  const [customFields, setCustomFields] = useState([]);
  const [redoList, setRedoList] = useState([]);
  const [undoList, setUndoList] = useState([]);
  const [isUndoRedo, setIsUndoRedo] = useState(false);
  const [documentTitle,setDocumentTitle] = useState('')

  return (
    <DocumentContext.Provider
      value={{
        recipients,
        setRecipients,
        board,
        setBoard,
        boardCurrent,
        setBoardCurrent,
        openProps,
        setOpenProps,
        selectedItem,
        setSelectedItem,
        url,
        setUrl,
        documentFiles,
        setDocumentFiles,
        docMessage,
        setDocMessage,
        currentPage,
        setCurrentPage,
        zoom,
        setZoom,
       
        isOnlySigner,
        setIsOnlySigner,
        hashcode,
        setHashcode,
        signatures,
        setSignatures,
        stamps,
        setStamps,
        signatureId,
        setSignatureId,
        signature,
        setSignature,
        stamp,
        setStamp,
        customFields,
        setCustomFields,
        undoList,
        setUndoList,
        redoList,
        setRedoList,
        isUndoRedo,
        setIsUndoRedo,
        documentTitle,
        setDocumentTitle
      }}
    >
      {props.children}
    </DocumentContext.Provider>
  );
};
