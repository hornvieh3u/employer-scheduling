// ** Third Party Components
import Chart from 'react-apexcharts';

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap';

const ApexRadiarChart = (props) => {
  const { heading, subheading, label, data } = props;
  const series = [85, 16, 50, 50];
  let donutdata = [];
  let headingdata = [];
  let subheadingdata = [];
  let labeldata = [];
  if (data === undefined) {
    donutdata = series;
    subheadingdata = 'Subheading';
    headingdata = 'Heading';
    labeldata = ['EMI', 'RENTS', 'OPERATIONS', 'SALLARY'];
  } else {
    donutdata = data;
    subheadingdata = subheading;
    headingdata = heading;
    labeldata = label;
  }
  const donutColors = {
    series1: '#ffe700',
    series2: '#00d4bd',
    series3: '#826bf8',
    series4: '#2b9bf4',
    series5: '#FFA1A1'
  };

  // ** Chart Options
  const options = {
    legend: {
      show: true,
      position: 'bottom'
    },
    labels: labeldata,

    colors: [donutColors.series1, donutColors.series5, donutColors.series3, donutColors.series2],
    dataLabels: {
      enabled: true,
      formatter(val) {
        return `${parseInt(val)}%`;
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '2rem',
              fontFamily: 'Montserrat'
            },
            value: {
              fontSize: '1rem',
              fontFamily: 'Montserrat',
              formatter(val) {
                return `${parseInt(val)}%`;
              }
            },
            total: {
              show: true,
              fontSize: '1.5rem',
              label: 'Operational',
              formatter() {
                return '31%';
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1.5rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1.5rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  };

  // ** Chart Series

  return (
    <Card>
      {/* <CardHeader>
        <div>
          <CardTitle className='mb-75' tag='h4'>
            {headingdata}
          </CardTitle>
          <CardSubtitle className='text-muted'>{subheadingdata}</CardSubtitle>
        </div>
      </CardHeader> */}
      <CardBody>
        <Chart options={options} series={donutdata} type="donut" height={350} />
      </CardBody>
    </Card>
  );
};

export default ApexRadiarChart;
