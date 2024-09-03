import React, { useContext, useEffect, useState } from 'react';
import { Download } from 'react-feather';
import { UncontrolledTooltip } from 'reactstrap';
import { DocumentContext } from '../../../../../utility/context/Document';

import SignModal from './SignModal';

export default function Sign({ item, isDone }) {
  //** States */
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
    <>
      {item.signValue && item.signValue.path ? (
        <img
          src={item.signValue.path}
          style={{
            left: `${item.left}px`,
             top: `${item.top}px`,
            width: '130px',
            height: '70px',
            position: 'absolute',
            cursor: isDone ? 'default' : 'pointer',
            transform: `scale(${item.formatting / 100})`,
          }}
          id={`${item.type}-${item.DataLabel}-${item.id}`}
          onClick={toggle}
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

                cursor: 'pointer'
              }}
              onClick={toggle}
            >
              {item.autoplaceText ? `${item.autoplaceText}` : 'Sign'}
              <br />
              <Download />
            </div>
          </div>
          <UncontrolledTooltip placement="top" target={`${item.type}-${item.DataLabel}-${item.id}`}>
            {item.tooltip}
          </UncontrolledTooltip>
        </>
      )}
      <SignModal toggle={toggle} open={isOpen} type="signature" item={item} />
    </>
  );
}
