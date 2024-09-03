// ** Third Party Components
import Chart from 'react-apexcharts'

import { TrendingUp, Box, DollarSign, FileText } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button
} from 'reactstrap'


const options = {
  chart: {
    sparkline: {
      enabled: false
    },
  },
  colors: ['#51e5a8'],
  plotOptions: {
    radialBar: {
      offsetY: -20,
      startAngle: -180,
      endAngle: 180,
      hollow: {
        size: '60%',
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          color: 'red',
          fontFamily: 'Montserrat',
          fontSize: '1.5rem',
          fontWeight: '600',
          offsetY: 0,
        },

      }
    }
  },
  stroke: {
    lineCap: 'round'
  },
},
series = [83]

const Employeestatus = ({ cols }) => {
  const data = [
    {
      title: '0',
      subtitle: 'Sales',
      color: 'light-primary',
      icon: <TrendingUp size={24} />
    },
    {
      title: '0',
      subtitle: 'Invoices',
      color: 'light-info',
      icon: <FileText size={24} />
    },
    {
      title: '0',
      subtitle: 'Dummy',
      color: 'light-danger',
      icon: <Box size={24} />
    },
    {
      title: '0',
      subtitle: 'Revenue',
      color: 'light-success',
      icon: <DollarSign size={24} />
    }
  ]


  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">Employee Status</CardTitle>
      </CardHeader>
      <CardBody className="statistics-body">
        <div className='d-flex justify-content-between'>
          <div>
            <Button color='danger'>{'DeActivete'}</Button>
          </div>
          <Chart options={options} series={series} type='radialBar' height={150} />
        </div>
      </CardBody>
    </Card>
  )
}

export default Employeestatus
