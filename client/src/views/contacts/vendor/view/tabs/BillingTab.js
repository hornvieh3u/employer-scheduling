// ** React Imports
import { Fragment } from 'react'

// ** Billing Components
import BillingAddress from './BillingAddress'
import BillingCurrentPlan from './BillingCurrentPlan'
import PaymentMethods from './PaymentMethods'

const BillingTab = () => {
    return (
        <Fragment>
            <BillingCurrentPlan />
            <BillingAddress />
            <PaymentMethods />
        </Fragment>
    )
}

export default BillingTab
