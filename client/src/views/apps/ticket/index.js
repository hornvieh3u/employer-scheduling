// ** React Imports
import { useParams } from 'react-router-dom';
import { Fragment, useContext, useEffect, useState } from 'react';

// ** Email App Component Imports
import Mails from './Mails';
import Sidebar from './Sidebar';

// ** Third Party Components
import classnames from 'classnames';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import {
  getMails,
  getTickets,
  selectMail,
  updateMails,
  paginateMail,
  selectAllMail,
  updateMailLabel,
  resetSelectedMail,
  selectCurrentMail,
  selectCurrentTicket,
  updateTickets,
  selectTicket,
  selectAllTickets,
  resetSelectedTickets,
  deleteTickets
} from './store';

// ** Styles
import '@styles/react/apps/app-email.scss';
import { SocketContext } from '../../../utility/context/Socket';

const EmailApp = () => {
  // ** States
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);

  // ** Toggle Compose Function
  const toggleCompose = () => setComposeOpen(!composeOpen);

  // ** Socket Context
  const socket = useContext(SocketContext);

  // ** Store Variables
  const dispatch = useDispatch();
  const store = useSelector((state) => state.ticket);

  // ** Vars
  const params = useParams();

  // ** UseEffect: GET initial data on Mount
  useEffect(() => {
    dispatch(
      getMails({
        q: query || '',
        folder: params.folder || 'inbox',
        label: params.label || ''
      })
    );
    dispatch(getTickets());

    socket.onAny((eventName, data) => {
      switch (eventName) {
        case 'newEmail':
          dispatch(getTickets());
          break;
      }
    });
    return () => {
      socket.off('newEmail');
    };
  }, [query, params.folder, params.label]);

  return (
    <Fragment>
      <Sidebar
        store={store}
        dispatch={dispatch}
        getMails={getMails}
        sidebarOpen={sidebarOpen}
        toggleCompose={toggleCompose}
        setSidebarOpen={setSidebarOpen}
        resetSelectedMail={resetSelectedMail}
        resetSelectedTickets={resetSelectedTickets}
      />
      <div className="content-right">
        <div className="content-body">
          <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <Mails
            store={store}
            query={query}
            setQuery={setQuery}
            dispatch={dispatch}
            getMails={getMails}
            selectMail={selectMail}
            selectTicket={selectTicket}
            updateMails={updateMails}
            updateTickets={updateTickets}
            composeOpen={composeOpen}
            paginateMail={paginateMail}
            selectAllMail={selectAllMail}
            toggleCompose={toggleCompose}
            setSidebarOpen={setSidebarOpen}
            updateMailLabel={updateMailLabel}
            selectCurrentMail={selectCurrentMail}
            selectCurrentTicket={selectCurrentTicket}
            selectAllTickets={selectAllTickets}
            resetSelectedMail={resetSelectedMail}
            resetSelectedTickets={resetSelectedTickets}
            deleteTickets={deleteTickets}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default EmailApp;
