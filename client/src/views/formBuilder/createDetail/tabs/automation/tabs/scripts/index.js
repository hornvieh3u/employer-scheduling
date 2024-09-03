import React from 'react';
import { Copy } from 'react-feather';
import { Card, CardTitle, CardText, CardBody, Badge, Col } from 'reactstrap';
import { getUserData } from '../../../../../../../utility/Utils';

function Scripts() {
  return (
    <Card className="m-2">
      <CardBody className="rounded-none">
        <CardTitle tag="h5">Scripts</CardTitle>
        <CardText>
          <div>
            <Col sm={12}>
              <div className="bg-light-secondary position-relative rounded p-2">
                <div className="d-flex align-items-center flex-wrap">
                  <h4 className="mb-1 me-1">Livechat Widget Script</h4>
                  <Badge className="mb-1" color="light-primary">
                    Widget
                  </Badge>
                </div>
                <h6 className="d-flex fw-bolder flex-column">
                  <div>
                    <span className="me-50">{`<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/bluesky0724/chatwidget-mymanager/index.css">`}</span>
                    <span>
                      <Copy size={14} />
                    </span>
                  </div>
                  <div className="me-50">{`<script src="https://cdn.jsdelivr.net/gh/bluesky0724/chatwidget-mymanager/index.js"></script>`}</div>
                  <div className="me-50">{`<script>window.__lc = window.__lc || {}; window.__lc.license = '${
                    getUserData().id
                  }'; </script>`}</div>
                </h6>
                {/* <span>{item.date}</span> */}
              </div>
            </Col>
          </div>
        </CardText>
      </CardBody>
    </Card>
  );
}

export default Scripts;
