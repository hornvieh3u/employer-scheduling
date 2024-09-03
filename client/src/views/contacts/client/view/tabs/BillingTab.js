// ** React Imports
import { Fragment } from 'react'

// ** Billing Components
import BillingAddress from './BillingAddress'
// import PaymentMethods from './PaymentMethod'
import BillingCurrentPlan from './BillingCurrentPlan'
import InvoiceList from './InvoiceList'
import PaymentMethods from './PaymentMethods'

const BillingTab = ({ selectedUser }) => {
    return (
        <Fragment>
            {/* <BillingCurrentPlan /> */}
            <BillingAddress />
            <PaymentMethods />
            <InvoiceList />
            {/* <PaymentMethods selectedUser={selectedUser} /> */}
        </Fragment>
    )
}

export default BillingTab
