import React from 'react';
import { Card } from 'reactstrap';
import IncomeProgramChart from '../chart/IncomeProgramChart';

function MemberStatistics() {
  return (
    <Card style={{ minHeight: '100%' }}>
      <IncomeProgramChart />
    </Card>
  );
}

export default MemberStatistics;
