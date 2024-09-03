// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Demo Components
import MediaPlayerVideo from './MediaPlayerVideo'
import MediaPlayerAudio from './MediaPlayerAudio'
import MediaPlayerControlled from './MediaPlayerControlled'

// ** Custom Components
import ExtensionsHeader from '@components/extensions-header'

const ReactPlayer = () => {
  return (
    <Fragment>
      <ExtensionsHeader
        title='React Player'
        subTitle='React Media Player'
        link='https://github.com/CookPete/react-player'
      />
      <Row>
        <Col sm='12'>
          <MediaPlayerVideo />
        </Col>
        <Col sm='12'>
          <MediaPlayerControlled />
        </Col>
        <Col sm='12'>
          <MediaPlayerAudio />
        </Col>
      </Row>
    </Fragment>
  )
}

export default ReactPlayer
