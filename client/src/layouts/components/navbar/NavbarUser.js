// ** Dropdowns Imports
import IntlDropdown from './IntlDropdown';
import CartDropdown from './CartDropdown';
import UserDropdown from './UserDropdown';
import NavbarSearch from './NavbarSearch';
import NotificationDropdown from './NotificationDropdown';
import Avatar from '@components/avatar';

// ** Third Party Components
import { Sun, Moon, Briefcase } from 'react-feather';

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const NavbarUser = (props) => {
  // ** Props
  const { skin, setSkin } = props;

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className="ficon" onClick={() => setSkin('light')} />;
    } else {
      return <Moon className="ficon" onClick={() => setSkin('dark')} />;
    }
  };

  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <NavItem className="d-none d-lg-block">
        <NavLink tag={Link} to="/wallet" className="nav-link-style">
          <Briefcase className="rounded me-50" size={18} style={{color: "#ea5455"}} />
          Wallet
        </NavLink>
      </NavItem>
      <IntlDropdown />
      <NavItem className="d-none d-lg-block">
        <NavLink className="nav-link-style">
          <ThemeToggler />
        </NavLink>
      </NavItem>
      <NavbarSearch />
      <CartDropdown />
      <NotificationDropdown />
      <UserDropdown />
    </ul>
  );
};
export default NavbarUser;
