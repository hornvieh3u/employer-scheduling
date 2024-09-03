import React from 'react';
import { Framer } from 'react-feather';

export default function Formula({ item }) {
  return (
    <div
      className="box"
      style={{
        left: `${item.left}px`,
        top: `${item.top}px`,
        width: '100px',
        height: '50px',
        position: 'absolute'
      }}
    >
      <div
        className=" border border-dark text-center"
        style={{
          color: item.fontColor,
          font: item.font,
          fontSize: `${item.fontSize}px`,
          fontStyle: item.italic ? 'italic' : 'normal',
          fontWeight: item.bold ? 'bold' : 'normal',
          textDecoration: item.underline ? 'underline' : 'normal',
          transform: `scale(${item.formatting / 100})`,
          width: '70px',
          height: '50px'
        }}
      >
        <Framer /> {item?.addText}
      </div>
    </div>
  );
}
