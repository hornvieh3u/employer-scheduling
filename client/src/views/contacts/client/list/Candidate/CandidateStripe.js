import React, { useState } from 'react';
import { selectThemeColors } from '@utils';
import Select from 'react-select';
import { Input } from 'reactstrap';

const CandidateStripe = () => {
  return (
    <Input type="select" name="stripe">
      <option>Stripe 1</option>
      <option>Stripe 2</option>
      <option>Stripe 3</option>
      <option>Stripe 4</option>
    </Input>
    // <Select
    //     id="tripe"
    //     value={stripe}
    //     options={StripeList}
    //     theme={selectThemeColors}
    //     // className="react-select"
    //     classNamePrefix="select"
    //     isClearable={false}
    //     onChange={(data) => setStripe([data])}
    // // components={{
    // //     Option: OptionInviteComponent
    // // }}
    // />
  );
};
export default CandidateStripe;
