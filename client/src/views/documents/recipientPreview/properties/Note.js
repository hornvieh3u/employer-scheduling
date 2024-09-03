import React, { useEffect, useState } from 'react';
import { AlignLeft } from 'react-feather';

export default function Note({ item }) {
  // ** States
  const [state, setState] = useState(true);

  const handleState = () => {
    setState(!state);
  };

  return (
    <>
      {state ? (
        <div
          className="box "
          style={{
            width: '100px',
            position: 'absolute',
            left: `${item.left}px`,
            top: `${item.top}px`
          }}
        >
          <div
            className=" border border-dark bg-light"
            style={{
              color: item.fontColor,
              font: item.font,
              fontSize: `${item.fontSize}px`,
              fontStyle: item.italic ? 'italic' : 'normal',
              fontWeight: item.bold ? 'bold' : 'normal',
              textDecoration: item.underline ? 'underline' : 'normal',
              transform: `scale(${item.formatting / 100})`,
              width: '150px',
              minHeight: '80px',

              id: `${item.type}-${item.DataLabel}-${item.id}`
            }}
          >
            <AlignLeft onClick={handleState} style={{ cursor: 'pointer' }} />{' '}
            {item?.addText || 'Note'}
          </div>
        </div>
      ) : (
        <div
          className="box"
          style={{
            width: '100px',

            position: 'absolute',
            left: `${item.left}px`,
            top: `${item._type === 'btn' ? item.top : item.top + item.offset}px`
          }}
        >
          <div
            className=" border border-primary"
            style={{
              color: item.fontColor,
              font: item.font,
              fontSize: `${item.fontSize}px`,
              fontStyle: item.italic ? 'italic' : 'normal',
              fontWeight: item.bold ? 'bold' : 'normal',
              textDecoration: item.underline ? 'underline' : 'normal',
              transform: `scale(${item.formatting / 100})`,
              width: '35px',

              id: `${item.type}-${item.DataLabel}-${item.id}`
            }}
          >
            <AlignLeft
              onClick={handleState}
              style={{ cursor: 'pointer' }}
              className="text-primary"
            />
          </div>
        </div>
      )}
    </>
  );
}
