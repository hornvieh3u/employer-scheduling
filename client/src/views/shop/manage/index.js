// ** React Imports
import { Fragment, useState, useEffect, useContext } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Pages
import ShopHeader from './ShopHeader'
import Statistics from './Statistics'
import Products from './Products'
import Category from './Category'
import Customers from './Customers'
import Orders from './Orders'
import Coupons from './Coupons'
import Settings from './Settings'
import FAQ from "./faq"

// ** Styles
import '@styles/react/pages/page-profile.scss'

const ManageShop = () => {
    // ** States
    const [data, setData] = useState(null)

    const [active, setActive] = useState('1')

    const toggleTab = (tab) => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    // ** Context
    const { colors } = useContext(ThemeColors)

    useEffect(() => {
        axios.get('/profile/data').then((response) => setData(response.data))
    }, [])
    return (
        <Fragment>
            <Breadcrumbs
                breadCrumbTitle="Shop"
                breadCrumbParent="Shop"
                breadCrumbActive="Manage Shop"
            />
            {data !== null ? (
                <div id="user-profile">
                    <Row>
                        <Col sm="12">
                            <ShopHeader
                                data={data.header}
                                active={active}
                                toggleTab={toggleTab}
                            />
                        </Col>
                    </Row>
                    <TabContent activeTab={active}>
                        <TabPane tabId="1">
                            <Statistics />
                        </TabPane>
                        <TabPane tabId="2">
                            <Products />
                        </TabPane>
                        <TabPane tabId="3">
                            <Category />
                        </TabPane>
                        <TabPane tabId="4">
                            <Customers />
                        </TabPane>
                        <TabPane tabId="5">
                            <Orders />
                        </TabPane>
                        <TabPane tabId="6">
                            <Coupons />
                        </TabPane>
                        <TabPane tabId="7">
                            <Settings />
                        </TabPane>
                        <TabPane tabId="8">
                            <FAQ />
                        </TabPane>
                    </TabContent>
                </div>
            ) : null}
        </Fragment>
    )
}

export default ManageShop
