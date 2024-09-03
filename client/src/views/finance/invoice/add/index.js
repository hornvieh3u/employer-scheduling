// ** Invoice Add Components
import AddCard from './AddCard';
import AddActions from './AddActions';

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/base/pages/app-invoice.scss';
import { addinvoicedata } from '../../../../requests/invoice/invoice';
import { useState } from 'react';
import BreadCrumbs from '../../../../@core/components/breadcrumbs';

const InvoiceAdd = () => {
  const { mutate } = addinvoicedata();
  const [invoice, setinvoice] = useState({
    date: new Date(),
    dueDate: new Date(),
    items: [
      {
        item: '',
        description: '',
        rate: 0,
        quantity: 0
      }
    ],
    discount: 0,
    tax: 0,
    note: 'It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!'
  });
  const handlesubmit = () => {
    mutate(invoice);
  };
  return (
    <div className="invoice-add-wrapper">
      <BreadCrumbs
        breadCrumbTitle="Finance"
        breadCrumbParent="Finance"
        breadCrumbActive="Add invoice"
      />
      <Row className="invoice-add">
        <Col xl={9} md={8} sm={12}>
          <AddCard invoicedata={invoice} setinvoice={setinvoice} />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <AddActions handlesubmit={handlesubmit} />
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceAdd;
