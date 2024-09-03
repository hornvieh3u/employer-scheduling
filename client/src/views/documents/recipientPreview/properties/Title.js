import React, { useContext, useEffect, useState } from 'react';
import { Input } from 'reactstrap';
import { DocumentContext } from '../../../../utility/context/Document';

export default function Title({ item, isDone }) {
  // ** State
  const [state, setState] = useState(item);

  const { board, setBoard } = useContext(DocumentContext);

  const handleStateChanged = (e) => {
    setState({ ...state, addText: e.target.value });
  };

  useEffect(() => {
    if (state.addText) {
      setBoard((board) =>
        board.map((b) => {
          let x = b;
          if (b.id === item.id && b.type === item.type) {
            if (state.addText != 'Title') {
              x = { ...x, addText: state.addText, isDone: true };
            } else {
              x = { ...x, addText: state.addText, isDone: false };
            }
          }
          return x;
        })
      );
    }
  }, [state]);
  return (
    <div
      style={{
        position: 'absolute',
        width: '150px',
        left: `${item.left}px`,
        top: `${item.top}px`,
      }}
      id={`${item.type}-${item.DataLabel}-${item.id}`}
    >
      {isDone === true ? (
        <p
          style={{
            color: item.fontColor,
            fontFamily: item.font,
            fontSize: `${item.fontSize}px`,
            fontStyle: item.italic ? 'italic' : 'normal',
            fontWeight: item.bold ? 'bold' : 'normal',
            textDecoration: item.underline ? 'underline' : 'normal',
            transform: `scale(${item.formatting / 100})`
          }}
        >
          {state.addText}
        </p>
      ) : (
        <Input
          className=" border border-dark text-center"
          style={{
            color: item.fontColor,
            fontFamily: item.font,
            fontSize: `${item.fontSize}px`,
            fontStyle: item.italic ? 'italic' : 'normal',
            fontWeight: item.bold ? 'bold' : 'normal',
            textDecoration: item.underline ? 'underline' : 'normal',
            transform: `scale(${item.formatting / 100})`
          }}
          placeholder="Title"
          value={state.addText || ''}
          onChange={handleStateChanged}
        />
      )}
    </div>
  );
}
