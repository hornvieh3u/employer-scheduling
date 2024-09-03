import React from 'react';
import { Card, Col, Input, Row } from 'reactstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = () => {
  const data = [
    {
      name: 'Jan',
      Not_Join: 4000,
      Join: 2400,
      amt: 2400
    },
    {
      name: 'Feb',
      Not_Join: 3000,
      Join: 1398,
      amt: 2210
    },
    {
      name: 'Mar',
      Not_Join: 2000,
      Join: 9800,
      amt: 2290
    },
    {
      name: 'Apr',
      Not_Join: 2780,
      Join: 3908,
      amt: 2000
    },
    {
      name: 'May',
      Not_Join: 1890,
      Join: 4800,
      amt: 2181
    },
    {
      name: 'June',
      Not_Join: 2390,
      Join: 3800,
      amt: 2500
    },
    {
      name: 'July',
      Not_Join: 2390,
      Join: 3800,
      amt: 2500
    },
    {
      name: 'Aug',
      Not_Join: 2390,
      Join: 3800,
      amt: 2500
    },
    {
      name: 'Sept',
      Not_Join: 2390,
      Join: 3800,
      amt: 2500
    },
    {
      name: 'Oct',
      Not_Join: 2390,
      Join: 3800,
      amt: 2500
    },
    {
      name: 'Nov',
      Not_Join: 2390,
      Join: 3800,
      amt: 2500
    },
    {
      name: 'Dec',
      Not_Join: 2390,
      Join: 3800,
      amt: 2500
    }
  ];

  return (
    <Card className="p-1 mb-0" style={{ minHeight: '50vh' }}>
      <BarChart
        width={1020}
        height={520}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          height={40}
          type="category"
          dataKey="name"
          angle={-40}
          interval={0}
          textAnchor="end"
          axisLine={false}
          offset={4}
          tickMargin={1}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar barSize={8} dataKey="Join" fill="#0184ff" />
        <Bar barSize={8} dataKey="Not_Join" fill="#ff2929" />
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

export default Chart;
