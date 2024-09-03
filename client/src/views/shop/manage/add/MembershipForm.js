// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import CreateMembership from './membershipFormSteps/CreateMembership'
import PaymentInfo from './membershipFormSteps/PaymentInfo'

const MembershipForm = () => {
    // ** Ref
    const ref = useRef(null)

    // ** State
    const [stepper, setStepper] = useState(null)

    const steps = [
        {
            id: 'create-membership',
            title: 'Create Membership',
            subtitle: 'Enter Membership Details.',
            content: <CreateMembership stepper={stepper} />
        },
        {
            id: 'payment-info',
            title: 'Payment Info',
            subtitle: 'Add Payment Information',
            content: <PaymentInfo stepper={stepper} />
        }
    ]
    return (
        <>
            <div className="horizontal-wizard">
                <Wizard
                    instance={(el) => setStepper(el)}
                    ref={ref}
                    steps={steps}
                />
            </div>
        </>
    )
}

export default MembershipForm
