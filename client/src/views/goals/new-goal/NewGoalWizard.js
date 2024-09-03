// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import Template from './steps/Template'
import GoalInfo from './steps/GoalInfo'

// ** Icons Imports
import { FileText, Folder } from 'react-feather'

const NewGoalWizard = () => {
    // ** Ref
    const ref = useRef(null)

    // ** State
    const [stepper, setStepper] = useState(null)

    const steps = [
        {
            id: 'template',
            title: 'Template',
            subtitle: 'Choose A Template',
            icon: <Folder size={18} />,
            content: <Template stepper={stepper} type="wizard-modern" />
        },
        {
            id: 'goal',
            title: 'Goal Info',
            subtitle: 'Fill Out The Form',
            icon: <FileText size={18} />,
            content: <GoalInfo stepper={stepper} type="wizard-modern" />
        }
    ]

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
    )
}

export default NewGoalWizard
