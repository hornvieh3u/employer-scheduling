// ** Third Party Components
import Chart from 'react-apexcharts';

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap';

const ApexDonutChart = (props) => {
  const { workTime, remainingTime, restTime, data } = props;
  const series = [restTime, remainingTime, workTime];
  let donutdata = [];
  let headingdata = [];
  let subheadingdata = [];
  let labeldata = [];
  if (data === undefined) {
    donutdata = series;
    headingdata = 'Top projects';
    labeldata = ['Rest', 'Remaining', 'Work'];
  } else {
    donutdata = data;
    subheadingdata = subheading;
    headingdata = heading;
    labeldata = label;
  }
  const donutColors = {
    series1: '#ffe700',
    series2: '#00d4bd',
    series3: '#826bf8'
  };

  // ** Chart Options
  const options = {
    legend: {
      show: true,
      position: 'bottom'
    },
    labels: labeldata,

    colors: [donutColors.series1, donutColors.series2, donutColors.series3],
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
                return `${parseInt(val)}Mins`;
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
      <CardHeader>
        <div>
          <CardTitle className="mb-75" tag="h5">
            {headingdata}
          </CardTitle>
          <CardSubtitle className="text-muted">{subheadingdata}</CardSubtitle>
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ height: '300px' }}>
          <Chart options={options} series={donutdata} type="donut" height={300} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ApexDonutChart;
