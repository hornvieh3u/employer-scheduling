// ** React Imports
import { useState, Fragment, useContext, useEffect } from 'react';

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

// ** Third Party Imports
import { useDropzone } from 'react-dropzone';
import { FileText, X, DownloadCloud } from 'react-feather';
import { DocumentContext } from '../../../../../../../utility/context/Document';
import { toast } from 'react-toastify';

const FileUploaderMultiple = () => {
  // ** State
  const [files, setFiles] = useState([]);
  const { setDocumentFiles } = useContext(DocumentContext);
  const fileTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      let accept = [];
      for (const f of acceptedFiles) {
        if (!fileTypes.includes(f.type)) {
          toast.error('Invalid file type. Only accept PDF, Word and Image');
        } else {
          accept.push(f);
        }
      }
      setFiles([...files, ...accept.map((file) => Object.assign(file))]);
    }
  });

  const renderFilePreview = (file) => {
    if (file.type.startsWith('image')) {
      return (
        <img
          className="rounded"
          alt={file.name}
          src={URL.createObjectURL(file)}
          height="28"
          width="28"
        />
      );
    } else {
      return <FileText size="28" />;
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`;
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`;
    }
  };

  const fileList = files.map((file, index) => (
    <ListGroupItem
      key={`${file.name}-${index}`}
      className="d-flex align-items-center justify-content-between"
    >
      <div className="file-details d-flex align-items-center">
        <div className="file-preview me-1">{renderFilePreview(file)}</div>
        <div>
          <p className="file-name mb-0">{file.name}</p>
          <p className="file-size mb-0">{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button
        color="danger"
        outline
        size="sm"
        className="btn-icon"
        onClick={() => handleRemoveFile(file)}
      >
        <X size={14} />
      </Button>
    </ListGroupItem>
  ));

  useEffect(() => {
    setDocumentFiles(files);
  }, [files]);

  return (
    <>
      <div {...getRootProps({ className: 'dropzone mb-1' })}>
        <input
          {...getInputProps()}
          accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*,.pdf,.docx"
        />
        <div className="d-flex align-items-center justify-content-center flex-column">
          <DownloadCloud size={64} />
          <h5>Drop Files here or click to upload</h5>
          <p className="text-secondary">
            You can choose from App{' '}
            <a href="/" onClick={(e) => e.preventDefault()}>
              Library
            </a>
          </p>
        </div>
      </div>
      {files.length ? (
        <Fragment>
          <ListGroup className="my-2">{fileList}</ListGroup>
        </Fragment>
      ) : null}
    </>
  );
};

export default FileUploaderMultiple;
