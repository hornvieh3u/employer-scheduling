import React, { memo, useState } from 'react';
import { CardText } from 'reactstrap';

// ** Custom Components
import Card from '@components/card-snippet';
import { PhoneCall } from 'react-feather';
import Select from 'react-select';
// ** Utils
import { selectThemeColors } from '@utils';

function Subscription() {
  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Type'
  });
  // plans
  const planOptions = [
    { value: '', label: 'Select Plan' },
    { value: '9.99', label: '$9.99 for 300 credits' }
  ];
  const handleEventType = (data) => {};
  return (
    <div>
      <Card title="Subscription">
        <div className="icon-container">
          <div className="icon-style">
            <PhoneCall size={20} />
          </div>
        </div>
        <CardText className="despost-text-main mb-0">$9.99/ months</CardText>
        <CardText className="despost-text">
          <span>Balance: $0</span>
          <span>Credits: $0</span>
        </CardText>
        <div className="deposit-input">
          <Select
            theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            options={planOptions}
            value={currentPlan}
            onChange={(data) => {
              handleEventType(data), setCurrentPlan(data);
            }}
          />
        </div>
      </Card>
    </div>
  );
}
export default memo(Subscription);
