// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

// ** Third Party Components
import ReactPlayer from 'react-player'

const MediaPlayerVideo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Video</CardTitle>
      </CardHeader>
      <CardBody>
        <ReactPlayer
          width='100%'
          controls={true}
          className='react-player-video'
          url='http://youtube.com/watch?v=FCPdIvXo2rU'
        />
      </CardBody>
    </Card>
  )
}

export default MediaPlayerVideo
