import React, { useState } from 'react';
import { Eye, X } from 'react-feather';
import { BiMobile } from 'react-icons/bi';
import { FaBox, FaLayerGroup, FaPaintBrush } from 'react-icons/fa';
import { MdOutlineDesktopMac, MdOutlineTablet } from 'react-icons/md';
import { Button, Collapse, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap';

export default function MainNav({ toggle,isOpen, toggleBlocks,toggleStyles,toggleLayers,setDevice,isBlock,isStyle,isLayers,editor}) {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const toggleNav = () => setIsNavOpen(!isOpen);
  const handlePreview = ()=>{
    //set html,css
    localStorage.setItem('gjs-html',editor.getHtml());
    localStorage.setItem('gjs-css',editor.getCss());


    //redirect to preview with data 
    window.open('/formbuilder/preview','_blank')
  }

  const handleSave = ()=>{

  }

  const handlePublish =()=>{
    
  }
  
  return (
    <div>
        <Navbar full="true" expand="md">
            <NavbarToggler onClick={toggleNav} />
            <Collapse isOpen={isNavOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem className="me-1">
                <Button onClick={toggle} color="link" className="p-0">
                  <X />
                </Button>
              </NavItem>
              <NavItem className="me-1">
                <Button color="link" className="p-0" onClick={()=>toggleStyles(!isStyle)}>
                    <FaPaintBrush size={20}/>
                </Button>
              </NavItem>
              
              <NavItem className="me-1">
                <Button color="link" className="p-0" onClick={()=>toggleLayers(!isLayers)}>
                    <FaLayerGroup size={20}/>
                </Button>
              </NavItem>
              <NavItem className="me-1">
                <Button color="link" className="p-0" onClick={()=>toggleBlocks(!isBlock)}>
                    <FaBox size={20}/>
                </Button>
              </NavItem>
            </Nav>
              <Nav className="m-auto" navbar>
                <NavItem className="me-1">
                  <Button color="link" className="p-0" onClick={()=>setDevice('desktop')}>
                    <MdOutlineDesktopMac size={20} />
                  </Button>
                </NavItem>
                <NavItem className="me-1">
                  <Button color="link" className="p-0" onClick={()=>setDevice('tablet')}>
                    <MdOutlineTablet size={20} />
                  </Button>
                </NavItem>
                <NavItem className="me-1">
                  <Button color="link" className="p-0" onClick={()=>setDevice('mobile')}>
                    <BiMobile size={20} />
                  </Button>
                </NavItem>
              </Nav>
              <Nav className="ms-auto me-0" navbar>
              <NavItem className="my-auto">
              <Button  color='link' className='py-0 px-1' onClick={handlePreview}>
                <Eye/>
              </Button>
              </NavItem>
              <NavItem className="me-1">
              <Button className="btn-outline-primary px-2" onClick={handleSave}>Save</Button>
              </NavItem>
              <NavItem className="me-1">
              <Button color="primary" className=" px-2 " onClick={handlePublish}>
              Publish
            </Button>
              </NavItem>
            </Nav>
            </Collapse>
          </Navbar>
        </div>
  );
}
