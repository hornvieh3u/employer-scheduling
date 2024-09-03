import React, { useContext } from 'react';
import { Input } from 'reactstrap';
import { DocumentContext } from '../../../../utility/context/Document';

export default function Checkbox({ item, isDone }) {
  const { setBoard } = useContext(DocumentContext);
  const handleCheckChanged = (checkItem) => {
    setBoard((board) =>
      board.map((b) => {
        let x = b;
        if (x.id === item.id && x.type === item.type) {
          x.list.map((lst) => {
            if (lst.id === checkItem.id) {
              lst.checked = !lst.checked;
            }
          });
          x.isDone = true;
        }
        return x;
      })
    );
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: `${item.left}px`,
        top: `${item.top}px`,
        transform: `scale(${item.formatting / 100})`,
      }}
    >
      {item.list.map((x, idx) => {
        return (
         <>
          <Input
            key={idx}
            name={item.dataLabel}
            type="checkbox"
            style={{
              marginBottom:`${item.padding}px`
            }}
            value={x.value}
            onChange={() => handleCheckChanged(x)}
            checked={x.checked}
            disabled={isDone}
          />
          <br/>
         </>
        );
      })}
    </div>
  );
}
