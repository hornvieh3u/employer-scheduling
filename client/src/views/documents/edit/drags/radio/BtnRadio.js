import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { DocumentContext } from '../../../../../utility/context/Document';
import { Circle } from 'react-feather';

export default function BtnRadio({ customField }) {
  // ** Contexts

  const {
    recipients,
    board,
    setBoard,
    setOpenProps,
    setSelectedItem,
    currentPage,
    zoom,
    setIsUndoRedo
  } = useContext(DocumentContext);

  // ** States
  const [item, setItem] = useState();

  const onStart = (e) => {
    setIsUndoRedo(false);
  };

  const onStop = (e) => {
    const src = document.getElementById('dropDiv').getBoundingClientRect();
    const shouldDrop =
      e.clientX > src.left &&
      e.clientX < src.right &&
      e.clientY > src.top &&
      e.clientY < src.bottom;
    if (shouldDrop) {
      if (customField) {
        setItem({
          ...customField,
          left: (e.pageX - src.x) / zoom,
          top: (e.pageY - src.y) / zoom,
          id: board.length + 1,
          dataLabel: `Radio ${board.length + 1}`,
          page: currentPage,
          recipient: recipients.find((x) => x.active === true),
          
          icon: <Circle />
        });
      } else {
        setItem({
          type: 'radio',
          color: recipients.filter((x) => x.active === true)[0]?.color,
          _type: 'btn',
          title: 'Radio',
          icon: <Circle />,
          formatting: 100,
          tooltip: '',
          required: true,
          readOnly: false,
          bold: false,
          font: 'Arial',
          fontColor: 'black',
          fontSize: '12',
          italic: false,
          underline: false,
          left: (e.pageX - src.x) / zoom,
          top: (e.pageY - src.y) / zoom,
          id: board.length + 1,
          dataLabel: `Radio ${board.length + 1}`,
          page: currentPage,
          recipient: recipients.find((x) => x.active === true),
          
        });
      }

      //open props menu
      setOpenProps(true);
    }
  };
  useEffect(() => {
    if (item) {
      setBoard([...board, item]);
      setSelectedItem(item);
    }
  }, [item]);

  return (
    <>
      <div onDragEnd={onStop}
        draggable={true}
        onDragStart={onStart}
        style={{ position: 'relative' }}>
          <div className="d-block">
            <Button color="transparent" className="text-start w-100 ps-0">
              <Circle
                style={{
                  border: `solid 1px grey`,
                  padding: '2px',
                  borderRadius: '2px',
                  marginRight: '5px',
                  backgroundColor: recipients.filter((x) => x.active === true)[0]?.color
                }}
              />
              Radio
            </Button>
          </div>
        </div>
    </>
  );
}
