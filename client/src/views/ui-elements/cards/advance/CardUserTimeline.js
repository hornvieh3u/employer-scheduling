// ** Custom Components
import Avatar from '@components/avatar'
import Timeline from '@components/timeline'
import AvatarGroup from '@components/avatar-group'

// ** Icons Imports
import { List, MoreVertical } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

// ** Images
import jsonImg from '@src/assets/images/icons/json.png'
import ceo from '@src/assets/images/portrait/small/avatar-s-9.jpg'

const avatarGroupArr = [
  {
    title: 'Billy Hopkins',
    img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default,
    placement: 'bottom',
    imgHeight: 33,
    imgWidth: 33
  },
  {
    title: 'Amy Carson',
    img: require('@src/assets/images/portrait/small/avatar-s-6.jpg').default,
    placement: 'bottom',
    imgHeight: 33,
    imgWidth: 33
  },
  {
    title: 'Brandon Miles',
    img: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default,
    placement: 'bottom',
    imgHeight: 33,
    imgWidth: 33
  },
  {
    title: 'Daisy Weber',
    img: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default,
    placement: 'bottom',
    imgHeight: 33,
    imgWidth: 33
  },
  {
    title: 'Jenny Looper',
    img: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default,
    placement: 'bottom',
    imgHeight: 33,
    imgWidth: 33
  }
]

const data = [
  {
    title: '12 Invoices have been paid',
    content: 'Invoices have been paid to the company.',
    meta: '12 min ago',
    metaClassName: 'me-1',
    customContent: (
      <div className='d-flex align-items-center'>
        <img className='me-1' src={jsonImg} alt='data.json' height='23' />
        <div className='mb-0'>data.json</div>
      </div>
    )
  },
  {
    title: 'Client Meeting',
    content: 'Project meeting with john @10:15am.',
    meta: '45 min ago',
    metaClassName: 'me-1',
    color: 'warning',
    customContent: (
      <div className='d-flex align-items-center'>
        <Avatar img={ceo} />
        <div className='ms-50'>
          <h6 className='mb-0'>John Doe (Client)</h6>
          <span>CEO of Infibeam</span>
        </div>
      </div>
    )
  },
  {
    title: 'Create a new project for client',
    content: 'Add files to new design folder',
    color: 'info',
    meta: '2 days ago',
    metaClassName: 'me-1',
    customContent: <AvatarGroup data={avatarGroupArr} />
  },
  {
    title: 'Create a new project for client',
    content: 'Add files to new design folder',
    color: 'danger',
    meta: '5 days ago',
    metaClassName: 'me-1'
  }
]

const UserTimeline = () => {
  return (
    <Card className='card-user-timeline'>
      <CardHeader>
        <div className='d-flex align-items-center'>
          <List className='user-timeline-title-icon' />
          <CardTitle tag='h4'>User Timeline</CardTitle>
        </div>
        <MoreVertical size={18} className='cursor-pointer' />
      </CardHeader>
      <CardBody>
        <Timeline className='ms-50 mb-0' data={data} />
      </CardBody>
    </Card>
  )
}

export default UserTimeline
