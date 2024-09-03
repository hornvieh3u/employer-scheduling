import React, { useState, useContext, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { PlusSquare } from 'react-feather';
import { Button } from 'reactstrap';
import { DocumentContext } from '../../../../../utility/context/Document';

export default function RadioBoard({ item, handleDisabled ,scale}) {
  // ** Contexts
  const {
    setOpenProps,
    setSelectedItem,
    setUndoList,
    undoList,
    isUndoRedo,
    setIsUndoRedo,

  } = useContext(DocumentContext);

  // ** States
  const [state, setState] = useState(item);
  const [defaultPosition, setDefaultPosition] = useState({
    x: item.left,
    y: item.top
  });
  const [checkboxes, setCheckboxes] = useState([
    { name: '', value: '', checked: false, id: '1', x: 0, y: 0 }
  ]);
  const [parentSize, setParentSize] = useState({ width: 50, height: 50 });

  const parent = useRef();
  const onStart = (e, ui) => {
    handleDisabled();
    setIsUndoRedo(false);
  };
  const onStop = (e, position) => {
    setOpenProps(true);
    setState({ ...item, top: position.y, left: position.x, _type: 'board' });
    handleDisabled();
  };
 
  //add new checkbox
  const handleAddCheckbox = () => {
    setCheckboxes([
      ...checkboxes,
      {
        name: '',
        value: '',
        checked: false,
        id: (checkboxes.length + 1).toString(),
        x: 0,
        y: 0
      }
    ]);

  };

  useEffect(() => {
    setSelectedItem(state);
    setUndoList([...undoList, state]);
  }, [state]);
  useEffect(() => {
    // setSelectedItem({...setSelectedItem,list:checkboxes})
    setState({ ...state, list: checkboxes });
  }, [checkboxes]);
  useEffect(() => {
    if (item.list) {
      setCheckboxes(item.list);
    }
  }, []);

  return (
    <Draggable
      bounds="parent"
      defaultPosition={defaultPosition}
      position={isUndoRedo ? { x: item.left, y: item.top }:{ x: state.left, y: state.top }}
      id={item.id}
      ref={parent}
      onStop={onStop}
      onStart={onStart}
      onDrag={() => setOpenProps(true)}
      scale={scale}
    >
      <div
        className="border box"
        style={{
          width: `${parentSize.width}px`,
          height: `${parentSize.height}px`,
          position: 'absolute'
        }}
      >
        {checkboxes.map((i, idx) => (
         
          <div
              className="box rounded"
              style={{
                backgroundColor: item.recipient.color,
                padding: '3px',
                width: '20px',
                paddingBottom: '0px',
                marginBottom:`${item.padding}px`,
                transform: `scale(${item.formatting / 100})`,
              }}
              id={`${i.id}-${item.id}`}
            >
              <input type="radio" checked={i.checked} />
              <br />
            </div>
        ))}

        <div className="text-center">
          <Button color="link" onClick={handleAddCheckbox}>
            <PlusSquare />
          </Button>
        </div>
      </div>
    </Draggable>
  );
}
