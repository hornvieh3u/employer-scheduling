import React, {  useState } from 'react';

import { Modal } from 'reactstrap';
import MainNav from './MainNav';
import Editor from './Editor';

export default function EditModal({ toggle, open,form }) {
  const [isBlock, setIsBlock] = useState(false);
  const [isStyle, setIsStyle] = useState(false);
  const [isLayers, setIsLayers] = useState(false);
  const [device,setDevice] = useState('desktop');
  const [editor, setEditor] = useState(null);

  const toggleBlocks = (val) => {
    setIsBlock(val);
  };
  const toggleStyles = (val) => {
    setIsStyle(val);
  };
  const toggleLayers = (val) => {
    setIsLayers(val);
  };

  return (
    <>
      <Modal isOpen={open} toggle={toggle} fullscreen scrollable style={{ overflowX: 'hidden' }}>
        <div className="bg-light" style={{ paddingTop: '5px', paddingBottom: '5px' }}>
          <MainNav 
          toggle={toggle} 
          isOpen={open} 
          toggleBlocks={toggleBlocks}
          toggleLayers={toggleLayers}
          toggleStyles={toggleStyles}
          isBlock={isBlock}
          isStyle={isStyle}
          isLayers = {isLayers}
          setDevice={setDevice}
          editor ={editor}
          />
        </div>
        <div className="p-0">
          <Editor 
          toggleBlocks={toggleBlocks}
          toggleLayers={toggleLayers}
          toggleStyles={toggleStyles}
          editor={editor}
          setEditor={setEditor}
          isBlocks={isBlock}
          isLayers={isLayers}
          isStyles={isStyle}
          form = {form}
          device={device}
           />
        </div>
      </Modal>
    </>
  );
}
