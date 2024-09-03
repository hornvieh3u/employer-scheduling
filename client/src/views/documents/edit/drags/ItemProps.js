import React, { useContext, useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import SlideDown from 'react-slidedown';
import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import Repeater from '../../../../@core/components/repeater';
import { DocumentContext } from '../../../../utility/context/Document';

export default function ItemProps() {
  // ** State
  const [count, setCount] = useState(1);
  const [items, setItems] = useState([]);
  // ** Context
  const { board, boardCurrent, selectedItem, setSelectedItem } = useContext(DocumentContext);

  const handleAddNew = () => {
    setCount(count + 1);
  };

  const handleOnChange = (e) => {
    const f = e.target.closest('form');
    let tempItem = items;
    tempItem = items?.map((item) => {
      let temp = item;
      if (String(temp.id) === f.id) {
        switch (e.target.name) {
          case 'value':
            temp = {...temp,value:e.target.value}
            
            break;
          case 'name':
            temp = {...temp,name:e.target.value}
            
            break;
          default:
            break;
        }
      }
      return temp;
    });
    setItems(tempItem);
    setSelectedItem({ ...selectedItem, list: tempItem });
  };
  useEffect(() => {
    if (selectedItem.type === 'dropdown') {
      setItems([...items, { id: count, name: '', value: '' }]);
    } else {
      setItems(selectedItem.list);
    }
  }, [count]);
  useEffect(() => {
    if (selectedItem.list && selectedItem.list.length > 0) {
      setCount(selectedItem.list.length);
    }
  }, [selectedItem]);

  return (
    <>
      <Repeater count={count}>
        {(i) => {
          const Tag = i === 0 ? 'div' : SlideDown;
          return (
            <Tag key={i}>
              <Form id={i + 1}>
                <Row>
                  <Col md={6}>
                    <Label className="form-label">Value</Label>
                    <Input
                      type="text"
                      name="value"
                      value={selectedItem.list && selectedItem?.list[i]?.value}
                      onChange={handleOnChange}
                    />
                  </Col>
                  <Col md={6}>
                    <Label className="form-label">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      onChange={handleOnChange}
                      value={selectedItem.list && selectedItem?.list[i]?.name}
                    />
                  </Col>
                </Row>
              </Form>
            </Tag>
          );
        }}
      </Repeater>
      <Button
        className="btn-icon ms-1 mb-2 mt-1 "
        style={{ padding: '2px' }}
        color="primary"
        onClick={handleAddNew}
      >
        <Plus />
      </Button>
    </>
  );
}
