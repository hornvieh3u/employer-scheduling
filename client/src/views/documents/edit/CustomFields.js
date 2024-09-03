import React, { useContext, useEffect, useState } from 'react';
import { CardBody } from 'reactstrap';
import { getCustomField } from '../../../requests/documents/custom-fields';
import { DocumentContext } from '../../../utility/context/Document';
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
import BtnLine from './drags/line/BtnLine';
import BtnName from './drags/name/BtnName';
import BtnNote from './drags/note/BtnNote';
import BtnRadio from './drags/radio/BtnRadio';
import BtnSign from './drags/sign/BtnSign';
import BtnSignDate from './drags/signDate/BtnSignDate';
import BtnStamp from './drags/stamp/BtnStamp';
import BtnText from './drags/text/BtnText';
import BtnTitle from './drags/title/BtnTitle';

export default function CustomFields() {
  // ** contexts
  const { customFields, setCustomFields, board } = useContext(DocumentContext);

  useEffect(() => {
    getCustomField().then((res) => {
      setCustomFields(res);
    });
  }, []);

  return (
    <CardBody style={{minHeight:"100vh"}}>
      <h5 className="text-start">Custom Fields</h5>
      {customFields &&
        customFields.map((field, idx) => {
          switch (field.type) {
            case 'sign':
              return <BtnSign customField={field.fields} key={idx} />;
            case 'initial':
              return <BtnInitial customField={field.fields} key={idx} />;
            case 'stamp':
              return <BtnStamp customField={field.fields} key={idx} />;
            case 'signDate':
              return <BtnSignDate customField={field.fields} key={idx} />;
            case 'name':
              return <BtnName customField={field.fields} key={idx} />;
            case 'email':
              return <BtnEmail customField={field.fields} key={idx} />;
            case 'company':
              return <BtnCompany customField={field.fields} key={idx} />;
            case 'title':
              return <BtnTitle customField={field.fields} key={idx} />;
            case 'text':
              return <BtnText customField={field.fields} key={idx} />;
            case 'checkbox':
              return <BtnCheckbox customField={field.fields} key={idx} />;
            case 'radio':
              return <BtnRadio customField={field.fields} key={idx} />;
            case 'dropdown':
              return <BtnDropdown customField={field.fields} key={idx} />;
            case 'drawing':
              return <BtnDrawing customField={field.fields} key={idx} />;
            case 'formula':
              return <BtnFormula customField={field.fields} key={idx} />;
            case 'attachment':
              return <BtnAttachment customField={field.fields} key={idx} />;
            case 'note':
              return <BtnNote customField={field.fields} key={idx} />;
            case 'approve':
              return <BtnApprove customField={field.fields} key={idx} />;
            case 'decline':
              return <BtnDecline customField={field.fields} key={idx} />;
            case 'line':
              return <BtnLine customField={field.fields} key={idx} />;
          }
        })}
    </CardBody>
  );
}
