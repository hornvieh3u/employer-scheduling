import React, { memo, lazy, Fragment, useState, useEffect } from 'react';
// ** Reactstrap Imports
// ** Third Party Components
import classnames from 'classnames';

import { Row, Col } from 'reactstrap';
// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';
// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
const BuyNum = lazy(() => import('./BuyNum'));
const Sms = lazy(() => import('./Sms'));
const Subscription = lazy(() => import('./Subscription'));
const Deposit = lazy(() => import('./Deposit'));
const DepositFundsInv = lazy(() => import('./deposit/invoice/list'));
const Voice = lazy(() => import('./voice'));
const VoiceCallHistory = lazy(() => import('./ShowVoiceCallHistory'));
import Sidebar from './Sidebar';

import { GetBalanceInfo } from './store';

// ** Styles
import '@styles/react/apps/app-email.scss';

function DepositFunds() {
  const dispatch = useDispatch();
  let { userData } = useSelector((state) => state.auth);
  let { balanceInfo } = useSelector((state) => state.deposit);
  // console.log('balanceInfo', balanceInfo)

  // ** States
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);

  // ** Toggle Compose Function
  const toggleCompose = () => setComposeOpen(!composeOpen);

  // ** Store Variables

  const store = useSelector((state) => state.email);

  useEffect(() => {
    dispatch(GetBalanceInfo(userData?.id));
  }, []);
  // active items
  const [activeItem, setActiveItem] = useState('buy_number');
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Desposit Funds"
        breadCrumbParent="Settings"
        breadCrumbActive="deposit funds"
      />

      <div className="app-user-list">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="My Number"
              icon={<User size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {balanceInfo?.data?.purchased_Num ? balanceInfo?.data?.purchased_Num : 'N/A'}
                </h3>
              }
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="Voice Minutes Remaining"
              icon={<UserPlus size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {balanceInfo?.data?.cretits ? balanceInfo?.data?.cretits : 0}
                </h3>
              }
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="SMS Credits Remaining"
              icon={<UserCheck size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {balanceInfo?.data?.cretits ? balanceInfo?.data?.cretits : 0}
                </h3>
              }
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="Wallett Funds Remaining"
              icon={<UserX size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  $ {balanceInfo?.data?.wallet ? balanceInfo?.data?.wallet : 0}
                </h3>
              }
            />
          </Col>
        </Row>
        {/* <Table /> */}
      </div>
      <div className="email-application">
        <div className='content-area-wrapper'>
          <Sidebar
            store={store}
            dispatch={dispatch}
            // getMails={getMails}
            sidebarOpen={sidebarOpen}
            toggleCompose={toggleCompose}
            setSidebarOpen={setSidebarOpen}
            // resetSelectedMail={resetSelectedMail}
            setActiveItem={setActiveItem}
            activeItem={activeItem}
          />
          <div className="content-right">
            <div className="content-body">
              {/* <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen
            })}
            onClick={() => setSidebarOpen(false)}
          >
            tesssst
          </div> */}

              {activeItem === 'sms' ? (
                <Sms />
              ) : activeItem === 'wallet' ? (
                <Deposit />
              ) : activeItem === 'buy_number' ? (
                <BuyNum />
              ) : activeItem === 'deposit' ? (
                <Subscription />
              ) : activeItem === 'voice' ? (
                <VoiceCallHistory />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default memo(DepositFunds);
{
  /* <DepositFundsInv /> */
}
{
  /* <Row>
                <Col sm="12" md="3">
                    <Deposit />
                </Col>
                <Col sm="12" md="3">
                    <Subscription />
                </Col>
                <Col sm="12" md="3">
                    <Sms />
                </Col>
                <Col sm="12" md="3">
                    <BuyNum />
                </Col>
            </Row> */
}
