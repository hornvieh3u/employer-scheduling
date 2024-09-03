import React, { useEffect } from 'react';

export default function Email({ item }) {
  return (
    <div
      style={{
        minWidth: '100px'
      }}
    >
      <div
        className="  text-center"
        style={{
          color: item.fontColor,
          font: item.font,
          fontSize: `${item.fontSize}px`,
          fontStyle: item.italic ? 'italic' : 'normal',
          fontWeight: item.bold ? 'bold' : 'normal',
          textDecoration: item.underline ? 'underline' : 'normal',
          transform: `scale(${item.formatting / 100})`,
          position: 'absolute',
          left: `${item.left}px`,
          top: `${item.top}px`
        }}
      >
        {item.recipient.email}
      </div>
    </div>
  );
}
