// ** React Imports
import { Fragment } from 'react';

// ** Icons Imports
import { ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Row, Col, Form, Button, Label, Input } from 'reactstrap';

// ** Components
import FileUploaderMultiple from '../createdoc/index';

// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss';

const UploadDoc = ({ stepper, type }) => {
  return (
    <Fragment>
      <FileUploaderMultiple />
    </Fragment>
  );
};

export default UploadDoc;
