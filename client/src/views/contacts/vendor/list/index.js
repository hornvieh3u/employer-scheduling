import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** User List Component
import Table from './vendorTable'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'

import { useSelector } from 'react-redux'

const Relationship = () => {
    const { totalLeadCount, coldLeadCount, warmLeadCount, hotLeadCount } =
        useSelector((state) => state.vendorContact)

    return (
        <Fragment>
            <Breadcrumbs
                breadCrumbTitle="Vendor"
                breadCrumbParent="Contacts"
                breadCrumbActive="Vendor"
            />
            <div className="app-user-list">
                <Row>
                    <Col lg="3" sm="6">
                        <StatsHorizontal
                            color="primary"
                            statTitle="Total Vendor"
                            icon={<User size={20} />}
                            renderStats={
                                <h3 className="fw-bolder mb-75">
                                    {totalLeadCount?.data}
                                </h3>
                            }
                        />
                    </Col>
                    <Col lg="3" sm="6">
                        <StatsHorizontal
                            color="danger"
                            statTitle="Retail"
                            icon={<UserPlus size={20} />}
                            renderStats={
                                <h3 className="fw-bolder mb-75">
                                    {coldLeadCount?.data}
                                </h3>
                            }
                        />
                    </Col>
                    <Col lg="3" sm="6">
                        <StatsHorizontal
                            color="success"
                            statTitle="Online"
                            icon={<UserCheck size={20} />}
                            renderStats={
                                <h3 className="fw-bolder mb-75">
                                    {warmLeadCount?.data}
                                </h3>
                            }
                        />
                    </Col>
                    <Col lg="3" sm="6">
                        <StatsHorizontal
                            color="warning"
                            statTitle="Other"
                            icon={<UserX size={20} />}
                            renderStats={
                                <h3 className="fw-bolder mb-75">
                                    {' '}
                                    {hotLeadCount?.data}
                                </h3>
                            }
                        />
                    </Col>
                </Row>
                <Table />
            </div>
        </Fragment>
    )
}

export default Relationship
