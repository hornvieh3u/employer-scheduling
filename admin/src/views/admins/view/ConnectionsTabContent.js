// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Input, Label, Button } from 'reactstrap'

// ** Icons Imports
import { Check, X, Link } from 'react-feather'

const connectedAccounts = [
  {
    checked: true,
    title: 'Google',
    subtitle: 'Calendar and contacts',
    logo: require('@src/assets/images/icons/social/google.png').default
  },
  {
    checked: false,
    title: 'Slack',
    subtitle: 'Communication',
    logo: require('@src/assets/images/icons/social/slack.png').default
  },
  {
    checked: true,
    title: 'Github',
    subtitle: 'Git repositories',
    logo: require('@src/assets/images/icons/social/github.png').default
  },
  {
    checked: false,
    title: 'Mailchimp',
    subtitle: 'Email marketing service',
    logo: require('@src/assets/images/icons/social/mailchimp.png').default
  },
  {
    checked: false,
    title: 'Asana',
    subtitle: 'Communication',
    logo: require('@src/assets/images/icons/social/asana.png').default
  }
]

const socialAccounts = [
  {
    linked: false,
    title: 'Facebook',
    logo: require('@src/assets/images/icons/social/facebook.png').default
  },
  {
    linked: true,
    title: 'Twitter',
    url: 'https://twitter.com/pixinvent',
    logo: require('@src/assets/images/icons/social/twitter.png').default
  },
  {
    linked: true,
    title: 'Linkedin',
    url: 'https://www.linkedin.com/company/pixinvent/',
    logo: require('@src/assets/images/icons/social/linkedin.png').default
  },
  {
    linked: false,
    title: 'Dribbble',
    logo: require('@src/assets/images/icons/social/dribbble.png').default
  },
  {
    linked: false,
    title: 'Behance',
    logo: require('@src/assets/images/icons/social/behance.png').default
  }
]

const ConnectionsTabContent = () => {
  return (
    <Row>
      <Col md='6'>
        <Card>
          <CardHeader className='border-bottom'>
            <CardTitle tag='h4'>Connected accounts</CardTitle>
          </CardHeader>
          <CardBody className='pt-2'>
            <p>Display content from your connected accounts on your site</p>
            {connectedAccounts.map((item, index) => {
              return (
                <div className='d-flex mt-2' key={index}>
                  <div className='flex-shrink-0'>
                    <img className='me-1' src={item.logo} alt={item.title} height='38' width='38' />
                  </div>
                  <div className='d-flex align-item-center justify-content-between flex-grow-1'>
                    <div className='me-1'>
                      <p className='fw-bolder mb-0'>{item.title}</p>
                      <span>{item.subtitle}</span>
                    </div>
                    <div className='mt-50 mt-sm-0'>
                      <div className='form-switch'>
                        <Input type='switch' defaultChecked={item.checked} id={`account-${item.title}`} />
                        <Label className='form-check-label' for={`account-${item.title}`}>
                          <span className='switch-icon-left'>
                            <Check size={14} />
                          </span>
                          <span className='switch-icon-right'>
                            <X size={14} />
                          </span>
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardBody>
        </Card>
      </Col>
      <Col md='6'>
        <Card>
          <CardHeader className='border-bottom'>
            <CardTitle tag='h4'>Social accounts</CardTitle>
          </CardHeader>
          <CardBody className='pt-2'>
            <p>Display content from social accounts on your site</p>
            {socialAccounts.map((item, index) => {
              return (
                <div className='d-flex mt-2' key={index}>
                  <div className='flex-shrink-0'>
                    <img className='me-1' src={item.logo} alt={item.title} height='38' width='38' />
                  </div>
                  <div className='d-flex align-item-center justify-content-between flex-grow-1'>
                    <div className='me-1'>
                      <p className='fw-bolder mb-0'>{item.title}</p>
                      {item.linked ? (
                        <a href={item.url} target='_blank'>
                          @pixinvent
                        </a>
                      ) : (
                        <span>Not Connected</span>
                      )}
                    </div>
                    <div className='mt-50 mt-sm-0'>
                      <Button outline className='btn-icon'>
                        {item.linked ? <X className='font-medium-3' /> : <Link className='font-medium-3' />}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default ConnectionsTabContent
