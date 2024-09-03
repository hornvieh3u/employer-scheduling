// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import Recipients from './steps/Recipients'
import UploadDoc from './steps/UploadDoc'
import Message from './steps/Message'

// ** Icons Imports
import { FileText, User, Image, Type } from 'react-feather'
import Title from './steps/Title'

const WizardModernVertical = () => {
    // ** Ref
    const ref = useRef(null)

    // ** State
    const [stepper, setStepper] = useState(null)

    const steps = [
        {
            id: 'document',
            title: 'Add Documents',
            subtitle: 'Upload or Browse Library',
            icon: <Image size={18} />,
            content: <UploadDoc stepper={stepper} type="modern-vertical" />
        },
        {
            id: 'title',
            title: 'Add Title ',
            subtitle: 'Add a title for your documents',
            icon: <Type size={18} />,
            content: <Title stepper={stepper} type="modern-vertical" />
        },
        {
            id: 'recipients',
            title: 'Add Recipients',
            subtitle: 'Select Multiple Recipients',
            icon: <FileText size={18} />,
            content: <Recipients stepper={stepper} type="modern-vertical" />
        },
        {
            id: 'message',
            title: 'Add Message',
            subtitle: 'A few words for Recipients',
            icon: <User size={18} />,
            content: <Message stepper={stepper} type="modern-vertical" />
        }
    ]

    return (
        <div className="modern-vertical-wizard">
            <Wizard
                type="modern-vertical"
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

export default WizardModernVertical
