// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Demo Components
import RadioBasic from './RadioBasic'
import RadioColors from './RadioColors'

const Radio = () => {
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Radio' breadCrumbParent='Form Elements' breadCrumbActive='Radio' />
      <Row>
        <Col sm='12'>
          <RadioBasic />
        </Col>
        <Col sm='12'>
          <RadioColors />
        </Col>
      </Row>
    </Fragment>
  )
}
export default Radio
