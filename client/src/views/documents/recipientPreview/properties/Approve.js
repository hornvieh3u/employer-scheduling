import React, { useRef, useEffect, useState, useContext, Fragment } from 'react';
import { Check } from 'react-feather';
import { Button, Row } from 'reactstrap';
import { DocumentContext } from '../../../../utility/context/Document';

export default function Approve({ item, isDone }) {
  // ** State
  const [state, setState] = useState(item.isDone || false);

  const { setBoard } = useContext(DocumentContext);

  const handleOnClick = () => {
    setBoard((board) =>
      board.map((b) => {
        let x = b;
        if (x.id === item.id && x.type === item.type) {
          x.isDone = !state;
        }
        return x;
      })
    );
    setState(!state);
  };
  return (
    <Fragment>
      {state === true ? (
        <div
          style={{
            position: 'absolute',
            width: '100px'
          }}
        >
          <Button
            color="success w-100"
            className=" border border-dark px-2 rounded "
            style={{
              left: `${item.left}px`,
              top: `${item.top}px`,

              color: item.fontColor,
              font: item.font,
              fontSize: `${item.fontSize}px`,
              fontStyle: item.italic ? 'italic' : 'normal',
              fontWeight: item.bold ? 'bold' : 'normal',
              textDecoration: item.underline ? 'underline' : 'normal',
              transform: `scale(${item.formatting / 100})`,
              position: 'absolute'
            }}
            onClick={handleOnClick}
            disabled={isDone}
          >
            Approve
          </Button>
        </div>
      ) : (
        <div
          style={{
            position: 'absolute',
            width: '100px'
          }}
        >
          <Button
            color="primary"
            className=" border border-dark px-2 rounded "
            style={{
              left: `${item.left}px`,
              top: `${item.top}px`,
              width: '100px',
              color: item.fontColor,
              font: item.font,
              fontSize: `${item.fontSize}px`,
              fontStyle: item.italic ? 'italic' : 'normal',
              fontWeight: item.bold ? 'bold' : 'normal',
              textDecoration: item.underline ? 'underline' : 'normal',
              transform: `scale(${item.formatting / 100})`,
              position: 'absolute'
            }}
            onClick={handleOnClick}
          >
            Approve
          </Button>
        </div>
      )}
    </Fragment>
  );
}
