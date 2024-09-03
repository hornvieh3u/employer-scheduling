import { Fragment, useContext, useState } from 'react';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  ListGroupItem,
  CardHeader,
  ListGroup,
  CardText,
  Alert,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL';

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors';

// ** Charts
import ApexBarChart from '@src/views/charts/apex/ApexBarChart';
import ApexLineChart from '@src/views/charts/apex/ApexLineChart';
import ApexAreaChart from '@src/views/charts/apex/ApexAreaCharts';
import ApexRadarChart from '@src/views/charts/apex/ApexRadarChart';
import ApexDonutChart from '@src/views/charts/apex/ApexDonutChart';
import ApexRadialBarChart from '@src/views/charts/apex/ApexRadialbar';
import ApexColumnChart from '@src/views/charts/apex/ApexColumnCharts';
import ApexHeatmapChart from '@src/views/charts/apex/ApexHeatmapChart';
import ApexScatterChart from '@src/views/charts/apex/ApexScatterCharts';
import ApexCandlestickChart from '@src/views/charts/apex/ApexCandlestickChart';

// accordion
import Accordion from '@src/views/finance/expense/accordion';

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

const Expense = () => {
  //donut chart data
  const donutdata = [25, 50, 75, 100];
  const donutlabel = ['EMI', 'RENTS', 'OPERATIONS', 'SALLARY'];
  //select box data
  const categoryselect = ['Auto Payment', 'In House Payment', 'All Income', 'Product'];
  const monthselect = [
    'Januray',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const daywisedata = [
    'January 1 ,2022',
    'January 2 ,2022',
    'January 3 ,2022',
    'January 4 ,2022',
    'January 5 ,2022',
    'January 6 ,2022'
  ];
  const monthwisedata = [
    'January ,2022',
    'February ,2022',
    'March ,2022',
    'April ,2022',
    'May ,2022',
    'June ,2022',
    'July ,2022',
    'August ,2022',
    'September ,2022',
    'October ,2022',
    'November ,2022',
    'December ,2022'
  ];
  const yearselect = ['2021', '2022', '2023', '2024'];
  const [switchstate, setSwitchstate] = useState(false);
  const [accordiondata, setAccordiondata] = useState(daywisedata);
  const handleswitch = () => {
    switchstate ? setSwitchstate(false) : setSwitchstate(true);
    !switchstate && setAccordiondata(monthwisedata);
    switchstate && setAccordiondata(daywisedata);
  };

  //Area chart data handling
  const tredtextarrray = [
    'this month you spent $500 more on transport from last month',
    'your food expenses has increased by 53% from last month',
    ' this month you spent $500 on Transport.'
  ];
  const [trendText, setTrentText] = useState(' this month you spent $500 on Transport.');

  const expensecategories = ['Food and Refreshment', 'Bills', 'Fees', 'Transport'];
  const foodAndRefreshment = [
    {
      name: 'Tea',
      data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280, 375]
    },
    {
      name: 'Breakfast',
      data: [60, 80, 70, 110, 80, 100, 90, 180, 160, 140, 200, 220, 275]
    },
    {
      name: 'Dinner',
      data: [20, 40, 30, 70, 40, 60, 50, 140, 120, 100, 140, 180, 220]
    }
  ];
  const bills = [
    {
      name: 'Electricity',
      data: [10, 12, 9, 17, 10, 10, 10, 20, 20, 10, 20, 80, 35]
    },
    {
      name: 'Water',
      data: [6, 8, 7, 11, 8, 10, 9, 18, 10, 10, 20, 22, 25]
    },
    {
      name: 'House',
      data: [2, 4, 0, 7, 3, 6, 5, 10, 12, 10, 10, 10, 20]
    }
  ];
  const fees = [
    {
      name: 'school',
      data: [102, 122, 92, 172, 120, 120, 103, 240, 250, 160, 270, 880, 395]
    },
    {
      name: 'Land',
      data: [69, 88, 77, 611, 58, 140, 39, 128, 110, 110, 220, 232, 425]
    },
    {
      name: 'palenty',
      data: [2, 4, 0, 7, 3, 6, 5, 10, 12, 10, 10, 10, 20]
    }
  ];
  const [areachartdata, setAreachartdata] = useState(foodAndRefreshment);

  const handleselect = (e) => {
    if (e.target.value === 'Fees') {
      setAreachartdata(fees);
    }
    if (e.target.value === 'Bills') {
      setAreachartdata(bills);
    }
    if (e.target.value === 'Food and Refreshment') {
      setAreachartdata(foodAndRefreshment);
    }
    // if(e.target.value==="Transport")
    // {
    //     setAreachartdata(transport)
    //      console.log(areachartdata)
    // }
  };

  const [isRtl] = useRTL();

  // ** Theme Colors
  const { colors } = useContext(ThemeColors);
  return (
    <Fragment>
      {/* <Breadcrumbs breadCrumbTitle='Apex Charts' breadCrumbParent='Charts' breadCrumbActive='Apex' /> */}
      <Row className="match-height">
        {/* <Col xl='6' lg='12'>
            <ApexRadarChart />
          </Col> */}
        <Col sm="12">
          <Alert>
            <h4 className="alert-heading">Hi, Neeraj Minhas {trendText}</h4>
          </Alert>
        </Col>
        <Col xl="4" lg="12">
          <ApexDonutChart
            heading="Expense Proportion"
            subheading="Total Expenses - $1234"
            label={donutlabel}
            data={donutdata}
          />
        </Col>
        <Col xl="5" lg="12">
          <Card style={{}}>
            <CardHeader>Category Wise Expenses</CardHeader>
            <ListGroup flush>
              <ListGroupItem>EMI - 200$</ListGroupItem>
              <ListGroupItem>RENT - 200$</ListGroupItem>
              <ListGroupItem>OPERATION - 200$</ListGroupItem>
              <ListGroupItem>SALLARY - 200$</ListGroupItem>
              <ListGroupItem>EMI - 200$</ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        {/* <Col xl='4' lg='12'>
            <ApexDonutChart heading="Expense Proportion" subheading="Total Expenses - $1234" labeldata={['EMI','RENTS','OPERATIONS','SALLARY']} />
          </Col> */}
        <Col xl="3" lg="12">
          <ApexBarChart
            direction={isRtl ? 'rtl' : 'ltr'}
            info={colors.info.main}
            heading="Month Wise Expense"
            subheading="---"
          />
        </Col>

        {/* <Col sm='12'>
            <p>
              A React.js component for ApexCharts. Read full documnetation{' '}
              <a href='https://github.com/apexcharts/react-apexcharts' target='_blank' rel='noopener noreferrer'>
                here
              </a>
            </p>
          </Col> */}
        <Col sm="2">
          {/* <p>Enable Month Wise</p> */}
          <FormGroup switch>
            <Input type="switch" checked={switchstate} onClick={handleswitch} />
            <Label check>Enable Month View</Label>
          </FormGroup>
        </Col>
        <Col sm="2">
          <select onChange={handleselect} class="form-select" aria-label="Default select example">
            {categoryselect.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </Col>
        <Col sm="2">
          <select
            onChange={handleselect}
            class="form-select"
            aria-label="Default select example"
            disabled={switchstate && 'disabled'}
          >
            {monthselect.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </Col>
        <Col sm="2">
          <select onChange={handleselect} class="form-select" aria-label="Default select example">
            {yearselect.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </Col>
        <Col sm="2">
          <button type="button" class="btn btn-primary">
            Filter
          </button>
        </Col>
        <p></p>
        <Col sm="12">
          <Accordion accordiondata={accordiondata} />
        </Col>
        <Col sm="12">
          <p>Select Expense category to see details view.</p>
          <Card>
            <select onChange={handleselect} class="form-select" aria-label="Default select example">
              {expensecategories.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </Card>
        </Col>
        <Col sm="12">
          <ApexAreaChart
            data={areachartdata}
            heading="Category Expenses"
            subheading="transport"
            direction={isRtl ? 'rtl' : 'ltr'}
          />
        </Col>

        {/* <Col sm='12'>
                    <ApexColumnChart direction={isRtl ? 'rtl' : 'ltr'} />
                </Col>
                <Col sm='12'>
                    <ApexScatterChart
                        direction={isRtl ? 'rtl' : 'ltr'}
                        primary={colors.primary.main}
                        success={colors.success.main}
                        warning={colors.warning.main}
                    />
                </Col>
                <Col sm='12'>
                    <ApexLineChart direction={isRtl ? 'rtl' : 'ltr'} warning={colors.warning.main} />
                </Col> */}
        {/* <Col xl='6' lg='12'>
                    <ApexBarChart direction={isRtl ? 'rtl' : 'ltr'} info={colors.info.main} />
                </Col>
                <Col xl='6' lg='12'>
                    <ApexCandlestickChart
                        direction={isRtl ? 'rtl' : 'ltr'}
                        success={colors.success.main}
                        danger={colors.danger.main}
                    />
                </Col> */}
        {/* <Col xl='6' lg='12'>
                    <ApexHeatmapChart />
                </Col>
                <Col xl='6' lg='12'>
                    <ApexRadialBarChart />
                </Col>
                <Col xl='6' lg='12'>
                    <ApexRadarChart />
                </Col>
                <Col xl='6' lg='12'>
                    <ApexDonutChart />
                </Col> */}
      </Row>
    </Fragment>
  );
};

export default Expense;
