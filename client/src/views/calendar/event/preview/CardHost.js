// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import { Mail, Phone, User } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardTitle, CardBody } from 'reactstrap'

const CardHost = (props) => {
    const { hostInfo } = props

    return (
        <Card className="card-developer-meetup">
            <CardBody>
                <CardTitle>Host Info</CardTitle>
                <div className="d-flex align-items-center">
                    <Avatar
                        color="light-primary"
                        className="rounded me-1"
                        icon={<User size={18} />}
                    />
                    <h6 className="mb-0">{hostInfo.hostName}</h6>
                </div>
                <div className="d-flex align-items-center mt-2">
                    <Avatar
                        color="light-primary"
                        className="rounded me-1"
                        icon={<Phone size={18} />}
                    />
                    <h6 className="mb-0">{hostInfo.hostMobileNumber}</h6>
                </div>
                <div className="d-flex align-items-center mt-2">
                    <Avatar
                        color="light-primary"
                        className="rounded me-1"
                        icon={<Mail size={18} />}
                    />
                    <h6 className="mb-0">{hostInfo.hostEmail}</h6>
                </div>
            </CardBody>
        </Card>
    )
}

export default CardHost
