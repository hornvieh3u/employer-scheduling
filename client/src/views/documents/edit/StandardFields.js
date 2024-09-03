import React, { useRef, useState } from 'react';
import { CardBody } from 'reactstrap';

import BtnApprove from './drags/approve/BtnApprove';
import BtnAttachment from './drags/attachment/BtnAttachment';
import BtnCheckbox from './drags/checkbox/BtnCheckbox';
import BtnCompany from './drags/company/BtnCompany';
import BtnDecline from './drags/decline/BtnDecline';
import BtnDrawing from './drags/drawing/BtnDrawing';
import BtnDropdown from './drags/dropdown/BtnDropdown';
import BtnEmail from './drags/email/BtnEmail';
import BtnFormula from './drags/formula/BtnFormula';
import BtnInitial from './drags/initial/BtnInitial';
import BtnName from './drags/name/BtnName';
import BtnNote from './drags/note/BtnNote';
import BtnRadio from './drags/radio/BtnRadio';
import BtnSign from './drags/sign/BtnSign';
import BtnSignDate from './drags/signDate/BtnSignDate';
import BtnStamp from './drags/stamp/BtnStamp';
import BtnText from './drags/text/BtnText';
import BtnTitle from './drags/title/BtnTitle';

export default function StandardFields() {
  return (
    <CardBody style={{minHeight:"100vh"}} >
      <h5 className="text-start">Standard Fields</h5>
      <BtnSign />
      <BtnInitial />
      <BtnStamp />
      <BtnSignDate />
      <hr />
      <BtnName />
      <BtnEmail />
      <BtnCompany />
      <BtnTitle />
      <hr />
      <BtnText />
      <BtnCheckbox />
      <BtnRadio />
      <BtnDropdown />
      <hr />
      <BtnDrawing />
      {/* <BtnFormula /> */}
      <BtnAttachment />
      <BtnNote />
      <BtnApprove />
      <BtnDecline />
    </CardBody>
  );
}
