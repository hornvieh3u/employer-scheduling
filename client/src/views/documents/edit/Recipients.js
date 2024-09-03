import React, { useState, useContext, useEffect } from 'react';
import { Circle } from 'react-feather';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown
} from 'reactstrap';
import { DocumentContext } from '../../../utility/context/Document';

export default function Recipients({ item }) {
  // ** States
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState({});

  // ** Context
  const { recipients, setRecipients, board, setBoard } = useContext(DocumentContext);

  const handleOpenDropDown = () => setDropdownOpen((prevState) => !prevState);

  const handleClick = (e) => {
  
    if (item) {
      const next = board.map((x) => {
        let r = x;
        if (x.id === item.id && x.type === item.type) {
          
          r = {...r,recipient:e}
        }
        return r;
      });
      setBoard(next);
      setSelectedValue(e);
    } else {
      const next = recipients.map((x) => {
        let r = x;
        if (x.id === e.id) {
          r = {...r,active:true}
        } else {
          r = {...r,active:false}
        }
        return r;
      });
      setRecipients(next);
      setSelectedValue({ ...e, active: true });
    }
  };

  useEffect(() => {
    if (item) {
      setSelectedValue(item.recipient);
    } else {
      setSelectedValue(recipients.find((x) => x.active === true));
    }
  }, [recipients, item]);

  return (
    <>
      {selectedValue && selectedValue.name != '' && (
        <UncontrolledButtonDropdown
          isOpen={dropdownOpen}
          toggle={handleOpenDropDown}
          className="w-100 mb-1"
          size="sm"
        >
          <DropdownToggle
            outline
            color="primary"
            caret
            className="w-100"
            style={{ borderRadius: 'none' }}
          >
            {selectedValue && (
              <>
                <Circle color={selectedValue.color} />
                <span className="px-2"> {selectedValue.name}</span>
              </>
            )}
          </DropdownToggle>
          <DropdownMenu className="w-100">
            {recipients &&
              recipients.map((item, idx) => (
                <DropdownItem key={idx} className="w-100" onClick={() => handleClick(item)}>
                  <Circle color={item.color} /> <span className="px-2">{item.name}</span>
                </DropdownItem>
              ))}
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      )}
    </>
  );
}
