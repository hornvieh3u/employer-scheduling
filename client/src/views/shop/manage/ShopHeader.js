// ** React Imports
import { useState } from 'react';
import { Link } from 'react-router-dom';

// ** Icons Imports
import { AlignJustify, Rss, Info, Image, Users, Edit, Eye } from 'react-feather';

// ** Reactstrap Imports
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button } from 'reactstrap';

const ShopHeader = ({ data, active, toggleTab }) => {
  // ** States
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Card className="profile-header mb-2">
      <CardImg src={data.coverImg} alt="User Profile Image" top />
      <div className="position-relative">
        <div className="profile-img-container d-flex align-items-center">
          <div className="profile-img">
            <img className="rounded img-fluid" src={data.avatar} alt="Card image" />
          </div>
          <div className="profile-title ms-3">
            <h2 className="text-white">
              Backyard Burgers{' '}
              <Link to="/shop/backyard-burgers">
                <Eye size={20} className="ms-1" />
              </Link>
            </h2>
            <p className="text-white">Best Burger In Town</p>
          </div>
        </div>
      </div>
      <div className="profile-header-nav">
        <Navbar
          container={false}
          className="justify-content-end justify-content-md-between w-100"
          expand="md"
          light
        >
          <Button color="" className="btn-icon navbar-toggler" onClick={toggle}>
            <AlignJustify size={21} />
          </Button>
          <Collapse isOpen={isOpen} navbar>
            <div className="profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0">
              <Nav className="mb-0" pills>
                <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={active === '1'}
                    onClick={() => toggleTab('1')}
                  >
                    <span className="d-none d-md-block">Dashboard</span>
                    <Rss className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={active === '2'}
                    onClick={() => toggleTab('2')}
                  >
                    <span className="d-none d-md-block">Products</span>
                    <Info className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={active === '3'}
                    onClick={() => toggleTab('3')}
                  >
                    <span className="d-none d-md-block">Category</span>
                    <Image className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={active === '4'}
                    onClick={() => toggleTab('4')}
                  >
                    <span className="d-none d-md-block">Customers</span>
                    <Users className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={active === '5'}
                    onClick={() => toggleTab('5')}
                  >
                    <span className="d-none d-md-block">Orders</span>
                    <Users className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={active === '6'}
                    onClick={() => toggleTab('6')}
                  >
                    <span className="d-none d-md-block">Coupons</span>
                    <Users className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={active === '7'}
                    onClick={() => toggleTab('7')}
                  >
                    <span className="d-none d-md-block">Settings</span>
                    <Users className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={active === '8'}
                    onClick={() => toggleTab('8')}
                  >
                    <span className="d-none d-md-block">FAQ</span>
                    <Users className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
              </Nav>
              <Button color="primary">
                <Edit className="d-block d-md-none" size={14} />
                <span className="fw-bold d-none d-md-block">Edit</span>
              </Button>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </Card>
  );
};

export default ShopHeader;
