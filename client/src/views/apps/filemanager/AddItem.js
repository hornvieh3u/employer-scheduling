// ** Third Party Components
import { ArrowUp } from 'react-feather';
import { useDispatch } from 'react-redux';

// ** Reactstrap Imports
import { Row, Col, Card, CardBody } from 'reactstrap';

const AddItem = () => {
  const dispatch = useDispatch();

  return (
    <div className="px-1">
      <Card className="shadow-none mb-0">
        <CardBody className="pb-1 pt-1">
          <Row>
            <Col xl="1"></Col>
            <Col xl="6">
              <b>Filename</b>
            </Col>
            <Col xl="1">
              <b>Size</b>
            </Col>
            <Col xl="2">
              <b>Last Modified</b>
            </Col>
            <Col xl="2">
              <b>Actions</b>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <div className="px-1">
        <Card className="shadow-none border cursor-pointer mb-0">
          <CardBody className="pb-1 pt-1">
            <div className="d-flex align-items-center justify-content-center w-100">
              <ArrowUp size={15} />
            </div>
            <b>....</b>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default AddItem;
