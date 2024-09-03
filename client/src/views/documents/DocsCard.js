// ** Custom Components & Plugins
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { Star, Paperclip } from 'react-feather';

// ** Custom Component Import

// ** Utils
//import { htmlToString } from '@utils';

// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  UncontrolledDropdown
} from 'reactstrap';

const DocCard = (props) => {
  // ** Props
  const {
    doc,
    dispatch,
    selectDoc,
    labelColors,
    selectedDocs,
    handleDocClick,
    //handleMailReadUpdate,
    formatDateToMonthShort
  } = props;

  const [statusColor, setStatusColor] = useState('');
  // ** Function to render labels
  const renderLabels = (arr) => {
    if (arr && arr.length) {
      return arr.map(
        (label) =>
          labelColors[label] && (
            <span
              key={label}
              className={`my-auto bullet bullet-${labelColors[label]} bullet-sm mx-50`}
            ></span>
          )
      );
    }
  };

  // ** Function to handle read & mail click
  const onDocClick = () => {
    handleDocClick(doc.documentId);
  };

  useEffect(() => {
    //{doc.recipients.filter((x) => x.isDone === true).length} / {doc.recipients.length}
    if (doc.recipients.filter((x) => x.isDone === true).length === 0) {
      setStatusColor('light-danger');
    } else if (doc.recipients.length === doc.recipients.filter((x) => x.isDone === true).length) {
      setStatusColor('light-success');
    } else {
      setStatusColor('light-warning');
    }
  }, [doc]);
  return (
    <>
      <li
        onClick={() => onDocClick(doc.documentId)}
        className={classnames('d-flex user-mail', {
          'mail-read': doc?.hasViewed
        })}
      >
        <div className="mail-left pe-50">
          <div className="user-action">
            <div className="form-check">
              <Input
                type="checkbox"
                id={`${doc.documentId}`}
                onChange={(e) => e.stopPropagation()}
                checked={selectedDocs.includes(doc.documentId)}
                onClick={(e) => {
                  dispatch(selectDoc(doc.documentId));
                  e.stopPropagation();
                }}
              />
              <Label onClick={(e) => e.stopPropagation()} for={`${doc.documentId}`}></Label>
            </div>
          </div>
        </div>

        <div className="mail-body">
          <div className="mail-details">
            <div className="mail-items ">
              <span className="text-truncate">{doc.title && doc.title!==''? doc.title : doc.documentDetails?.name}</span>
            </div>
            <div className="d-flex justify-content-end">
              {doc.tags.includes('attachment') ? <Paperclip size={14} /> : null}

              {renderLabels(doc.tags)}
              {doc.tags.map((x,idx) => {
                if (['inbox', 'sent', 'draft', 'voided'].includes(x)) {
                  return (
                    <span className="me-1" key={idx}>
                    <Badge className="text-capitalize" color="secondary" pill>
                      {x}
                    </Badge>
                  </span>
                  );
                } else {
                  return null;
                }
              })}

              <span className="me-1">
                <Badge className="text-capitalize" color={statusColor} pill>
                  {doc.recipients.filter((x) => x.isDone === true).length} / {doc.recipients.length}{' '}
                  done
                </Badge>
              </span>

              <span className="mail-date">{formatDateToMonthShort(doc.createdAt)}</span>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default DocCard;
