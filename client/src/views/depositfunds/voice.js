import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Row, Col, Modal, ModalHeader } from 'reactstrap';
import { customInterIceptors } from '../../lib/AxiosProvider';
import states from './states';
const API = customInterIceptors();
import moment from 'moment';
import { Device } from 'twilio-client';
import { Mic, MicOff } from 'react-feather';
import TimerCountDown from './Timer';
import { GetCallHistory, handelCallModel } from './store';
import DataTable from 'react-data-table-component';
function Voice({}) {
  const dispatch = useDispatch();
  let { userData } = useSelector((state) => state.auth);
  let { openCallModel } = useSelector((state) => state.deposit);

  // handel call module start
  const [stateCall, setStateCall] = useState(states.CONNECTING);
  const [device, setDevice] = useState(null);
  const [token, setToken] = useState('');
  const [ciTime, setCiTime] = useState('');
  const [recording, setRecording] = useState(false);
  const twilioFormat = (phoneNumber) => {
    if (phoneNumber.charAt(0) !== '+') {
      return '+' + phoneNumber;
    } else {
      return phoneNumber;
    }
  };

  useEffect(() => {
    // handleCall()
    // handleClick()
    const init = async () => {
      try {
        if (token) {
          const device = new Device();
          setDevice(device);

          setStateCall(states.READY);
          device.setup(token, {
            // Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
            // providing better audio quality in restrained network conditions. Opus will be default in 2.0.
            codecPreferences: ['opus', 'pcmu'],
            // Use fake DTMF tones client-side. Real tones are still sent to the other end of the call,
            // but the client-side DTMF tones are fake. This prevents the local mic capturing the DTMF tone
            // a second time and sending the tone twice. This will be default in 2.0.
            fakeLocalDTMF: true,
            // Use `enableRingingState` to enable the device to emit the `ringing`
            // state. The TwiML backend also needs to have the attribute
            // `answerOnBridge` also set to true in the `Dial` verb. This option
            // changes the behavior of the SDK to consider a call `ringing` starting
            // from the connection to the TwiML backend to when the recipient of
            // the `Dial` verb answers.
            enableRingingState: true,
            allowIncomingWhileBusy: true
          });
          // device.sounds.incoming(ignore_call);
          // device.on('ready',function (device){

          // });
          device.on('ready', () => {
            var params = {
              To: twilioFormat(openCallModel?.phone),
              //  To: '+1' + num
              user_id: userData?.id,
              recording: recording
            };
            device.connect(params);
            setStateCall(states.READY);
          });
          device.on('error', function (error) {
            setStateCall('Connection Declined');
          });
          device.on('connect', function (conn) {
            // conn.sendDigits($(this).attr('data-digit'));
            setStateCall('On call');
          });
          device.on('disconnect', function (conn) {
            device.disconnectAll();
            setStateCall('end');
          });
          device.on('incoming', function (conn) {
            conn.accept();
            setStateCall('Incoming');
          });
        }
      } catch (e) {}
    };
    init();
  }, [token]);

  const handleHangup = () => {
    try {
      device.disconnectAll();

      setStateCall('end');
    } catch (e) {}
  };
  const handleClick = async () => {
    try {
      var jun = moment().format('x');
      setCiTime(jun);
      const identity = 'phil';
      // setClicked(true)
      let data = await API.get(`voice/voice/token?identity=${encodeURIComponent(identity)}`);

      setToken(data?.data?.token);
    } catch (e) {}
  };
  const handleChangeToggle = async (event) => {
    setRecording(!recording);
  };
  const CloseModal = async () => {
    let obj = {
      ...openCallModel,
      openCallModel: !openCallModel?.openCallModel
    };
    dispatch(handelCallModel(obj));
  };

  return (
    <div>
      <Modal isOpen={openCallModel?.openCallModel ? true : false} toggle={() => CloseModal()}>
        <ModalHeader toggle={() => CloseModal()}>Voice Call</ModalHeader>
        <div
          style={{
            width: '500px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Row>
            <br />
            <br />
            {stateCall === states.INCOMING ? (
              <div className="call">
                <p style={{ color: 'white' }}>Incomming {num}</p>

                <Button
                  style={{ color: 'white' }}
                  // </div>handleClick={() => handleCall()}
                  color="green"
                >
                  Call Incomming
                </Button>
              </div>
            ) : stateCall === states.ON_CALL ? (
              <div className="call" style={{ width: '500px' }}>
                {/* <p style={{ color: 'white' }}>on Call {num}</p> */}
                {/* <br /> <br /> */}
                <div style={{ textAlign: 'center' }}>
                  <TimerCountDown ciTime={ciTime} />
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  {recording && (
                    <div>
                      recording call now ..
                      <br /> <br />
                    </div>
                  )}

                  <Button
                    color="danger"
                    className="mr-1 mb-1"
                    style={{ color: 'white' }}
                    onClick={() => handleHangup()}
                  >
                    Call end
                  </Button>
                </div>
              </div>
            ) : stateCall == states.Declined ? (
              <div className="call">
                <p style={{ color: 'white' }}>Call Declined </p>

                <Button
                  style={{ color: 'white' }}
                  // </div>handleClick={() => handleCall()}
                  color="green"
                >
                  Call Declined
                </Button>
              </div>
            ) : stateCall == states.callEnd ? (
              <div className="call">
                <p>Your Call ended Successfully</p>
              </div>
            ) : (
              <div className="call" style={{ width: '500px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                ></div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20
                  }}
                >
                  <div>
                    Number: {openCallModel?.phone}
                    {/*  */}
                  </div>

                  <Col>
                    <div className="d-flex justify-content-end">
                      <Button
                        color="link"
                        onClick={() => handleChangeToggle()}
                        style={{
                          height: 40
                        }}
                      >
                        <Mic />
                      </Button>
                      <Button color="primary" className="mr-1 mb-1" onClick={() => handleClick()}>
                        call
                      </Button>
                    </div>
                  </Col>
                </div>
              </div>
            )}

            <br />
            <br />
          </Row>
        </div>
      </Modal>
    </div>
  );
}
export default memo(Voice);
