import React, { useContext } from 'react';
import { Input } from 'reactstrap';
import { DocumentContext } from '../../../../utility/context/Document';

export default function Radio({ item, isDone }) {
  const { setBoard } = useContext(DocumentContext);
  const handleCheckChanged = (checkItem) => {
    checkItem.checked = !checkItem.checked;
    setBoard((board) =>
      board.map((b) => {
        let x = b;
        if (x.id === item.id && x.type === item.type) {
          x.list.map((lst) => {
            if (lst.id === checkItem.id) {
              lst.checked = checkItem.checked;
            } else {
              if (checkItem.checked === true) {
                lst.checked = false;
              }
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
      id={`${item.type}-${item.DataLabel}-${item.id}`}
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
            type="radio"
            style={{
              // left: `${x.x}px`,
              // top: `${x === item.list[0] ? x.y : x.y + 23}px`,
             
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
