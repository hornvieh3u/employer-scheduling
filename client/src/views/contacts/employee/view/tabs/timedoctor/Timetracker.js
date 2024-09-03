import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { BsPlayFill, BsStopFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { apiEndWork, apiStartWork, apiUpdateWork } from '../../../store/api';
import { setDuration, setWorkHistory } from '../../../store/reducer';

const Timetracker = (props) => {
  const dispatch = useDispatch();
  const videosRef = useRef(null);
  const canvasRef = useRef(null);
  const { isStart, duration } = useSelector(({ employeeContact }) => employeeContact.workHistory);

  const [stream, setStream] = useState({});

  const { id } = useParams();

  const handleStartWorking = async () => {
    await startWork(id, props.project.value);
  };

  const handleEndWork = async () => {
    await endWork();
  };

  const formatDuration = (duration) => {
    let result = '';
    const hour = Math.floor(duration / 3600) || 0;
    result += hour >= 10 ? hour : '0' + hour;

    result += ' : ';
    const minute = Math.floor(Math.floor((duration % 3600) / 60)) || 0;
    result += minute >= 10 ? minute : '0' + minute;

    result += ' : ';
    const second = duration % 60 || 0;
    result += second >= 10 ? second : '0' + second;

    return result;
  };

  const getCurrentWork = () => {
    const currentWork = localStorage.getItem('currentWork');
    if (currentWork) return JSON.parse(currentWork);
    return null;
  };

  const startWork = async (userId, description) => {
    const canvas = document.getElementById('canvas');
    const videos = document.getElementById('videos');
    const streamData = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false
    });
    setStream(streamData);
    videos.srcObject = streamData;
    dispatch(
      setWorkHistory({
        isStart: true,
        duration
      })
    );
    await apiStartWork(userId, description);
    await run(streamData);
  };

  const endWork = async () => {
    const videos = document.getElementById('videos');
    dispatch(
      setWorkHistory({
        isStart: false,
        duration: 0
      })
    );

    // Send end api
    await apiEndWork(getCurrentWork()?._id);

    // Close all the stream.
    let tracks = stream?.getTracks();
    tracks?.forEach((track) => track.stop());
    if (videos) videos.src = null;
    localStorage.setItem('currentWork', '');
  };

  const run = async (streamData) => {
    // Return if user end working
    if (!isStart) return;

    // Return if streamData is disconnected
    if (!streamData?.active) {
      const videos = document.getElementById('videos');

      await apiEndWork(getCurrentWork()?._id);

      let tracks = streamData?.getTracks();
      tracks?.forEach((track) => track.stop());
      if (videos) videos.src = null;
      localStorage.setItem('currentWork', '');
      return;
    }

    dispatch(setDuration(duration));

    const canvas = document.getElementById('canvas');
    const imageCapture = new window.ImageCapture(streamData?.getVideoTracks()[0]);
    if (imageCapture.track.enabled || imageCapture.track.readyState === 'live') {
      const frame = await imageCapture.grabFrame();
      var ctx = canvas.getContext('2d');
      const screenshot = canvas.toDataURL();
      const image = document.getElementById('image');
      // imageRef.current.src = screenshot;
      if (screenshot) {
        image.src = screenshot;
        if (duration % 10 === 0) {
          await apiUpdateWork(getCurrentWork()?._id, screenshot);
        }
      }
      if (canvas) ctx?.drawImage(frame, 0, 0, canvas.width, canvas.height);
    }

    setTimeout(() => {
      run(streamData);
    }, 1000);
  };

  useEffect(() => {
    if (isStart && stream?.active) {
      run(stream);
    }
  }, [stream, isStart]);

  return (
    <div className="d-flex align-items-center">
      {isStart ? (
        <Button
          color="warning"
          onClick={(e) => {
            handleEndWork(true);
          }}
        >
          CLOCK OUT
          <BsStopFill />
        </Button>
      ) : (
        <Button
          color="success"
          onClick={(e) => {
            handleStartWorking(true);
          }}
        >
          CLOCK IN
          <BsPlayFill />
        </Button>
      )}
      <h3 className="d-flex px-3 m-0">{formatDuration(duration)}</h3>
      <video ref={videosRef} id="videos" width={400} height={300} hidden />
      <canvas ref={canvasRef} id="canvas" width={400} height={300} hidden />
      <canvas ref={canvasRef} id="image" width={400} height={300} hidden />
    </div>
  );
};

export default Timetracker;
