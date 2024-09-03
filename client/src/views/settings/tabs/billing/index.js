import { Fragment } from 'react'

// ** Demo Components
import PaymentMethods from './PaymentMethods'
import BillingAddress from './BillingAddress'
import BillingHistory from './BillingHistory'
import BillingCurrentPlan from './BillingCurrentPlan'

const Billing = () => {
  return (
    <Fragment>
      <BillingCurrentPlan />
      <PaymentMethods />
      <BillingAddress />
      <BillingHistory />
    </Fragment>
  )
}

export default Billing