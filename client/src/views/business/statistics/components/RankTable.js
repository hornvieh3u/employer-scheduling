// ** React Imports
import React, { useState } from 'react';

// ** Custom Components
import BeltOne from '@src/assets/images/belt/orange.png';
import BeltTwo from '@src/assets/images/belt/blackwhite.png';
import BeltThree from '@src/assets/images/belt/whiteorange.png';
import BeltFour from '@src/assets/images/belt/yellow.png';
import BeltFive from '@src/assets/images/belt/purple.png';
import BeltSix from '@src/assets/images/belt/blueblack.png';
import BeltSeven from '@src/assets/images/belt/greenblack.png';
import BeltEight from '@src/assets/images/belt/white.png';
// ** Third Party Components
import DataTable from 'react-data-table-component';
import {
  Send,
  Info,
  Save,
  PieChart,
  CheckCircle,
  ChevronDown,
  ArrowDownCircle
} from 'react-feather';
import { Card, Row, Col } from 'reactstrap';

// ** Styles
// import '@styles/react/apps/app-invoice.scss';
// import '@styles/react/libs/tables/react-dataTable-component.scss';

// import ApexBarChart from '../table/ApexBarChart'

// ** Vars
const invoiceStatusObj = {
  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
};

const data = [
  {
    id: 1,
    beltColor: BeltOne,
    rankName: 'Ticando',
    current: 'Blue Belt',
    gain: 'gain',
    loss: 'loss',
    total: 333
  },
  {
    id: 2,
    beltColor: BeltTwo,
    rankName: 'Ticando',
    current: 'Blue Belt',
    gain: 'gain',
    loss: 'loss',
    total: 333
  },
  {
    id: 3,
    beltColor: BeltThree,
    rankName: 'Ticando',
    current: 'Blue Belt',
    gain: 'gain',
    loss: 'loss',
    total: 333
  },
  {
    id: 4,
    beltColor: BeltFour,
    rankName: 'Ticando',
    current: 'Blue Belt',
    gain: 'gain',
    loss: 'loss',
    total: 333
  },
  {
    id: 5,
    beltColor: BeltFive,
    rankName: 'Ticando',
    current: 'Blue Belt',
    gain: 'gain',
    loss: 'loss',
    total: 333
  },
  {
    id: 6,
    beltColor: BeltSix,
    rankName: 'Ticando',
    current: 'Blue Belt',
    gain: 'gain',
    loss: 'loss',
    total: 333
  },
  {
    id: 7,
    beltColor: BeltSeven,
    rankName: 'Ticando',
    current: 'Blue Belt',
    gain: 'gain',
    loss: 'loss',
    total: 333
  },
  {
    id: 8,
    beltColor: BeltEight,
    rankName: 'Ticando',
    current: 'Blue Belt',
    gain: 'gain',
    loss: 'loss',
    total: 333
  }
];

const RankTable = () => {
  const columns = [
    {
      name: 'Rank Name',
      minWidth: '160px',
      selector: ({ beltColor, rankName }) => (beltColor, rankName),
      cell: (row) => (
        <div>
          <img
            src={row.beltColor}
            alt=""
            style={{
              width: '50px',
              height: '30px',
              padding: '5px'
            }}
          />
          <span style={{ paddingLeft: '10px' }}>{row.rankName || ''}</span>
        </div>
      )
    },
    {
      name: 'Current',
      minWidth: '120px',
      cell: (row) => row.current,
      selector: ({ current }) => current
    },
    {
      name: 'Gain',
      minWidth: '80px',
      selector: ({ gain }) => gain,
      cell: (row) => <span>{row.gain || ''}</span>
    },
    {
      name: 'Loss',
      minWidth: '80px',
      selector: ({ loss }) => loss,
      cell: (row) => <span>{row.loss || ''}</span>
    },
    {
      name: 'Total',
      minWidth: '80px',
      selector: ({ graph }) => graph,
      cell: (row) => <span style={{ cursor: 'pointer' }}>200</span>
    }
  ];
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div className="invoice-list-wrapper">
      <Card>
        {/* <ApexBarChart
                
                /> */}
        <Row>
          <Col md={8}>
            <div className="invoice-list-dataTable react-dataTable">
              <DataTable
                noHeader
                responsive
                data={data}
                columns={columns}
                className="react-dataTable"
                sortIcon={<ChevronDown size={10} />}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default RankTable;
