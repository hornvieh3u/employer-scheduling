import React from 'react';
import { Card, Col, Input, Row } from 'reactstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const IncomeProgramChart = () => {
  const data = [
    { key: 1, name: 'BeltOne', uv: 100, pv: 100, amt: 100 },
    { key: 2, name: 'BeltTwo', uv: 180, pv: 180, amt: 180 },
    { key: 3, name: 'BeltThree', uv: 110, pv: 110, amt: 100 },
    { key: 4, name: 'BeltFour', uv: 110, pv: 110, amt: 100 },
    { key: 5, name: 'BeltFive', uv: 110, pv: 110, amt: 100 },
    { key: 6, name: 'BeltSix', uv: 110, pv: 110, amt: 100 },
    { key: 7, name: 'BeltSeven', uv: 110, pv: 110, amt: 100 },
    { key: 8, name: 'BeltEight', uv: 110, pv: 110, amt: 100 }
  ];

  return (
    <Card className="p-1" style={{ minHeight: '50vh' }}>
      <BarChart width={1000} height={520} data={data}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="uv" fill="#8884d8" barSize={30} />
      </BarChart>

      <Row className="d-flex align-item-center p-1 mt-1">
        <Col md={2}>
          <Input id="exampleSelect" name="select" type="select">
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </Input>
        </Col>
        <Col md={2}>
          <Input id="exampleSelect" name="select" type="select">
            <option>2010</option>
            <option>2011</option>
            <option>2012</option>
            <option>2013</option>
            <option>2014</option>
            <option>2015</option>
            <option>2016</option>
            <option>2017</option>
            <option>2018</option>
            <option>2019</option>
            <option>2020</option>
            <option>2021</option>
          </Input>
        </Col>
      </Row>
    </Card>
  );
};

export default IncomeProgramChart;
