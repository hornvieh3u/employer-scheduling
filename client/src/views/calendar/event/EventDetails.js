// ** React Imports
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ** Components
import CardEvent from './CardEvent';
import GuestTracker from './guests/GuestTracker';
import CardInvite from './CardInvite';
import AttendeesTabs from './AttendeesTabs';

// ** Reactstrap Imports
import { Row, Col, Card } from 'reactstrap';

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors';

// ** Redux Action Import
import { getEventInfo } from './store';

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss';
import '@styles/base/pages/dashboard-ecommerce.scss';

const EventDetails = () => {
  // ** Context
  const { colors } = useContext(ThemeColors);
  const { eventId } = useParams();
  const eventInfo = useSelector((state) => state.event.eventInfo);

  // ** Store vars
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventInfo(eventId));
  }, []);
  return (
    <div>
      <Row className="match-height">
        <Col lg="4" md="6" xs="12">
          <CardEvent
            eventInfo={{
              title: eventInfo.title,
              start: eventInfo.start,
              end: eventInfo.end,
              eventAddress: eventInfo.eventAddress,
              venueName: eventInfo.venueName,
              url: eventInfo.eventBanner
            }}
          />
        </Col>
        <Col lg="4" md="6" xs="12">
          <GuestTracker
            primary={colors.primary.main}
            danger={colors.danger.main}
            data={eventInfo}
          />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardInvite
            eventInfo={{
              url: eventInfo.eventBanner,
              title: eventInfo.title
            }}
          />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="12" xs="12">
          <AttendeesTabs data={eventInfo.guests} />
        </Col>
      </Row>
    </div>
  );
};

export default EventDetails;
