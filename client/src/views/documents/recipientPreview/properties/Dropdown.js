import React, { useContext, useEffect } from 'react';
import { Input } from 'reactstrap';
import { DocumentContext } from '../../../../utility/context/Document';

export default function Dropdown({ item, isDone }) {
  const { setBoard } = useContext(DocumentContext);
  const handleChange = (e) => {
    setBoard((board) =>
      board.map((x) => {
        let b = x;
        if (b.id === item.id && b.type === item.type) {
          b.list.map((lst) => {
            if (lst.value == e.target.value) {
              lst.checked = true;
            } else {
              lst.checked = false;
            }
          });
          b.isDone = true;
        }
        return b;
      })
    );
  };
  return (
    <div>
      <Input
        style={{
          position: 'absolute',
          left: `${item.left}px`,
          top: `${item.top}px`,
          width: '150px',
          transform: `scale(${item.formatting / 100})`,
        }}
        id={item.dataLabel}
        type="select"
        onChange={handleChange}
        value={item.list?.find((x) => x.checked === true)?.value}
        disabled={isDone}
      >
        {item.list?.map((x) => {
          return (
            <option name={item.dataLabel} value={x.value} id={x.id} key={x.id}>
              {x.name}
            </option>
          );
        })}
      </Input>
    </div>
  );
}
