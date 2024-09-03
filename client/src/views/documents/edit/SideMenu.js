import React, { Fragment, useRef, useState } from 'react';
// import { Edit2, Edit3, Square, Tool } from 'react-feather';
import { Button, Card, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, UncontrolledAccordion } from 'reactstrap';
import Recipients from './Recipients';
import StandardFields from './StandardFields';
import CustomFields from './CustomFields';
import PrefillTools from './PrefillTools';
import Wizard from '@components/wizard';
import VerticalLayout from '../../../layouts/VerticalLayout';

import * as Icon from 'react-feather';

export default function SideMenu() {
  // ** Ref
  const ref = useRef(null);
  // ** States
  const [activeTab, setActiveTab] = useState('standard');
  const toggleTab = (tab) =>{
   
    setActiveTab(tab)
  };
  const menu = [
    {
      id: 'standard',
      title: '',
      icon: 'Square',
      content: <StandardFields />
    },
    {
      id: 'custom',
      title: '',
      icon: 'Tool',
      content: <CustomFields />
    },
    {
      id: 'prefill',
      title: '',
      icon: 'Edit2',
      content: <PrefillTools />
    }
  ];
  const renderTabs = () => {
    return menu.map((item) => {
      const IconTag = Icon[item.icon];

      return (
        <NavItem key={item.id} >
          <NavLink active={activeTab === item.id} onClick={() => toggleTab(item.id)} className="px-0 w-100 ">
            <IconTag size={18}  onClick={(e)=>e.preventDefault()} className="mx-auto"/>
          </NavLink>
        </NavItem>
      );
    });
  };

  const renderTabContent = ()=>{
    return menu.map(item=>{
      return (<TabPane key={item.id} tabId={item.id}>
        <div className='bg-light h-100'>
         {item.content}
        </div>
       </TabPane>)
    })
  }
  return (
    <Fragment>
      <Recipients />
     
      <Row className='mx-0'>
        <Col className='col-2 mx-0 px-0'>
        <Nav className='w-100' pills vertical>
              {renderTabs()}
            </Nav>
        </Col>
        <Col className='col-10 pe-0' >
        <TabContent activeTab={activeTab}>{renderTabContent()}</TabContent>
        </Col>
      </Row>
    </Fragment>
  );
}
