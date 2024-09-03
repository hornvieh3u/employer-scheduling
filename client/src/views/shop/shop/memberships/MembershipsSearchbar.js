// ** Icons Imports
import { Search } from 'react-feather'

// ** Reactstrap Imports
import { Row, Col, InputGroup, Input, InputGroupText, Button } from 'reactstrap'

const MembershipsSearchbar = props => {
  // ** Props
  const { dispatch, getMemberships, store, setSidebarOpen } = props
  const addmembership=()=>{
    setSidebarOpen(true);
  }
  return (
    <div id='ecommerce-searchbar' className='ecommerce-searchbar'>
      <Row className='mt-1'>
        <Col sm='10'>
          <InputGroup className='input-group-merge'>
            <Input
              className='search-product'
              placeholder='Search Membership'
              onChange={e => dispatch(getMemberships({ ...store.params, q: e.target.value }))}
            />
            <InputGroupText>
              <Search className='text-muted' size={14} />
            </InputGroupText>
          </InputGroup>
        </Col>
        <Col sm='2'>
        <button className="btn btn-primary" onClick={addmembership}>Add Membership</button>
        </Col>
      </Row>
    </div>
  )
}

export default MembershipsSearchbar
