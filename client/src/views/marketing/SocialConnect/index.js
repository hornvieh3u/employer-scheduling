import React, { Fragment } from 'react';
import { PlusCircle } from 'react-feather';
import { Card, Col, Row } from 'reactstrap';
import BreadCrumbs from '@components/breadcrumbs';
import { Link } from 'react-router-dom';

const SocialConnectMain = () => {
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Social Connect"
        breadCrumbParent="Marketing"
        breadCrumbActive="Social Connect"
      />
      <div>
        <div className="d-flex align-items-center">
          <div
            className="d-flex justify-content-center align-items-center me-1"
            style={{
              borderRadius: '6px',
              width: '40px',
              height: '40px',
              backgroundColor: '#e52a2a',
              color: '#fff'
            }}
          >
            <span style={{ fontSize: '20px' }}>
              <b>M</b>
            </span>
          </div>
          <span>
            <b>Testing 1</b>
          </span>
          <br />
        </div>
      </div>
      <div
        className="mt-1"
        style={{ borderTop: '1px solid #b8c2cc', borderBottom: '1px solid #b8c2cc' }}
      >
        <Row className="mt-2">
          <Col sm={3} md={3} lg={3}>
            <Link to={'/apps/socialconnect/workspace'}>
              <Card className="cursor-pointer p-1" style={{ height: '200px' }}>
                <div className="d-flex align-items-center">
                  <div
                    className="d-flex justify-content-center align-items-center me-1"
                    style={{
                      borderRadius: '6px',
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#e52a2a',
                      color: '#fff'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>
                      <b>T</b>
                    </span>
                  </div>
                  <div>
                    <b>Testing 1</b>
                    <br />
                    <span>5 Pages</span>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
          <Col sm={3} md={3} lg={3}>
            <Link to={'/apps/socialconnect/workspace'}>
              <Card className="cursor-pointer p-1" style={{ height: '200px' }}>
                <div className="d-flex align-items-center">
                  <div
                    className="d-flex justify-content-center align-items-center me-1"
                    style={{
                      borderRadius: '6px',
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#e52a2a',
                      color: '#fff'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>
                      <b>T</b>
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>Testing 2</b>
                    </span>
                    <br />
                    <span>5 Pages</span>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>

          <Col sm={3} md={3} lg={3}>
            <Card className="cursor-pointer" style={{ height: '200px' }}>
              <div className="d-flex justify-content-center align-items-center h-100 w-100">
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <PlusCircle size={30} />
                  </div>
                  <div>
                    <span>Create New WorkSpace</span>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Row className="mt-2">
        <Col sm={3} md={3} lg={3}>
          <Link to={'/apps/socialconnect/workspace'}>
            <Card className="cursor-pointer p-1" style={{ height: '200px' }}>
              <div className="d-flex align-items-center">
                <div
                  className="d-flex justify-content-center align-items-center me-1"
                  style={{
                    borderRadius: '6px',
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#e52a2a',
                    color: '#fff'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>
                    <b>S</b>
                  </span>
                </div>
                <div>
                  <b>Sample</b>
                  <br />
                  <span>5 Pages</span>
                </div>
              </div>
            </Card>
          </Link>
        </Col>
      </Row>
    </Fragment>
  );
};
export default SocialConnectMain;
