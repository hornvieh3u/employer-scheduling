// ** React Imports
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import { ListGroup, ListGroupItem } from 'reactstrap';

const Filters = (props) => {
  return (
    <Fragment>
      <ListGroup className="list-group-labels">
        <ListGroupItem
          className="d-flex align-items-center"
          tag={Link}
          to="/goals"
          // active={handleActiveItem('team')}
          // onClick={() => handleTag('team')}
          action
        >
          <span className="bullet bullet-sm bullet-primary me-1"></span>
          <span className="align-middle">All</span>
        </ListGroupItem>
        <ListGroupItem
          className="d-flex align-items-center"
          tag={Link}
          to="/goals"
          // active={handleActiveItem('low')}
          // onClick={() => handleTag('low')}
          action
        >
          <span className="bullet bullet-sm bullet-success me-1"></span>
          <span className="align-middle">Weekly</span>
        </ListGroupItem>
        <ListGroupItem
          className="d-flex align-items-center"
          tag={Link}
          to="/goals"
          // active={handleActiveItem('medium')}
          // onClick={() => handleTag('medium')}
          action
        >
          <span className="bullet bullet-sm bullet-warning me-1"></span>
          <span className="align-middle">Monthly</span>
        </ListGroupItem>
        <ListGroupItem
          className="d-flex align-items-center"
          tag={Link}
          to="/goals"
          // active={handleActiveItem('high')}
          // onClick={() => handleTag('high')}
          action
        >
          <span className="bullet bullet-sm bullet-danger me-1"></span>
          <span className="align-middle">Quarterly</span>
        </ListGroupItem>
        <ListGroupItem
          className="d-flex align-items-center"
          tag={Link}
          to="/goals"
          // active={handleActiveItem('update')}
          // onClick={() => handleTag('update')}
          action
        >
          <span className="bullet bullet-sm bullet-info me-1"></span>
          <span className="align-middle">Annual</span>
        </ListGroupItem>
        <ListGroupItem
          className="d-flex align-items-center"
          tag={Link}
          to="/goals"
          // active={handleActiveItem('update')}
          // onClick={() => handleTag('update')}
          action
        >
          <span className="bullet bullet-sm bullet-success me-1"></span>
          <span className="align-middle">Completed</span>
        </ListGroupItem>
        <ListGroupItem
          className="d-flex align-items-center"
          tag={Link}
          to="/goals"
          // active={handleActiveItem('update')}
          // onClick={() => handleTag('update')}
          action
        >
          <span className="bullet bullet-sm bullet-primary me-1"></span>
          <span className="align-middle">Not Completed</span>
        </ListGroupItem>
      </ListGroup>
    </Fragment>
  );
};

export default Filters;
