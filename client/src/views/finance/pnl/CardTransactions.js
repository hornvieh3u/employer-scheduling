// ** Custom Components
import Avatar from '@components/avatar';

// ** Icons Imports
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const CardTransactions = () => {
  const transactionsArr = [
    {
      title: 'Wallet',
      color: 'light-primary',
      subtitle: 'Recurring',
      amount: '$74',
      Icon: Icon['Pocket']
      // down: true
    },
    {
      title: 'Bank Transfer',
      color: 'light-success',
      subtitle: 'Add Money',
      amount: '$480',
      Icon: Icon['Check']
    },
    {
      title: 'Paypal',
      color: 'light-danger',
      subtitle: 'One Time',
      amount: '+ $590',
      Icon: Icon['DollarSign']
    },
    {
      title: 'Mastercard',
      color: 'light-warning',
      subtitle: 'Ordered Food',
      amount: '$12',
      Icon: Icon['CreditCard']
      // down: true
    },
    {
      title: 'Transfer',
      color: 'light-info',
      subtitle: 'Refund',
      amount: '$98',
      Icon: Icon['TrendingUp']
    }
  ];

  const renderTransactions = () => {
    return transactionsArr.map((item) => {
      return (
        <div key={item.title} className="transaction-item">
          <div className="d-flex">
            <Avatar className="rounded" color={item.color} icon={<item.Icon size={18} />} />
            <div>
              <h6 className="transaction-title">{item.title}</h6>
              <small>{item.subtitle}</small>
            </div>
          </div>
          <div className={`fw-bolder ${item.down ? 'text-danger' : 'text-success'}`}>
            {item.amount}
          </div>
        </div>
      );
    });
  };

  return (
    <Card className="card-transaction">
      <CardHeader>
        <CardTitle tag="h4">Expense Type</CardTitle>
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <Icon.MoreVertical size={17} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
              <Icon.Download size={14} className="me-50" />
              <span className="align-middle">Download</span>
            </DropdownItem>
            <DropdownItem tag={Link} className="w-100">
              <Icon.Edit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                // store.dispatch(deleteInvoice(row.id))
              }}
            >
              <Icon.Trash size={14} className="me-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem>
            <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
              <Icon.Copy size={14} className="me-50" />
              <span className="align-middle">Duplicate</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>
        <div className="pb-2 border-bottom">{renderTransactions()}</div>
        <div className="pt-2">
          <div key={transactionsArr[2].title} className="transaction-item">
            <div className="d-flex">
              <Avatar
                className="rounded"
                color={transactionsArr[2].color}
                icon={<Icon.TrendingUp size={18} />}
              />
              <div>
                <h6 className="transaction-title">Total</h6>
                {/* <small>{transactionsArr[2].subtitle}</small> */}
              </div>
            </div>
            <div
              className={`fw-bolder ${transactionsArr[2].down ? 'text-danger' : 'text-success'}`}
            >
              {transactionsArr[2].amount}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardTransactions;
