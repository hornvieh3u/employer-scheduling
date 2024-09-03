// ** React Imports
import { Fragment, useRef, useState } from 'react';

// ** Custom Components
import Wizard from '@components/wizard';

// ** Steps
import Template from './steps/Template';
import GoalInfo from './steps/GoalInfo';

// ** Icons Imports
import { FileText, Folder } from 'react-feather';
import CategoryMain from './steps/Category';
import CreateHabitGoal from './steps/CreateHabitGoal';

const NewGoalWizard = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [rSelected, setRSelected] = useState(null);

  const steps = [
    {
      id: 'template',
      title: 'Add Goal',
      subtitle: 'Choose A Goal Type',
      icon: <Folder size={18} />,
      content: (
        <Template
          rSelected={rSelected}
          setRSelected={setRSelected}
          stepper={stepper}
          type="wizard-modern"
        />
      )
    },
    {
      id: 'goal',
      title: 'Goal Info',
      subtitle: 'Fill Out The Form',
      icon: <FileText size={18} />,
      content: (
        <Fragment>
          {rSelected === 1 ? (
            <CategoryMain stepper={stepper} type="wizard-modern" />
          ) : rSelected === 2 ? (
            <CreateHabitGoal stepper={stepper} type="wizard-modern" />
          ) : (
            <GoalInfo stepper={stepper} type="wizard-modern" />
          )}
        </Fragment>
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

export default NewGoalWizard;
