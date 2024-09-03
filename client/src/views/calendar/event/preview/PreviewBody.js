// ** React Imports
import { Fragment } from 'react';

// ** Components
import CardEventInfo from './CardEventInfo';
import CardHost from './CardHost';

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap';

// ** Images
import illustration from '@src/assets/images/banner/banner-4.jpg';

const PreviewBody = (props) => {
  const { eventInfo } = props;
  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="meetup-img-wrapper rounded-top text-center">
            <img
              src={eventInfo.url ? eventInfo.url : 'http://localhost:3000/assets/images/photo.png'}
              className="img-fluid w-100"
              style={{ maxHeight: '400px' }}
              width="100%"
              height="auto"
            />
          </div>
          <div className="mt-1 mb-3">
            <h2 className="mt-3 mb-3">{eventInfo?.title} Description</h2>
            <p>
              {eventInfo.notes ? eventInfo.notes : ""}
            </p>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default PreviewBody;
