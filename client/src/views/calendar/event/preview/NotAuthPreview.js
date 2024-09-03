// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Components
import CardEventInfo from './CardEventInfo';
import CardHost from './CardHost';
import PreviewBody from './PreviewBody';

// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { getEventInfo } from '../store';
import CardEvent from '../CardEvent';
import SubmitReplyModal from './SubmitReplyModal';
import { useDispatch, useSelector } from 'react-redux';
import { FaEnvelopeOpenText, FaUserShield, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const NotAuthPreview = () => {
  const dispatch = useDispatch();
  const { eventId, guestId } = useParams();
  let guestInfo = {};
  if (guestId) guestInfo = JSON.parse(atob(guestId));
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const eventInfo = useSelector((state) => state.event.eventInfo);
  useEffect(() => {
    dispatch(getEventInfo(eventId));
  }, []);

  return (
    <Fragment>
      <nav className="header-navbar navbar align-items-center floating-nav navbar-shadow navbar navbar-expand-lg navbar-light" style={{ left: "30px", right: "30px" }}>
        <div className="navbar-container d-flex content">
          <Row className="w-100 mx-0">
            <Col md="3">
              <Button onClick={toggle} color="primary" className="d-flex align-items-center"><FaEnvelopeOpenText size="15" className="me-1" />Reply Event</Button>
            </Col>
            <Col md="9" className="d-flex justify-content-end align-items-center">
              <h6 className="mb-0 me-auto">This free event manager is powered by <a href="https://mymanager.com"><u>Manager.com</u></a></h6>
              <Link to="/"><Button color="primary" className="me-1 align-items-center d-flex "><FaUserShield size="15" className="me-1" />Login</Button></Link>
              <Link to="/register"><Button color="primary" className="d-flex align-items-center"><FaUserPlus size="15" className="me-1" />Register</Button></Link>
            </Col>
          </Row>
        </div>
      </nav>
      <div className="header-navbar-shadow d-block" style={{ paddingTop: "6.2rem" }}></div>

      <Row className="m-1">
        <Col md="4">
          <CardEvent
            eventInfo={{
              title: eventInfo.title,
              start: eventInfo.start,
              end: eventInfo.end,
              url: eventInfo.eventBanner,
              eventAddress: eventInfo.eventAddress,
              venueName: eventInfo.venueName,
            }}
          />
          <CardHost
            hostInfo={{
              hostName: eventInfo.hostName,
              hostEmail: eventInfo.hostEmail,
              hostMobileNumber: eventInfo.hostMobileNumber
            }}
          />
          {/* <div> 
            <Button color="primary" className="w-100" onClick={toggle}>Reply</Button>
          </div> */}
        </Col>
        <Col md="8">
          <PreviewBody
            eventInfo={{
              url: eventInfo.eventBanner,
              title: eventInfo.title,
              notes: eventInfo.notes
            }}
          />
        </Col>
      </Row>

      <SubmitReplyModal
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        _id={eventId}
        guestInfo={guestInfo}
      ></SubmitReplyModal>

    </Fragment>
  );
};

export default NotAuthPreview;
