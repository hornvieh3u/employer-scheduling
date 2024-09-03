// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from "reactstrap";

// ** Demo Components
import Tabs from "./Tabs";
// import Breadcrumbs from '@components/breadcrumbs'
import BillingTabContent from "./BillingTabContent";
import AccountTabContent from "./AccountTabContent";
import SecurityTabContent from "./SecurityTabContent";
import ConnectionsTabContent from "./ConnectionsTabContent";
import NotificationsTabContent from "./NotificationsTabContent";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/pages/page-account-settings.scss";

const AdminDetails = () => {
  // ** States
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Fragment>
      <Row>
        <Col xs={12}>
          <Tabs className="mb-2" activeTab={activeTab} toggleTab={toggleTab} />

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <AccountTabContent />
            </TabPane>
            <TabPane tabId="2">
              <SecurityTabContent />
            </TabPane>
            <TabPane tabId="3">
              <BillingTabContent />
            </TabPane>
            <TabPane tabId="4">
              <NotificationsTabContent />
            </TabPane>
            <TabPane tabId="5">
              <ConnectionsTabContent />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AdminDetails;
