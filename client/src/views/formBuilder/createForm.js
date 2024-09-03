// React Imports
import { React, useState, useRef } from 'react';

// Custom Components
import Wizard from '@components/wizard';
import FunnelInfomation from './createForm/funnelInformation';
import SelectFunnel from './createForm/selectFunnel';


const CreateForm = () => {
  // Ref
  const ref = useRef(null);
  // State
  const [stepper, setStepper] = useState(null);
  // customs
  const [name, setName] = useState();
  const [memberType, setMemberType] = useState('Active Member');
  const [smartList, setSmartList] = useState('N/A');
  const [subCategory, setSubCategory] = useState('');
  const [automateEntry, setAutomateEntry] = useState(false);
  const [formType, setFormType] = useState('optin');

  const steps = [
    {
      id: 'info',
      title: 'Funnel Information',
      subtitle: 'add funnel information',
      content: (
        <FunnelInfomation
          stepper={stepper}
          type="wizard-modern"
          name={name}
          memberType={memberType}
          smartList={smartList}
          subCategory={subCategory}
          automateEntry={automateEntry}
          formType={formType}
          setName={setName}
          setMemberType={setMemberType}
          setSmartList={setSmartList}
          setSubCategory={setSubCategory}
          setAutomateEntry={setAutomateEntry}
          setFormType={setFormType}
        />
      )
    },
    {
      id: 'template',
      title: 'Selected Template',
      subtitle: 'select template',
      content: (
        <SelectFunnel
          stepper={stepper}
          type="wizard-modern"
          name={name}
          memberType={memberType}
          smartList={smartList}
          subCategory={subCategory}
          automateEntry={automateEntry}
          formType={formType}
        />
      )
    }
  ];

  return (
    <div className="modern-horizontal-wizard">
      <Wizard
        type="modern-horizontal"
        ref={ref}
        steps={steps}
        options={{
          linear: false
        }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default CreateForm;
