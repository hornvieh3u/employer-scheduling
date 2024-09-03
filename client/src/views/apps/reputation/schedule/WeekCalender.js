import { useState } from 'react';
import img5 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
import { Col, NavLink, Nav, Row, TabContent, TabPane } from 'reactstrap';
import BudetTool from './BudgetTool';
import LaborTool from './LaborTool';
import { Sun, User, ChevronDown, ChevronUp } from 'react-feather';

// const weather = [Sun]
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const WeekCalender = ({}) => {
  const [openfooter, setopenfooter] = useState(false);
  const [active, setActive] = useState('1');
  const handleFormOpen = () => {};
  const toggle = (tab) => {
    setActive(tab);
    setopenfooter(true);
  };

  const handleClickOpen = () => {
    setopenfooter(!openfooter);
  };
  return (
    <div>
      <Row>
        <Col>
          <div className="shadow p-3 mb-5 bg-white rounded">
            <table className="w-100 bordered-table">
              <tbody>
                <tr>
                  <td className="cursor-pointer" width={'300'}>
                    <div className="d-flex">
                      <div className="m-1">
                        <button className="btn btn-primary">Add Employee</button>
                      </div>
                      <div className="d-flex m-1">
                        <Sun size={18} />
                        <span>30 F</span>
                        <br />
                        <span>66</span>
                      </div>
                    </div>
                  </td>
                  {weekDays.map((item, i) => {
                    return (
                      <td className="cursor-pointer" align="center" key={i}>
                        <span>
                          <b>{item}</b>
                        </span>
                        <br />
                        <div className="d-flex justify-content-between p-1">
                          {[].map((img, i) => {
                            return (
                              <div className="d-flex">
                                <Sun />
                                <span>30 F</span>
                              </div>
                            );
                          })}
                          <div className="d-flex justify-content-between w-100 m-1">
                            <User />
                            <span>10</span>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="p-1">Events</td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                </tr>
                <tr>
                  <td className="p-1">Open</td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                </tr>
                <tr>
                  <td className="cursor-pointer" id="sub">
                    <div className="d-flex p-1">
                      <img
                        src={img5}
                        className="rounded-circle me-2"
                        alt="Generic placeholder image"
                        height="50"
                        width="50"
                      />
                      <div className="ml-1">
                        <h5 className="font-weight-bold">Antanio S</h5>
                        <span>0.00 - $0.00</span>
                      </div>
                    </div>
                  </td>
                  <td className="cursor-pointer">
                    <div draggable="true">
                      <div>
                        <div style={{ backgroundColor: 'rgb(150, 89, 169)' }}>L</div>
                        <div className="base-shift__details">
                          <div className="base-shift__time">10am - 6pm</div>
                        </div>
                      </div>
                    </div>
                    <div data-product-tour-target="create_a_shift" onClick={handleFormOpen}></div>
                  </td>
                  <td className="cursor-pointer">
                    <div data-product-tour-target="create_a_shift" onClick={handleFormOpen}></div>{' '}
                  </td>
                  <td className="cursor-pointer">
                    <div data-product-tour-target="create_a_shift" onClick={handleFormOpen}></div>
                  </td>
                  <td className="cursor-pointer">
                    <div data-product-tour-target="create_a_shift" onClick={handleFormOpen}></div>
                  </td>
                  <td className="cursor-pointer">
                    <div data-product-tour-target="create_a_shift"></div>
                  </td>
                  <td className="cursor-pointer">
                    <div data-product-tour-target="create_a_shift" onClick={handleFormOpen}></div>
                  </td>
                  <td className="cursor-pointer">
                    <div data-product-tour-target="create_a_shift" onClick={handleFormOpen}></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
        <Col sm="12" md="12" lg="12">
          <div>
            <div className="d-flex justify-content-between h-100">
              <div className="shadow bg-white cursor-pointer">
                <Nav tabs className="p-0">
                  <NavLink
                    active={active === '1'}
                    className="rounded"
                    onClick={() => {
                      toggle('1');
                    }}
                  >
                    Budget Tool
                  </NavLink>
                  <NavLink
                    active={active === '2'}
                    className="rounded"
                    onClick={() => {
                      toggle('2');
                    }}
                  >
                    Optimal Labor
                  </NavLink>
                </Nav>
              </div>
              <div onClick={handleClickOpen} className="shadow bg-white cursor-pointer p-1">
                {openfooter ? <ChevronDown /> : <ChevronUp />}
              </div>
            </div>
            <div className="w-100 shadow bg-white h-100">
              <TabContent activeTab={active}>
                <TabPane tabId="1">
                  <div className="w-100 shadow p-3 bg-white rounded">
                    <BudetTool openfooter={openfooter} />
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div className="w-100 shadow p-3 bg-white rounded">
                    <LaborTool openfooter={openfooter} />
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default WeekCalender;
