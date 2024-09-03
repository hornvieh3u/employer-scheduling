import React, { Fragment, useState } from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';

const CategoryMain = () => {
  const [category, setCategory] = useState('');
  return (
    <Fragment>
      <div>
        <div className="d-flex justify-content-between align-items-end mt-2">
          <h4 className="mb-0">Category</h4>
          <div className="d-flex ">
            <Button color="primary">Add Category</Button>
            <Button className="ms-1" color="primary">
              Add Sub Category
            </Button>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #b4b7bd', marginTop: '5px' }}>
          <Row className="mt-1">
            <Col sm={6} md={6} lg={6}>
              <Label>Select Category</Label>
              <Input type="select" onChange={(e) => setCategory(e.target.value)}>
                <option value="Work & Career">Work & Career</option>
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="Love & Relationships">Love & Relationships</option>
                <option value="Money & Finances">Money & Finances</option>
                <option value="Family & Friends">Family & Friends</option>
                <option value="Spiritiuality & Faith">Spiritiuality & Faith</option>
                <option value="Recreation & Lifestile">Recreation & Lifestile</option>
                <option value="Personal & Growth">Personal & Growth</option>
                <option value="Other Goals">Other Goals</option>
              </Input>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <Label>Select Sub Category</Label>
              <Input type="select">
                <option>Example</option>
                <option>Example</option>
                <option>Example</option>
                <option>Example</option>
              </Input>
            </Col>
          </Row>
        </div>
        <div className="d-flex justify-content-between align-items-end mt-2">
          <h4 className="mb-0">Edit Example</h4>
        </div>
        <div style={{ borderTop: '1px solid #b4b7bd', marginTop: '5px' }}>
          <Row className="mt-1">
            {/* <Col sm={6} md={6} lg={6}>
                            <Label>Select Sub Category</Label>
                            <Input type="select">
                                <option>Example</option>
                                <option>Example</option>
                                <option>Example</option>
                                <option>Example</option>
                            </Input>
                        </Col> */}
          </Row>
        </div>
      </div>
    </Fragment>
  );
};
export default CategoryMain;
