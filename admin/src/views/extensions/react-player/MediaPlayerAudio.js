// ** React Imports
import { useState, useEffect, useRef } from 'react'

// ** Reactstrap Imports
import { Card, CardTitle, CardHeader, CardBody, Row, Col, Table, Button, Progress, Input } from 'reactstrap'

// ** Third Party Components
import Prism from 'prismjs'
import ReactPlayer from 'react-player'

const pad = string => {
  return `0${string}`.slice(-2)
}
const format = seconds => {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(date.getUTCSeconds())
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`
  }
  return `${mm}:${ss}`
}

const MediaPlayerAudio = () => {
  // ** Ref
  const audioRef = useRef(null)

  // ** Vars
  const urlLink = 'https://soundcloud.com/2ghost/we-will-rock-you'

  // ** States
  const [url, setUrl] = useState(urlLink)
  const [played, setPlayed] = useState(0)
  const [loaded, setLoaded] = useState(0)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.75)
  const [duration, setDuration] = useState(0)
  const [seeking, setSeeking] = useState(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    Prism.highlightAll()
  })

  const load = url => {
    setUrl(url)
    setPlayed(0)
    setLoaded(0)
  }
  const handlePlayPause = () => setPlaying(!playing)
  const handleStop = () => {
    setPlaying(false)
    setUrl(null)
  }
  const handleVolumeChange = e => setVolume(parseFloat(e.target.value))
  const handleToggleMuted = () => setMuted(!muted)
  const handlePlay = () => setPlaying(true)
  const handlePause = () => setPlaying(false)
  const handleSeekMouseDown = () => setSeeking(true)
  const handleSeekChange = e => {
    setPlayed(parseFloat(e.target.value))
  }
  const handleSeekMouseUp = e => {
    setSeeking(false)
    audioRef.current.seekTo(parseFloat(e.target.value))
  }
  const handleProgress = state => {
    if (!seeking) {
      setPlayed(state.played)
      setLoaded(state.loaded)
    }
  }
  const handleDuration = duration => setDuration(duration)
  useEffect(() => {
    if (url === null) {
      load(urlLink)
    }
  })

  // for duration, elapsed and remaining time
  const Duration = ({ className, seconds }) => {
    return (
      <time dateTime={`P${Math.round(seconds)}S`} className={className}>
        {format(seconds)}
      </time>
    )
  }
  const preDuration = <Duration seconds={duration}></Duration>
  const preElapsed = <Duration seconds={duration * played}></Duration>
  const preRemaining = <Duration seconds={duration * (1 - played)}></Duration>

  return (
    <Card className='overflow-hidden'>
      <CardHeader>
        <CardTitle tag='h4'>Audio</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col xs={12}>
            <ReactPlayer
              ref={audioRef}
              url={url}
              className='react-player-audio'
              width='500px'
              height='290px'
              playing={playing}
              volume={volume}
              muted={muted}
              onPlay={handlePlay}
              onPause={handlePause}
              onSeek={e => console.log('onSeek', e)}
              onProgress={handleProgress}
              onDuration={handleDuration}
            />
          </Col>
          <Col xs={12}>
            <Table borderless className='mt-2'>
              <tbody>
                <tr>
                  <td className='text-end'>Controls</td>
                  <td>
                    <Button variant='primary' outline onClick={handleStop} className='my-25 me-50'>
                      Stop
                    </Button>
                    <Button variant='primary' outline onClick={handlePlayPause} className='my-25'>
                      {playing ? 'Pause' : 'Play'}
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className='text-end'>Seek</td>
                  <td>
                    <input
                      type='range'
                      min={0}
                      max={0.999999}
                      step='any'
                      value={played}
                      onMouseDown={handleSeekMouseDown}
                      onChange={handleSeekChange}
                      onMouseUp={handleSeekMouseUp}
                    />
                  </td>
                </tr>
                <tr>
                  <td className='text-end'>Volume</td>
                  <td>
                    <input type='range' min={0} max={1} step='any' value={volume} onChange={handleVolumeChange} />
                  </td>
                </tr>
                <tr>
                  <td className='text-end'>Muted</td>
                  <td>
                    <div className='form-check'>
                      <Input type='checkbox' id='audioMuted' checked={muted} onChange={handleToggleMuted} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='text-end'>Played</td>
                  <td>
                    <Progress value={played} max={1} />
                  </td>
                </tr>
                <tr>
                  <td className='text-end'>Loaded</td>
                  <td>
                    <Progress value={loaded} max={1} />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col xs={12}>
            <pre className='language-js'>
              <code className='language-js'>
                {`state={
  playing: ${playing},
  volume: ${volume.toFixed(2)},
  played: ${played.toFixed(2)},
  loaded: ${loaded.toFixed(2)},
  duration: ${format(preDuration.props.seconds)},
  elapsed: ${format(preElapsed.props.seconds)},
  remaining: ${format(preRemaining.props.seconds)}
}
`}
              </code>
            </pre>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default MediaPlayerAudio
