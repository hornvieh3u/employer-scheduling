// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import Title from './steps/Title'
import Banner from './steps/Banner'
import Host from './steps/Host'
import Venue from './steps/Venue'
import Tickets from './steps/Tickets'
// import SocialLinks from './steps/SocialLinks'

// ** Icons Imports
import { FileText, User, MapPin, Image, Tool } from 'react-feather'

const WizardModernVertical = () => {
    // ** Ref
    const ref = useRef(null)

    // ** State
    const [stepper, setStepper] = useState(null)
    const [payload, setPayload] = useState({})

    const steps = [
        {
            id: 'event-title',
            title: 'Facebook',
            subtitle: 'Give A Title',
            icon: <FileText size={18} />,
            content: <Title payload={payload} setPayload={setPayload} stepper={stepper} type="modern-vertical" />
        },
        {
            id: 'Banner',
            title: 'Google',
            subtitle: 'Upload An Event Banner',
            icon: <Image size={18} />,
            content: <Banner payload={payload} setPayload={setPayload} stepper={stepper} type="modern-vertical" />
        },
        
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
