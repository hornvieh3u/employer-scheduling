// ** Custom Components
import Avatar from '@components/avatar';

// ** Icons Imports
import { Calendar, MapPin } from 'react-feather';

// ** Reactstrap Imports
import { Card, CardTitle, CardBody, CardText } from 'reactstrap';

import { dayOfWeekAsString, monthAsString, formatTime } from '@src/utility/Utils';

import { useSelector } from 'react-redux';

import { BsFullscreen } from 'react-icons/bs';

const CardEvent = (props) => {
  const { eventInfo } = props;

  const data = [
    {
      title: 'Billy Hopkins',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default,
      imgHeight: 33,
      imgWidth: 33
    },
    {
      title: 'Amy Carson',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-6.jpg').default,
      imgHeight: 33,
      imgWidth: 33
    },
    {
      title: 'Brandon Miles',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default,
      imgHeight: 33,
      imgWidth: 33
    },
    {
      title: 'Daisy Weber',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default,
      imgHeight: 33,
      imgWidth: 33
    },
    {
      title: 'Jenny Looper',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default,
      imgHeight: 33,
      imgWidth: 33
    },
    {
      meta: '+42'
    }
  ];

  const getEventStartTime = () => {
    const startTime = new Date(eventInfo.start);
    return startTime;
  };

  const formatDate = (date) => {
    return (
      dayOfWeekAsString(date.getDay()) +
      ', ' +
      monthAsString(date.getMonth()) +
      ' ' +
      date.getDate() +
      ', ' +
      date.getFullYear()
    );
  };
  return (
    <Card className="card-developer-meetup">
      <div className="meetup-img-wrapper rounded-top text-center">
        <BsFullscreen size={20} style={{ position: 'absolute', top: '20px', right: '20px' }} />
        <img src={eventInfo.url ? eventInfo.url : 'http://mymanager.com/assets/images/photo.png'} height="170" alt="Event Banner" className="w-100" />
      </div>
      <CardBody>
        <div className="meetup-header d-flex align-items-center">
          <div className="meetup-day">
            <h6 className="mb-0">{dayOfWeekAsString(getEventStartTime().getDay())}</h6>
            <h3 className="mb-0">{getEventStartTime().getDate()}</h3>
          </div>
          <div className="my-auto">
            <CardTitle tag="h4" className="mb-25">
              {eventInfo.title}
            </CardTitle>
            <CardText className="mb-0">{eventInfo.note}</CardText>
          </div>
        </div>
        <div className="d-flex">
          <Avatar color="light-primary" className="rounded me-1" icon={<Calendar size={18} />} />
          <div>
            <h6 className="mb-0">{formatDate(getEventStartTime())}</h6>
            <small>{formatTime(getEventStartTime())}</small>
          </div>
        </div>
        <div className="d-flex mt-2">
          <Avatar color="light-primary" className="rounded me-1" icon={<MapPin size={18} />} />
          <div>
            <h6 className="mb-0">{eventInfo.venueName}</h6>
            <small>
              {eventInfo.eventAddress}
            </small>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardEvent;
