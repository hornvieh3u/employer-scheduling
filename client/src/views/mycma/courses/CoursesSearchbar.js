// ** Icons Imports
import { Search } from 'react-feather';

// ** Reactstrap Imports
import { Row, Col, InputGroup, Input, InputGroupText } from 'reactstrap';

const CoursesSearchbar = (props) => {
  // ** Props
  const { dispatch, getProducts, store } = props;

  return (
    <div id="ecommerce-searchbar" className="ecommerce-searchbar">
      <Row className="mt-1">
        <Col sm="12">
          <InputGroup className="input-group-merge">
            <Input
              className="search-product"
              placeholder="Search Courses"
              onChange={(e) => dispatch(getProducts({ ...store.params, q: e.target.value }))}
            />
            <InputGroupText>
              <Search className="text-muted" size={14} />
            </InputGroupText>
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
};

export default CoursesSearchbar;
