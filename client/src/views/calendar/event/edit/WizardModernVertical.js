// ** React Imports
import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// ** Custom Components
import Wizard from '@components/wizard';

// ** Steps
import Title from './steps/Title';
import Banner from './steps/Banner';
import Host from './steps/Host';
import Venue from './steps/Venue';
import Tickets from './steps/Tickets';
// import SocialLinks from './steps/SocialLinks'

// ** Util Functions
import { getUserData } from '../../../../utility/Utils';

// ** Icons Imports
import { FileText, User, MapPin, Image, Tool } from 'react-feather';

// ** Redux Action Import
import { getEventInfo } from '../store';

const WizardModernVertical = () => {
  // ** Ref
  const ref = useRef(null);
  const { eventId } = useParams();
  // ** State
  const eventInfo = useSelector((state) => state.event.eventInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventInfo(eventId));
  }, []);

  const [stepper, setStepper] = useState(null);
  const [payload, setPayload] = useState({});

  // ** Form Data
  const eventForm = new FormData();
  eventForm.append('userId', getUserData().id);

  return (
    <div className="modern-vertical-wizard" key={`wizard${eventId.title}`}>
      <Wizard
        type="modern-vertical"
        ref={ref}
        steps={[
          {
            id: 'event-title',
            title: 'Event Title',
            subtitle: 'Give A Title',
            icon: <FileText size={18} />,
            content: (
              <Title
                eventForm={eventForm}
                stepper={stepper}
                eventInfo={eventInfo}
                type="modern-vertical"
              />
            )
          },
          {
            id: 'Banner',
            title: 'Event Banner',
            subtitle: 'Upload An Event Banner',
            icon: <Image size={18} />,
            content: (
              <Banner
                eventForm={eventForm}
                stepper={stepper}
                eventInfo={eventInfo}
                type="modern-vertical"
              />
            )
          },
          {
            id: 'host-info',
            title: 'Host Info',
            subtitle: 'Add Host Info',
            icon: <User size={18} />,
            content: (
              <Host
                eventForm={eventForm}
                stepper={stepper}
                eventInfo={eventInfo}
                type="modern-vertical"
              />
            )
          },
          {
            id: 'venue',
            title: 'Venue',
            subtitle: 'Add Address',
            icon: <MapPin size={18} />,
            content: (
              <Venue
                eventForm={eventForm}
                stepper={stepper}
                eventInfo={eventInfo}
                type="modern-vertical"
              />
            )
          },
          {
            id: 'tickets',
            title: 'Tickets',
            subtitle: 'Lets Create Tickets',
            icon: <Tool size={18} />,
            content: (
              <Tickets
                eventForm={eventForm}
                stepper={stepper}
                eventInfo={eventInfo}
                type="modern-vertical"
              />
            )
          }
        ]}
        options={{
          linear: false
        }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default WizardModernVertical;
