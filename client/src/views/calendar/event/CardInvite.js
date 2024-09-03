import { Link, useParams } from 'react-router-dom';

// ** Reactstrap Imports
import { Card, CardHeader, CardBody, ButtonGroup, Button, Input } from 'reactstrap';

// ** Icons Import
import { Facebook, Twitter, Instagram, Link2, Mail, Send } from 'react-feather';
import { useState } from 'react';

const CardInvite = (props) => {
  const { eventInfo } = props;
  const { eventId } = useParams();

  const [url, setUrl] = useState('');
  const copyUrlClickHandler = (e) => {
    document.clear();
    var tmpEl = document.createElement('input');
    setUrl(
      'https://mymanager.com' + e.target.closest('.card').querySelector('a').getAttribute('href')
    );
    e.target.closest('.card-body').querySelector('#copyUrlTooltip').style.display = 'block';
    document.body.appendChild(tmpEl);
    tmpEl.value = url;
    tmpEl.select();
    document.execCommand('copy');
    tmpEl.addEventListener('focusout', (e) => {
      document.querySelector('#copyUrlTooltip').style.display = 'none';
      document.body.removeChild(tmpEl);
    });
  };

  return (
    <Card>
      <CardHeader>Invitation Details</CardHeader>
      <div className="d-flex flex-column ms-2">
        <div className="pb-1">
          <img src={eventInfo.url ? eventInfo.url : 'https://mymanager.com/assets/images/photo.png'} height="85" alt="Event Banner" />
        </div>
        <div className="d-flex flex-column">
          <span className="h4 bold fw-bold">{eventInfo.title}</span>
          <Link to={`/event-preview/${eventId}`}>
            <span>Preview Invitation</span>
          </Link>
          <div className="me-2">
            <Input type="text" value={`https://mymanager.com/event-preview/${eventId}`} disabled="true" />
          </div>
        </div>
      </div>

      <CardBody>
        <div className="mb-1">
          <div className="h4">Send Invitation</div>
          <ButtonGroup className="mb-1">
            <Button
              outline
              color="primary"
              onClick={(e) => {
                copyUrlClickHandler(e);
              }}
              onFocusOut={(e) => {
                focusOutClickHandler(e);
              }}
            >
              <Link2 size={15} />
            </Button>
            <Button outline color="primary">
              <Mail size={15} />
            </Button>
            <Button outline color="primary">
              <Send size={15} />
            </Button>
          </ButtonGroup>
          <p
            id="copyUrlTooltip"
            style={{ fontSize: 'smaller', marginLeft: '4px', display: 'none' }}
          >
            Copied Preview Url to Clipboard!
          </p>
        </div>
        <div>
          <div className="h4">Share Your Event</div>
          <ButtonGroup className="mb-1">
            <Button outline color="primary">
              <Facebook size={15} />
            </Button>
            <Button outline color="primary">
              <Twitter size={15} />
            </Button>
            <Button outline color="primary">
              <Instagram size={15} />
            </Button>
          </ButtonGroup>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardInvite;
