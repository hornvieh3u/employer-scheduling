import React, { useState } from 'react';
import { Activity } from 'react-feather';
import DrawingModal from './DrawingModal';

export default function Drawing({ item, isDone }) {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    if (isDone === false) {
      setOpen(!open);
    }
  };

  return (
    <>
      <div
        className="box"
        style={{
          width: '100px',

          position: 'absolute',
          left: `${item.left}px`,
          top: `${item.top }px`
        }}
      >
        <div
          className=" border border-dark"
          style={{
            backgroundColor: 'white',
            color: item.fontColor,
            font: item.font,
            fontSize: `${item.fontSize}px`,
            fontStyle: item.italic ? 'italic' : 'normal',
            fontWeight: item.bold ? 'bold' : 'normal',
            textDecoration: item.underline ? 'underline' : 'normal',
            transform: `scale(${item.formatting / 100})`,
            width: '150px',
            height: '70px'
          }}
          onClick={toggle}
        >
          <Activity /> Drawing
          {item.signValue?.path && <img src={item.signValue.path} width="120" />}
        </div>
      </div>
      <DrawingModal open={open} toggle={toggle} item={item} />
    </>
  );
}
