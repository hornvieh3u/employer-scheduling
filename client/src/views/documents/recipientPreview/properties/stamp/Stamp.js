import React, { Fragment, useContext, useState } from 'react';
import { Award } from 'react-feather';
import { DocumentContext } from '../../../../../utility/context/Document';
import StampModal from './StampModal';

export default function Stamp({ item, isDone }) {
  // ** States
  const [isOpen, setIsOpen] = useState(false);

  const { hashcode } = useContext(DocumentContext);

  // ** Functions
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
          src={item.signValue.path}
          style={{
            left: `${item.left}px`,
            top: `${item.top}px`,
            width: '130px',
            height: '70px',
            position: 'absolute',
            transform: `scale(${item.formatting / 100})`,
          }}
          id={`${item.type}-${item.DataLabel}-${item.id}`}
          onClick={toggle}
        />
      ) : (
        <div
          style={{
            left: `${item.left}px`,
            top: `${item.top}px`,
            width: '70px',
            height: '50px',
            position: 'absolute',
            transform: `scale(${item.formatting / 100})`,
          }}
          id={`${item.type}-${item.DataLabel}-${item.id}`}
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
            Stamp
            <br />
            <Award />
          </div>
        </div>
      )}

      <StampModal open={isOpen} toggle={toggle} item={item} />
    </Fragment>
  );
}
