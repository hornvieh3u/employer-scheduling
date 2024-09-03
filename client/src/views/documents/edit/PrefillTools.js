import React from 'react';
import { CardBody } from 'reactstrap';
import BtnLine from './drags/line/BtnLine';

export default function PrefillTools() {
  return (
    <CardBody style={{minHeight:"100vh"}}>
      <h5 className="text-start">Prefill Tools</h5>
      <BtnLine />
    </CardBody>
  );
}
