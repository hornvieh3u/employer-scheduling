import React, { memo } from 'react';
import { Card, CardHeader, CardTitle, Input, Row } from 'reactstrap';

// ** Custom Components

import StripeForm from './StripeForm';
// ** Utils
function Deposit() {
  const [Amount, setAmount] = React.useState(0);
  return (
    <div>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle>
            Wallet
          </CardTitle>
        </CardHeader>
        <Row className='p-2'>
          <div className='text-center py-2' >
            <h3>How much would you like to add to your wallet?</h3>
            <h5>*You are required to have funds in your wallet to purchase text and voice credits.</h5>
            <div className="deposit-input d-flex justify-content-center align-items-center gap-5 pt-2">
              <Input
                className='width-10-per'
                type="text"
                placeholder="0"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <h1>$ {Amount ? Amount : 0}</h1>
            </div>
          </div>
          <StripeForm amount={Amount} />
        </Row>
      </Card>
    </div>
  );
}
export default memo(Deposit);
