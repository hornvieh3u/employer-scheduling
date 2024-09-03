// ** React Imports
import { Fragment } from 'react'

// ** Billing Components
import BillingAddress from './BillingAddress'
import BillingCurrentPlan from './BillingCurrentPlan'
import PaymentMethods from './PaymentMethods'

const BillingTab = (props) => {
    return (
        <Fragment>
            {/* <BillingCurrentPlan /> */}
            <BillingAddress {...props} />
            <PaymentMethods {...props} />
        </Fragment>
    )
}

export default BillingTab
