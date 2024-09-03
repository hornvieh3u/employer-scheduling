import React, { useState, useContext, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { AlignLeft, Check } from 'react-feather';
import { DocumentContext } from '../../../../../utility/context/Document';

export default function NoteBoard({ item, zoom }) {
  // ** Contexts
  const { setOpenProps, setSelectedItem, setBoardAll } = useContext(DocumentContext);

  // ** States
  const [state, setState] = useState(item);
  const [defaultPosition, setDefaultPosition] = useState({
    x: item.left,
    y: item.top - item.offset
  });

  const dragRef = useRef();

  const onStart = () => {
    setDefaultPosition({ x: 0, y: 0 });
  };
  const onStop = (e, position) => {
    setOpenProps(true);
    setState({ ...item, top: position.y, left: position.x, _type: 'board' });
  };

  useEffect(() => {
    setSelectedItem(state);
    setBoardAll((boardAll) => [...boardAll, state]);
  }, [state]);
  return (
    <Draggable
      defaultPosition={defaultPosition}
      id={item.id}
      onStop={onStop}
      //position={{x:item.left,y:item.top}}
      //bounds="parent"
      ref={dragRef}
      onStart={onStart}
      style={{ transform: `scale(${zoom})` }}
      onDrag={() => setOpenProps(true)}
    >
      <div className="box" style={{ width: '100px' }}>
        <div
          className=" border border-dark"
          style={{
            backgroundColor: item.recipient.color,
            color: item.fontColor,
            font: item.font,
            fontSize: `${item.fontSize}px`,
            fontStyle: item.italic ? 'italic' : 'normal',
            fontWeight: item.bold ? 'bold' : 'normal',
            textDecoration: item.underline ? 'underline' : 'normal',
            transform: `scale(${item.formatting / 100})`,
            width: '100px',
            height: '50px'
          }}
        >
          <AlignLeft /> Note
        </div>
      </div>
    </Draggable>
  );
}
