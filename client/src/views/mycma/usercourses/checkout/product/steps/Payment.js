import React, { useState } from 'react';

// ** Icon Imports
import { PlusCircle } from 'react-feather';
import { BsCreditCard, BsCash } from 'react-icons/bs';

// ** Components
import CardPayment from '../CardPayment';
import CashPayment from '../CashPayment';

// ** Reactstrap Imports
import {
  Form,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const Payment = () => {
  const [active, setActive] = useState('1');

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <Form
      className="list-view product-checkout"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="payment-type">
        <Card>
          <CardHeader className="flex-column align-items-start">
            <CardTitle tag="h4">Payment options</CardTitle>
            <CardText className="text-muted mt-25">
              Be sure to click on correct payment option
            </CardText>
          </CardHeader>
          <CardBody>
            <Nav className="justify-content-center" tabs>
              <NavItem>
                <NavLink
                  active={active === '1'}
                  onClick={() => {
                    toggle('1');
                  }}
                >
                  <BsCreditCard size={18} />
                  <span className="align-middle">ATM Card</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === '2'}
                  onClick={() => {
                    toggle('2');
                  }}
                >
                  <BsCash size={18} />
                  <span className="align-middle">Cash Payment</span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent className="py-50" activeTab={active}>
              <TabPane tabId="1">
                <CardPayment />
              </TabPane>
              <TabPane tabId="2">
                <CashPayment />
              </TabPane>
            </TabContent>

            <hr className="my-2" />
            <div className="gift-card mb-25">
              <CardText>
                <PlusCircle className="me-50" size={21} />
                <span className="align-middle">Add Gift Card</span>
              </CardText>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="amount-payable checkout-options">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Price Details</CardTitle>
          </CardHeader>
          <CardBody>
            <ul className="list-unstyled price-details">
              <li className="price-detail">
                <div className="details-title">Price of 3 items</div>
                <div className="detail-amt">
                  <strong>$699.30</strong>
                </div>
              </li>
              <li className="price-detail">
                <div className="details-title">Delivery Charges</div>
                <div className="detail-amt discount-amt text-success">Free</div>
              </li>
            </ul>
            <hr />
            <ul className="list-unstyled price-details">
              <li className="price-detail">
                <div className="details-title">Amount Payable</div>
                <div className="detail-amt fw-bolder">$699.30</div>
              </li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </Form>
  );
};

export default Payment;
