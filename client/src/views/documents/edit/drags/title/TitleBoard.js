import React, { useState, useContext, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { Input } from 'reactstrap';
import { DocumentContext } from '../../../../../utility/context/Document';

export default function TitleBoard({ item, handleDisabled,scale }) {
  const drag = useRef();
  // ** Contexts
  const { setOpenProps, setSelectedItem, setUndoList, undoList, isUndoRedo, setIsUndoRedo } =
    useContext(DocumentContext);

  // ** States
  const [state, setState] = useState(item);
  const [defaultPosition, setDefaultPosition] = useState({
    x: item.left,
    y: item.top
  });

  const onStart = (e, ui) => {
    handleDisabled();
    setIsUndoRedo(false);
  };
  const onStop = (e, position) => {
    setOpenProps(true);
    setState({ ...item, top: position.y, left: position.x, _type: 'board' });

    handleDisabled();
  };

  useEffect(() => {
    setSelectedItem(state);
    setUndoList([...undoList, state]);
  }, [state]);

  return (
    <Draggable
      bounds="parent"
      defaultPosition={defaultPosition}
      position={isUndoRedo ? { x: item.left, y: item.top }:{ x: state.left, y: state.top }}
      id={item.id}
      onStop={onStop}
      onStart={onStart}
      ref={drag}
      onDrag={() => setOpenProps(true)}
      scale={scale}
    >
      <div className="box" style={{ width: '150px' ,position:"absolute" }}>
        <Input
          className=" border border-dark text-center"
          style={{
            color: item.fontColor,
            fontFamily: item.font,
            fontSize: `${item.fontSize}px`,
            fontStyle: item.italic ? 'italic' : 'normal',
            fontWeight: item.bold ? 'bold' : 'normal',
            textDecoration: item.underline ? 'underline' : 'normal',
            transform: `scale(${item.formatting / 100})`,
            backgroundColor: item.recipient.color
          }}
          placeholder="Title"
          value="Title"
          disabled="true"
        />
      </div>
    </Draggable>
  );
}
