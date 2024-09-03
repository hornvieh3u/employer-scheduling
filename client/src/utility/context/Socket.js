import React, { createContext, Fragment, useEffect } from 'react';
import socketio from 'socket.io-client';

import Avatar from '@components/avatar';
import { Coffee, UploadCloud } from 'react-feather';

import { toast, Slide } from 'react-toastify';
import { getUserData, isUserLoggedIn } from '../Utils';

const SOCKET_URL = process.env.REACT_APP_API;

const SocketContext = createContext();

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title fw-bold">Hi, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        You have successfully logged in as an {role} user to My Manager. Now you can start to
        explore. Enjoy!
      </span>
    </div>
  </Fragment>
);

const UploadProofContent = ({ taskName, subTaskName, proofType, endDate, employeeInfo, photo }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<UploadCloud size={16} />} />
        <h6 className="toast-title fw-bold">Welcome, {getUserData().fullName}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        <b>{employeeInfo.fullName}</b> has uploaded the {proofType} for the{' '}
        <strong>
          {taskName} / {subTaskName}
        </strong>
        .
        <br />
        Please check the task.
      </span>
      <div style={{ width: '100%' }}>
        <img
          src={photo}
          width="200px"
          style={{
            display: 'block',
            alignContent: 'center',
            borderRadius: '5px',
            marginTop: '20px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        />
      </div>
    </div>
  </Fragment>
);

const CompleteTaskContent = ({ taskName, endTime, employeeInfo }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title fw-bold">Welcome, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        <b>{employeeInfo.fullName}</b> has completed all tasks for
        <strong>{taskName}</strong>
        at {endTime}. Please check the task.
        <br />
      </span>
    </div>
  </Fragment>
);

const InCompleteContent = ({ taskName, endTime, employeeInfo }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title fw-bold">Welcome, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        <b>{employeeInfo.fullName}</b> didn't have completed the task-
        <strong>{taskName}</strong>
        at {endTime}. Please check the task.
        <br />
      </span>
    </div>
  </Fragment>
);

const NewEmailToastContent = ({ name, message }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title fw-bold">{name} replied to ticket</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>{message}</span>
    </div>
  </Fragment>
);

// const socket = socketio('https://mymanager.com/api');
const socket = socketio('http://192.168.108.41:5000/api');

socket.connect();

const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.connect();
    socket.on('ready-client', () => {
      console.log('ready-client received');
      if (isUserLoggedIn()) socket.emit('adminRegister', getUserData().id);
    });

    socket.on('newEmail', ({ reqName, message }) => {
      toast.info(<NewEmailToastContent />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 20000,
        position: 'bottom-right'
      });
    });

    socket.on('startChat', (data) => {
      toast.success(
        <ToastContent
          name={data.fullName || data.username || 'John Doe'}
          role={data.role || 'admin'}
        />,
        {
          icon: false,
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
          position: 'bottom-right'
        }
      );
    });

    // Task Reporting Notification
    socket.on('receiveWorkProof', (data) => {
      console.log('receiveWorkProof', data);
      const { taskName, subTaskName, photo, proofType, startDate, endDate, employeeInfo } = data;
      toast.success(
        <UploadProofContent
          taskName={taskName}
          subTaskName={subTaskName}
          proofType={proofType}
          startDate={startDate}
          endDate={endDate}
          employeeInfo={employeeInfo}
          photo={photo}
        />,
        {
          icon: false,
          hideProgressBar: true,
          transition: Slide,
          autoClose: 10000,
          position: 'top-right'
        }
      );
    });

    return () => {
      socket.off('startChat');
      socket.off('ready-client');
      socket.off('newEmail');
    };
  }, [socket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketProvider, SocketContext };
