// ** React Imports
import { useRef, useState } from 'react';

// ** Custom Components
import Wizard from '@components/wizard';

// ** Steps
import About from './membershipFormSteps/About';
import Videos from './membershipFormSteps/Videos';
import Resources from './membershipFormSteps/Resources';

const MembershipForm = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: 'deatils',
      title: 'Course Details',
      subtitle: 'Enter Course Details.',
      content: <About stepper={stepper} />
    },
    {
      id: 'lectures',
      title: 'Upload Lectures',
      subtitle: 'Upload All Videos',
      content: <Videos stepper={stepper} />
    },
    {
      id: 'resources',
      title: 'Cource Resources',
      subtitle: 'Provide some resource',
      content: <Resources stepper={stepper} />
    }
  ];
  return (
    <>
      <div className="horizontal-wizard">
        <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
      </div>
    </>
  );
};

export default MembershipForm;
