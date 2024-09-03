// ** React Imports
import { Fragment, useState } from 'react';

// ** Components
import AddCouponModal from './addCouponModal';

// ** Third Party Components
import DataTable from 'react-data-table-component';
import { Trash2, Edit } from 'react-feather';

// ** Reactstrap Imports
import { Row, Col, Card, Input, Button, CardBody, Badge } from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

const Coupons = () => {
  // ** States
  const [centeredModal, setCenteredModal] = useState(false);

  const tabledata = [
    {
      id: 'E84h4k4',
      start: '12/12/2023',
      end: '12/12/2023',
      campaign: 'New Year',
      code: 45343,
      percentage: '23%',
      ptype: 'membership'
    },
    {
      id: 'E84h4k4',
      start: '12/12/2023',
      end: '12/12/2023',
      campaign: 'New Year',
      code: 45343,
      percentage: '23%',
      ptype: 'membership'
    },
    {
      id: 'E84h4k4',
      start: '12/12/2023',
      end: '12/12/2023',
      campaign: 'New Year',
      code: 45343,
      percentage: '23%',
      ptype: 'membership'
    },
    {
      id: 'E84h4k4',
      start: '12/12/2023',
      end: '12/12/2023',
      campaign: 'New Year',
      code: 45343,
      percentage: '23%',
      ptype: 'membership'
    }
  ];

  const columnsdata = [
    {
      name: 'ID',
      sortable: true,
      width: '100px',
      sortField: 'id',
      selector: (row) => row.id
    },
    {
      name: 'Start Date',
      sortable: true,
      // width: '130px',
      sortField: 'start',
      selector: (row) => row.start
    },
    {
      name: 'End Date',
      sortable: true,
      // width: '130px',
      sortField: 'end',
      selector: (row) => row.end
    },
    {
      name: 'Campaigns Name',
      sortable: true,
      width: '180px',
      sortField: 'campaign',
      selector: (row) => row.campaign
    },
    {
      name: 'Code',
      sortable: true,
      // width: '130px',
      sortField: 'code',
      selector: (row) => row.code
    },
    {
      name: 'Percentage',
      sortable: true,
      // width: '130px',
      sortField: 'percentage',
      selector: (row) => row.percentage
    },
    {
      name: 'Product Type',
      sortable: true,
      // width: '130px',
      sortField: 'ptype',
      selector: (row) => row.ptype
    },
    {
      name: 'Status',
      sortable: true,
      // width: '130px',
      sortField: 'status',
      cell: (row) => (
        <Badge color="success" className="d-block">
          <span>Active</span>
        </Badge>
      )
    },
    {
      name: 'Actions',
      // minWidth: '100px',
      cell: (row) => (
        <div className="column-action">
          <Edit size={20} className="me-1" />
          <Trash2 size={20} />
        </div>
      )
    }
  ];

  return (
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col md="3">
              <Input
                id="search-invoice"
                // className="w-100"
                type="text"
                placeholder="Search by coupon code or name ..."
              />
            </Col>
            <Col md="9" className="d-flex justify-content-end">
              <Button
                className="btn-icon"
                color="primary"
                onClick={() => setCenteredModal(!centeredModal)}
              >
                Add New Coupon
              </Button>
              <AddCouponModal centeredModal={centeredModal} setCenteredModal={setCenteredModal} />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <Col>
          <DataTable columns={columnsdata} data={tabledata} pagination />
        </Col>
      </Card>
    </Fragment>
  );
};

export default Coupons;
