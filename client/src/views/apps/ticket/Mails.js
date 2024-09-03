// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Mail Components Imports
import MailCard from './MailCard';
import MailDetails from './MailDetails';
import ComposePopUp from './ComposePopup';

// ** Utils
import { formatDateToMonthShort } from '@utils';

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Menu, Search, Folder, Tag, Mail, Trash, Edit2, Info, Send } from 'react-feather';

// ** Reactstrap Imports
import {
  Input,
  Label,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  InputGroupText,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import { getTickets, resetSelectedTickets } from './store';
import { useParams } from 'react-router-dom';

const Mails = (props) => {
  // ** Props
  const {
    query,
    store,
    setQuery,
    dispatch,
    selectMail,
    composeOpen,
    updateMails,
    selectTicket,
    updateTickets,
    paginateMail,
    selectAllMail,
    toggleCompose,
    setSidebarOpen,
    updateMailLabel,
    selectAllTickets,
    resetSelectedMail,
    selectCurrentMail,
    selectCurrentTicket,
    deleteTickets
  } = props;

  const { mails, selectedMails, tickets, selectedTickets } = store;

  // ** Params
  const { status } = useParams();

  // ** States
  const [openMail, setOpenMail] = useState(false);

  // ** Variables
  const labelColors = {
    personal: 'success',
    company: 'primary',
    important: 'warning',
    private: 'danger'
  };

  // ** Handles Update Functions
  const handleMailClick = (id) => {
    dispatch(selectCurrentTicket(id));
    setOpenMail(true);
  };

  // ** Handles SelectAll
  const handleSelectAll = (e) => {
    // dispatch(selectAllMail(e.target.checked))
    dispatch(selectAllTickets({ checked: e.target.checked, status }));
  };

  /*eslint-disable */

  // ** Handles Folder Update
  const handleFolderUpdate = (e, status, ids = selectedTickets) => {
    e.preventDefault();
    dispatch(updateTickets({ ticketIds: ids, dataToUpdate: { status } }));
    dispatch(resetSelectedTickets());
    dispatch(updateMails({ emailIds: ids, dataToUpdate: { status } }));
    dispatch(resetSelectedMail());
  };

  // // ** Handles Ticket Status Update
  // const handleFolderUpdate = (e, status, ids = selectedTickets) => {
  //   e.preventDefault()
  //   dispatch(updateTickets({ ticketIds: ids, dataToUpdate: { status }}))
  //   dispatch(updateMails({ emailIds: ids, dataToUpdate: { folder } }))
  //   dispatch(resetSelectedMail())
  // }

  // ** Handles Label Update
  const handleLabelsUpdate = (e, label, ids = selectedMails) => {
    e.preventDefault();
    dispatch(updateMailLabel({ emailIds: ids, label }));
    dispatch(resetSelectedMail());
  };

  // ** Handles Mail Read Update
  const handleMailReadUpdate = (arr, bool) => {
    dispatch(updateMails({ emailIds: arr, dataToUpdate: { isRead: bool } })).then(() =>
      dispatch(resetSelectedMail())
    );
    dispatch(selectAllMail(false));
  };

  // ** Handles Move to Trash
  const handleMailToTrash = (ids) => {
    dispatch(updateTickets({ ticketIds: ids, dataToUpdate: { status: 'trash' } }));
    dispatch(resetSelectedTickets());
    dispatch(resetSelectedMail());
  };
  /*eslint-enable */

  // ** Renders Mail
  const renderMails = () => {
    if (tickets.filter((ticket) => ticket.status.toLowerCase() === status).length) {
      return tickets
        .filter((ticket) => ticket.status.toLowerCase() === status)
        .map((ticket, index) => {
          return (
            <MailCard
              ticket={ticket}
              key={index}
              dispatch={dispatch}
              selectMail={selectMail}
              selectTicket={selectTicket}
              updateMails={updateMails}
              labelColors={labelColors}
              selectedMails={selectedMails}
              selectedTickets={selectedTickets}
              handleMailClick={handleMailClick}
              handleMailReadUpdate={handleMailReadUpdate}
              formatDateToMonthShort={formatDateToMonthShort}
            />
          );
        });
    }
  };

  return (
    <Fragment>
      <div className="email-app-list">
        <div className="app-fixed-search d-flex align-items-center">
          <div
            className="sidebar-toggle d-block d-lg-none ms-1"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size="21" />
          </div>
          <div className="d-flex align-content-center justify-content-between w-100">
            <InputGroup className="input-group-merge">
              <InputGroupText>
                <Search className="text-muted" size={14} />
              </InputGroupText>
              <Input
                id="email-search"
                placeholder="Search ticket"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
        <div className="app-action">
          <div className="action-left form-check">
            <Input
              type="checkbox"
              id="select-all"
              onChange={handleSelectAll}
              checked={
                selectedTickets.length &&
                selectedTickets.length ===
                  tickets.filter((ticket) => ticket.status.toLowerCase() === status).length
              }
            />
            <Label className="form-check-label fw-bolder ps-25 mb-0" for="select-all">
              Select All
            </Label>
          </div>
          {selectedMails.length ? (
            <div className="action-right">
              <ul className="list-inline m-0">
                <li className="list-inline-item me-1">
                  <UncontrolledDropdown>
                    <DropdownToggle tag="span">
                      <Folder size={18} />
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleFolderUpdate(e, 'open')}
                        className="d-flex align-items-center"
                      >
                        <Mail className="me-50" size={18} />
                        <span>Open</span>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleFolderUpdate(e, 'pending')}
                        className="d-flex align-items-center"
                      >
                        <Send className="me-50" size={18} />
                        <span>Pending</span>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleFolderUpdate(e, 'spam')}
                        className="d-flex align-items-center"
                      >
                        <Info className="me-50" size={18} />
                        <span>Spam</span>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleFolderUpdate(e, 'completed')}
                        className="d-flex align-items-center"
                      >
                        <Trash className="me-50" size={18} />
                        <span>Completed</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </li>
                <li className="list-inline-item me-1">
                  <UncontrolledDropdown>
                    <DropdownToggle tag="span">
                      <Tag size={18} />
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleLabelsUpdate(e, 'personal')}
                        className="d-flex align-items-center"
                      >
                        <span className="bullet bullet-success bullet-sm me-50" />
                        <span>Personal</span>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleLabelsUpdate(e, 'company')}
                        className="d-flex align-items-center"
                      >
                        <span className="bullet bullet-primary bullet-sm me-50" />
                        <span>Company</span>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleLabelsUpdate(e, 'important')}
                        className="d-flex align-items-center"
                      >
                        <span className="bullet bullet-warning bullet-sm me-50" />
                        <span>Important</span>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleLabelsUpdate(e, 'private')}
                        className="d-flex align-items-center"
                      >
                        <span className="bullet bullet-danger bullet-sm me-50" />
                        <span>Private</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </li>
                <li className="list-inline-item me-1">
                  <span className="action-icon">
                    <Mail size={18} />
                  </span>
                </li>
                <li className="list-inline-item">
                  <span className="action-icon" onClick={() => handleMailToTrash(selectedTickets)}>
                    <Trash size={18} />
                  </span>
                </li>
              </ul>
            </div>
          ) : null}
        </div>

        <PerfectScrollbar className="email-user-list" options={{ wheelPropagation: false }}>
          {mails.length ? (
            <ul className="email-media-list">{renderMails()}</ul>
          ) : (
            <div className="no-results d-block">
              <h5>No Items Found</h5>
            </div>
          )}
        </PerfectScrollbar>
      </div>
      <MailDetails
        openMail={openMail}
        dispatch={dispatch}
        mail={store.currentMail}
        ticket={store.currentTicket}
        labelColors={labelColors}
        setOpenMail={setOpenMail}
        updateMails={updateMails}
        paginateMail={paginateMail}
        updateMailLabel={updateMailLabel}
        handleMailToTrash={handleMailToTrash}
        handleFolderUpdate={handleFolderUpdate}
        handleLabelsUpdate={handleLabelsUpdate}
        handleMailReadUpdate={handleMailReadUpdate}
        formatDateToMonthShort={formatDateToMonthShort}
      />
      <ComposePopUp composeOpen={composeOpen} toggleCompose={toggleCompose} />
    </Fragment>
  );
};

export default Mails;
