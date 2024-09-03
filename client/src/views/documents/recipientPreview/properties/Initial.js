import React, { useContext, useState, Fragment } from 'react';
import { Download } from 'react-feather';
import { UncontrolledTooltip } from 'reactstrap';
import { DocumentContext } from '../../../../utility/context/Document';
import SignModal from './sign/SignModal';

export default function Initial({ item, isDone }) {
  const [isOpen, setIsOpen] = useState(false);

  const { hashcode } = useContext(DocumentContext);

  const toggle = () => {
    if (!(item.recipient.hashCode != hashcode && item.isDone == true)) {
      if (isDone === false) {
        if (!item.readOnly) {
          setIsOpen(!isOpen);
        }
      }
    }
  };

  return (
    <Fragment>
      {item.signValue && item.signValue.path ? (
        <img
          onClick={toggle}
          src={item.signValue.path}
          style={{
            left: `${item.left}px`,
            top: `${item.top}px`,
            width: '70px',
            height: '60px',
            position: 'absolute',
            transform: `scale(${item.formatting / 100})`,
          }}
          id={`${item.type}-${item.DataLabel}-${item.id}`}
        />
      ) : (
        <>
          <div
            style={{
              left: `${item.left}px`,
              top: `${item.top}px`,
              width: '70px',
              height: '50px',
              position: 'absolute',
              transform: `scale(${item.formatting / 100})`,
            }}
          >
            <div
              className=" border border-dark text-center bg-primary"
              style={{
                color: item.fontColor,
                font: item.font,
                fontSize: `${item.fontSize}px`,
                fontStyle: item.italic ? 'italic' : 'normal',
                fontWeight: item.bold ? 'bold' : 'normal',
                textDecoration: item.underline ? 'underline' : 'normal',
                id: `${item.type}-${item.DataLabel}-${item.id}`,
                cursor: 'pointer'
              }}
              onClick={toggle}
            >
              {item.autoplaceText ? `${item.autoplaceText}` : 'Initial'}
              <br />
              <Download />
            </div>
          </div>
          {item.tooltip && (
            <UncontrolledTooltip
              placement="top"
              target={`${item.type}-${item.DataLabel}-${item.id}`}
            >
              {item.tooltip}
            </UncontrolledTooltip>
          )}
        </>
      )}
      <SignModal toggle={toggle} open={isOpen} type={'initial'} item={item} />
    </Fragment>
  );
}
