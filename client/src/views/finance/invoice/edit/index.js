// ** React Imports
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// ** Third Party Components
import { Alert, Row, Col } from 'reactstrap';

// ** Invoice Edit Components
import EditCard from './EditCard';
import EditActions from './EditActions';
import SendInvoiceSidebar from '../shared-sidebar/SidebarSendInvoice';
import AddPaymentSidebar from '../shared-sidebar/SidebarAddPayment';
import { editinvoiceres, getsinsgleinvoice } from '../../../../requests/invoice/invoice';
import BreadCrumbs from '../../../../@core/components/breadcrumbs';
const InvoiceEdit = () => {
  // ** Hooks
  const { id } = useParams();
  // ** States
  const [data, setData] = useState(null);
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const { mutate } = editinvoiceres();
  // ** Functions to toggle add & send sidebar
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen);
  const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen);

  const getdata = async () => {
    const fetdata = await getsinsgleinvoice(id);
    setData(fetdata?.data);
  };
  // ** Get invoice on mount based on id
  useEffect(() => {
    getdata();
  }, []);
  const handlesubmit = () => {
    mutate(data);
  };
  return data !== null && data !== undefined ? (
    <div className="invoice-edit-wrapper">
      <BreadCrumbs
        breadCrumbTitle="Finance"
        breadCrumbParent="Finance"
        breadCrumbActive="Edit invoice"
      />
      <Row className="invoice-edit">
        <Col xl={9} md={8} sm={12}>
          <EditCard invoicedata={data} setinvoice={setData} />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <EditActions
            id={id}
            setSendSidebarOpen={setSendSidebarOpen}
            setAddPaymentOpen={setAddPaymentOpen}
            handlesubmit={handlesubmit}
          />
        </Col>
      </Row>
      <SendInvoiceSidebar toggleSidebar={toggleSendSidebar} open={sendSidebarOpen} />
      <AddPaymentSidebar toggleSidebar={toggleAddSidebar} open={addPaymentOpen} />
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Invoice not found</h4>
      <div className="alert-body">
        Invoice with id: {id} doesn't exist. Check list of all invoices:{' '}
        <Link to="/invoice/list">Invoice List</Link>
      </div>
    </Alert>
  );
};

export default InvoiceEdit;
