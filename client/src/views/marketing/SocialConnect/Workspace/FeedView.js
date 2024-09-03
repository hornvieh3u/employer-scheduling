import React, { Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import Profile from '../../../../assets/images/profile/post-media/2.jpg';
import banner1 from '../../../../assets/images/banner/banner-2.jpg';
import Post1 from '../../../../assets/images/banner/banner-39.jpg';
import Post2 from '../../../../assets/images/banner/banner-34.jpg';
import Post3 from '../../../../assets/images/banner/banner-34.jpg';
import Post4 from '../../../../assets/images/banner/banner-33.jpg';
import Post5 from '../../../../assets/images/banner/banner-32.jpg';
import Post6 from '../../../../assets/images/banner/banner-35.jpg';
import Post7 from '../../../../assets/images/banner/banner-36.jpg';
import Post8 from '../../../../assets/images/banner/banner-31.jpg';
// import Post9 from "../../../../assets/images/banner/banner-30.jpg"

const FeedView = () => {
  return (
    <Fragment>
      <div className="px-4">
        <Row>
          <Col sm={3} md={3} lg={3}>
            <center>
              <img
                className="mb-1"
                alt="profile"
                src={Profile}
                style={{
                  border: '1px solid',
                  borderRadius: '50%',
                  width: '300px',
                  height: '300px'
                }}
              />
              <span>charleen_001</span>
              <h4>Charleen Martin</h4>
            </center>
          </Col>
          <Col sm={9} md={9} lg={9}>
            <div>
              <img alt="banner" src={banner1} style={{ height: '300px', width: '100%' }} />
            </div>
            <Row>
              <Col sm={7} md={7} lg={7} className="mt-1">
                <div>
                  <img alt="post4" src={Post1} style={{ height: '400px', width: '100%' }} />
                </div>
              </Col>
              <Col sm={5} md={5} lg={5} className="mt-1">
                <div>
                  <img alt="post4" src={Post2} style={{ height: '400px', width: '100%' }} />
                </div>
              </Col>
              <Col sm={7} md={7} lg={7} className="mt-1">
                <div>
                  <img alt="post5" src={Post3} style={{ height: '400px', width: '100%' }} />
                </div>
              </Col>
              <Col sm={5} md={5} lg={5} className="mt-1">
                <div>
                  <img alt="post5" src={Post4} style={{ height: '400px', width: '100%' }} />
                </div>
              </Col>
              <Col sm={7} md={7} lg={7} className="mt-1">
                <div>
                  <img alt="post6" src={Post5} style={{ height: '400px', width: '100%' }} />
                </div>
              </Col>
              <Col sm={5} md={5} lg={5} className="mt-1">
                <div>
                  <img alt="post6" src={Post6} style={{ height: '400px', width: '100%' }} />
                </div>
              </Col>
              <Col sm={7} md={7} lg={7} className="mt-1">
                <div>
                  <img alt="post7" src={Post7} style={{ height: '400px', width: '100%' }} />
                </div>
              </Col>
              <Col sm={5} md={5} lg={5} className="mt-1">
                <div>
                  <img alt="post7" src={Post8} style={{ height: '400px', width: '100%' }} />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};
export default FeedView;
