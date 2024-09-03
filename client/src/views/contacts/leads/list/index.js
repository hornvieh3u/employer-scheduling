import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** User List Component
import Table from './leadsTable'

// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX, List, Columns } from 'react-feather'

// ** Styles
// import '@styles/react/apps/app-users.scss'
import '@styles/react/apps/app-kanban.scss'
import { useSelector } from 'react-redux'

const Leads = () => {
    const { totalLeadCount, coldLeadCount, warmLeadCount, hotLeadCount } =
        useSelector((state) => state.leadContact)

    return (
        <Fragment>
            <Breadcrumbs
                breadCrumbTitle="Leads"
                breadCrumbParent="Contacts"
                breadCrumbActive="Leads"
            />
            <div className="app-user-list">
                <Row>
                    <Col lg="3" sm="6">
                        <StatsHorizontal
                            color="primary"
                            statTitle="Total Leads"
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
                            statTitle="Cold Leads"
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
                            statTitle="Warm Leads"
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
                            statTitle="Hot Leads"
                            icon={<UserX size={20} />}
                            renderStats={
                                <h3 className="fw-bolder mb-75">
                                    
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

export default Leads
