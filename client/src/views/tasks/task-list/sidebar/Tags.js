// ** React Imports
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

const Tags = (props) => {
  return (
    <Fragment>
      <div className="mb-1">
        <Button
          color="primary"
          // onClick={handleAddClick}
          block
          outline
        >
          Create New Tag
        </Button>
      </div>
      <ListGroup className="list-group-labels">
        <ListGroupItem
          // active={handleActiveItem('team')}
          className="d-flex align-items-center"
          tag={Link}
          to="/goals"
          action
        >
          <span className="bullet bullet-sm bullet-primary me-1"></span>
          <span className="align-middle">Team</span>
        </ListGroupItem>
        <ListGroupItem
          // active={handleActiveItem('low')}
          className="d-flex align-items-center"
          tag={Link}
          to="/goals"
          action
        >
          <span className="bullet bullet-sm bullet-success me-1"></span>
          <span className="align-middle">Low</span>
        </ListGroupItem>
        <ListGroupItem
          // active={handleActiveItem('medium')}
          className="d-flex align-items-center"
          tag={Link}
          to="/goals"
          action
        >
          <span className="bullet bullet-sm bullet-warning me-1"></span>
          <span className="align-middle">Medium</span>
        </ListGroupItem>
        <ListGroupItem
          // active={handleActiveItem('high')}
          className="d-flex align-items-center"
          tag={Link}
          to="/goals"
          action
        >
          <span className="bullet bullet-sm bullet-danger me-1"></span>
          <span className="align-middle">High</span>
        </ListGroupItem>
        <ListGroupItem
          // active={handleActiveItem('update')}
          className="d-flex align-items-center"
          tag={Link}
          to="/goals"
          action
        >
          <span className="bullet bullet-sm bullet-info me-1"></span>
          <span className="align-middle">Update</span>
        </ListGroupItem>
      </ListGroup>
    </Fragment>
  );
};

export default Tags;
