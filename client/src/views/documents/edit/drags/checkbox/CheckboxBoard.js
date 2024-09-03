import React, { useState, useContext, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { PlusSquare } from 'react-feather';
import { Button } from 'reactstrap';
import { DocumentContext } from '../../../../../utility/context/Document';

export default function CheckboxBoard({ item, handleDisabled,scale }) {
  // ** Contexts
  const {
    setOpenProps,
    setSelectedItem,
    setUndoList,
    selectedItem,
    undoList,
    isUndoRedo,
    setIsUndoRedo
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
  const onStartcb = (e, ui) => {
    e.stopPropagation();
  };

  const onDragcb = (e, ui) => {
    const temp = parentSize;
  

    setParentSize({
      width: temp.width + ui.deltaX,
      height: temp.height + ui.deltaY
    });
  };

  const onStopcb = (e, ui) => {
    const t = selectedItem?.list;

    const temp = t.map((z) => {
      if (String(z.id) === e.target.id.split('-')[0]) {
        z.x = ui.x;
        z.y = ui.y;
      }
      return z;
    });

    setSelectedItem({ ...selectedItem, list: temp });
  };

  //add new checkbox
  const handleAddCheckbox = () => {
    const temp = parentSize;
    setParentSize({ ...parentSize, height: temp.height + 23 });
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
    setOpenProps(true);
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
      onStart={onStart}
      onDrag={() => setOpenProps(true)}
      onStop={onStop}
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
          id={`${i.id}-${item.id}`}
          style={{
            backgroundColor: item.recipient.color,
            padding: '3px',
            width: '20px',
            paddingBottom: '0px',
            marginBottom:`${item.padding}px`,
            transform: `scale(${item.formatting / 100})`,
          }}
        >
          <input type="checkbox"  checked={i.checked} />
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
