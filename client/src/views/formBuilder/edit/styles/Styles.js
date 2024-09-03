import React, { useState } from 'react';
import { Button, Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import AdvanceTab from './AdvanceTab';
import SettingsTab from './SettingsTab';

export default function Styles({ editor }) {
  const [tab, setTab] = useState(true);

  const handleTabChange = ()=>{
    setTab(!tab)
  }
  return (
    <div>
      <Nav tabs>
        <NavItem >
          <Button color="link" onClick={handleTabChange}>Settings</Button>
        </NavItem>
        <NavItem>
          <Button color="link" onClick={handleTabChange}>Advanced</Button>
        </NavItem>
      </Nav>
      <TabContent activeTab={tab?"settings":"advanced"}>
        <TabPane tabId="settings">
          <SettingsTab editor={editor} />
        </TabPane>
        <TabPane tabId="advanced">
          <AdvanceTab editor = {editor} />
        </TabPane>
      </TabContent>
    </div>
  );
}
