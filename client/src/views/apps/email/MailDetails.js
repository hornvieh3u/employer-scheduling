// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Utils
import { formatDate } from '@utils';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import classnames from 'classnames';

import {
  Star,
  Tag,
  Mail,
  Info,
  Trash,
  Edit2,
  Folder,
  Trash2,
  Paperclip,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CornerUpLeft,
  CornerUpRight,
  Send
} from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Badge,
  Card,
  Table,
  CardBody,
  CardFooter,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import { useSelector } from 'react-redux';

const MailDetails = (props) => {
  // ** Props
  const {
    mail,
    openMail,
    dispatch,
    labelColors,
    setOpenMail,
    updateMails,
    paginateMail,
    handleMailToTrash,
    handleFolderUpdate,
    handleLabelsUpdate,
    handleMailReadUpdate,
    formatDateToMonthShort,
    currentFolder,
    handleMailSendNow
  } = props;

  // ** States
  const [showReplies, setShowReplies] = useState(false);

  // ** Renders Labels
  const renderLabels = (arr) => {
    if (arr && arr.length) {
      return arr.map((label) => (
        <Badge
          key={label}
          color={`light-${labelColors[label]}`}
          className="me-50 text-capitalize"
          pill
        >
          {label}
        </Badge>
      ));
    }
  };

  // ** Renders Attachments
  const renderAttachments = (arr) => {
    return arr.map((item, index) => {
      return (
        <a
          key={item.name}
          href="/"
          onClick={(e) => e.preventDefault()}
          className={classnames({
            'mb-50': index + 1 !== arr.length
          })}
        >
          {item.url && <img src={item.url} alt={item.name} width="16" className="me-50" />}

          <span className="text-muted fw-bolder align-text-top">{item.name}</span>
          <span className="text-muted font-small-2 ms-25">{`(${item.size})`}</span>
        </a>
      );
    });
  };

  const { userData } = useSelector((state) => state.auth);
  const userAvatar = (userData && userData?.avatar) || null;
  const [shortName, setShortName] = useState('');

  useEffect(() => {
    if (userData) {
      if (userData?.fullName) {
        const nameOrArr = String(userData?.fullName).split(' ');
        const firstPart = nameOrArr.length > 0 ? nameOrArr[0] : '';
        const lastPart = nameOrArr.length > 1 ? nameOrArr[1] : '';
        setShortName(
          `${firstPart[0].toUpperCase()} ${lastPart[0] ? lastPart[0].toUpperCase() : ''}`
        );
      }
    } //
    return () => {};
  }, [userData]);

  // ** Renders Messages
  const renderMessage = (obj) => {
    return (
      <Card>
        <CardHeader className="email-detail-head">
          <div className="user-details d-flex justify-content-between align-items-center flex-wrap">
            {userAvatar ? (
              <Avatar img={userAvatar} />
            ) : (
              <>
                <Avatar
                  // img={userAvatar}
                  content={shortName || 'N/A'}
                  color="primary"
                  imgHeight="20px"
                  imgWidth="20px"
                  className="me-75"
                />
              </>
            )}

            <div className="mail-items">
              <h5 className="mb-0">{obj.from.name || obj.subject}</h5>
              <UncontrolledDropdown className="email-info-dropup">
                <DropdownToggle className="font-small-3 text-muted cursor-pointer" tag="span" caret>
                  <span className="me-25">{obj.from.email}</span>
                </DropdownToggle>
                <DropdownMenu>
                  <Table className="font-small-3" size="sm" borderless>
                    <tbody>
                      <tr>
                        <td className="text-end text-muted align-top">From:</td>
                        <td>{obj.from}</td>
                      </tr>
                      <tr>
                        <td className="text-end text-muted align-top">To:</td>
                        <td>{obj.to}</td>
                      </tr>
                      <tr>
                        <td className="text-end text-muted align-top">Date:</td>
                        <td>
                          {formatDateToMonthShort(obj.time)},{' '}
                          {formatDateToMonthShort(obj.time, false)}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
          <div className="mail-meta-item d-flex align-items-center">
            <small className="mail-date-time text-muted">{formatDate(obj.time)}</small>
            {currentFolder === 'scheduled' && (
              <UncontrolledDropdown className="ms-50">
                <DropdownToggle className="cursor-pointer" tag="span">
                  <MoreVertical size={14} />
                </DropdownToggle>
                <DropdownMenu end>
                  {/* <DropdownItem className="d-flex align-items-center w-100">
                                        <CornerUpLeft
                                            className="me-50"
                                            size={14}
                                        />
                                        Edit
                                    </DropdownItem> */}
                  <DropdownItem
                    className="d-flex align-items-center w-100"
                    onClick={() => {
                      handleMailSendNow([obj._id]);
                    }}
                  >
                    <Send className="me-50" size={14} />
                    Send Now
                  </DropdownItem>
                </DropdownMenu>{' '}
              </UncontrolledDropdown>
            )}
            {/* <UncontrolledDropdown className="ms-50">
                            <DropdownToggle
                                className="cursor-pointer"
                                tag="span"
                            >
                                <MoreVertical size={14} />
                            </DropdownToggle>

                            <DropdownMenu end>
                                <DropdownItem className="d-flex align-items-center w-100">
                                    <CornerUpLeft className="me-50" size={14} />
                                    Reply
                                </DropdownItem>
                                <DropdownItem className="d-flex align-items-center w-100">
                                    <CornerUpRight
                                        className="me-50"
                                        size={14}
                                    />
                                    Forward
                                </DropdownItem>
                                <DropdownItem className="d-flex align-items-center w-100">
                                    <Trash2 className="me-50" size={14} />
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown> */}
          </div>
        </CardHeader>
        <CardBody className="mail-message-wrapper pt-2">
          <div className="mail-message" dangerouslySetInnerHTML={{ __html: obj.message }}></div>
        </CardBody>
        {obj.attachments && obj.attachments.length ? (
          <CardFooter>
            <div className="mail-attachments">
              <div className="d-flex align-items-center mb-1">
                <Paperclip size={16} />
                <h5 className="fw-bolder text-body mb-0 ms-50">
                  {obj.attachments.length} Attachment
                </h5>
              </div>
              <div className="d-flex flex-column">{renderAttachments(obj.attachments)}</div>
            </div>
          </CardFooter>
        ) : null}
      </Card>
    );
  };

  // ** Renders Replies
  const renderReplies = (arr) => {
    if (arr.length && showReplies === true) {
      return arr.map((obj, index) => (
        <Row key={index}>
          <Col sm="12">{renderMessage(obj)}</Col>
        </Row>
      ));
    }
  };

  // ** Handle show replies, go back, folder & read click functions
  const handleShowReplies = (e) => {
    e.preventDefault();
    setShowReplies(true);
  };

  const handleGoBack = () => {
    setOpenMail(false);
  };

  const handleFolderClick = (e, folder, id) => {
    handleFolderUpdate(e, folder, [id]);
    handleGoBack();
  };

  const handleReadClick = () => {
    handleMailReadUpdate([mail._id], false);
    handleGoBack();
  };

  return (
    <div
      className={classnames('email-app-details', {
        show: openMail
      })}
    >
      {mail !== null && mail !== undefined ? (
        <Fragment>
          <div className="email-detail-header">
            <div className="email-header-left d-flex align-items-center">
              <span className="go-back me-1" onClick={handleGoBack}>
                <ChevronLeft size={20} />
              </span>
              <h4 className="email-subject mb-0">{mail.subject}</h4>
            </div>
            <div className="email-header-right ms-2 ps-1">
              <ul className="list-inline m-0">
                <li className="list-inline-item me-1">
                  <span
                    className="action-icon favorite"
                    onClick={() => {
                      dispatch(
                        updateMails({
                          emailIds: [mail._id],
                          dataToUpdate: {
                            isStarred: !mail.isStarred
                          }
                        })
                      );
                    }}
                  >
                    <Star
                      size={18}
                      className={classnames({
                        'text-warning fill-current': mail.isStarred
                      })}
                    />
                  </span>
                </li>
                {/* <li className="list-inline-item me-1">
                                    <UncontrolledDropdown>
                                        <DropdownToggle tag="span">
                                            <Folder size={18} />
                                        </DropdownToggle>
                                        <DropdownMenu end>
                                            <DropdownItem
                                                tag="a"
                                                href="/"
                                                onClick={(e) =>
                                                    handleFolderClick(
                                                        e,
                                                        'draft',
                                                        mail._id
                                                    )
                                                }
                                                className="d-flex align-items-center"
                                            >
                                                <Edit2
                                                    className="me-50"
                                                    size={18}
                                                />
                                                <span>Draft</span>
                                            </DropdownItem>
                                            <DropdownItem
                                                tag="a"
                                                href="/"
                                                onClick={(e) =>
                                                    handleFolderClick(
                                                        e,
                                                        'spam',
                                                        mail._id
                                                    )
                                                }
                                                className="d-flex align-items-center"
                                            >
                                                <Info
                                                    className="me-50"
                                                    size={18}
                                                />
                                                <span>Spam</span>
                                            </DropdownItem>
                                            <DropdownItem
                                                tag="a"
                                                href="/"
                                                onClick={(e) =>
                                                    handleFolderClick(
                                                        e,
                                                        'trash',
                                                        mail._id
                                                    )
                                                }
                                                className="d-flex align-items-center"
                                            >
                                                <Trash
                                                    className="me-50"
                                                    size={18}
                                                />
                                                <span>Trash</span>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </li> */}
                <li className="list-inline-item me-1">
                  <UncontrolledDropdown>
                    <DropdownToggle tag="span">
                      <Tag size={18} />
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleLabelsUpdate(e, 'personal', [mail._id])}
                        className="d-flex align-items-center"
                      >
                        <span className="bullet bullet-success bullet-sm me-50" />
                        <span>Personal</span>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleLabelsUpdate(e, 'company', [mail._id])}
                        className="d-flex align-items-center"
                      >
                        <span className="bullet bullet-primary bullet-sm me-50" />
                        <span>Company</span>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleLabelsUpdate(e, 'important', [mail._id])}
                        className="d-flex align-items-center"
                      >
                        <span className="bullet bullet-warning bullet-sm me-50" />
                        <span>Important</span>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleLabelsUpdate(e, 'private', [mail._id])}
                        className="d-flex align-items-center"
                      >
                        <span className="bullet bullet-danger bullet-sm me  -50" />
                        <span>Private</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </li>
                {/* <li className="list-inline-item me-1">
                                    <span
                                        className="action-icon"
                                        onClick={handleReadClick}
                                    >
                                        <Mail size={18} />
                                    </span>
                                </li> */}
                <li className="list-inline-item me-1">
                  <span
                    className="action-icon"
                    onClick={() => {
                      handleMailToTrash([mail._id]);
                      handleGoBack();
                    }}
                  >
                    <Trash size={18} />
                  </span>
                </li>
                <li className="list-inline-item email-prev">
                  <span
                    className={classnames({
                      'action-icon': mail.hasPreviousMail
                    })}
                    onClick={() => {
                      return mail.hasPreviousMail
                        ? dispatch(
                            paginateMail({
                              dir: 'next',
                              emailId: mail._id
                            })
                          )
                        : null;
                    }}
                  >
                    <ChevronLeft
                      size={18}
                      className={classnames({
                        'text-muted': !mail.hasPreviousMail
                      })}
                    />
                  </span>
                </li>
                <li className="list-inline-item email-next">
                  <span
                    className={classnames({
                      'action-icon': mail.hasNextMail
                    })}
                    onClick={() => {
                      return mail.hasNextMail
                        ? dispatch(
                            paginateMail({
                              dir: 'previous',
                              emailId: mail._id
                            })
                          )
                        : null;
                    }}
                  >
                    <ChevronRight
                      size={18}
                      className={classnames({
                        'text-muted': !mail.hasNextMail
                      })}
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <PerfectScrollbar className="email-scroll-area" options={{ wheelPropagation: false }}>
            <Row>
              <Col sm="12">
                <div className="email-label">{renderLabels(mail.labels)}</div>
              </Col>
            </Row>
            {mail.replies && mail.replies.length ? (
              <Fragment>
                {showReplies === false ? (
                  <Row className="mb-1">
                    <Col sm="12">
                      <a className="fw-bold" href="/" onClick={handleShowReplies}>
                        View {mail.replies.length} Earlier Messages
                      </a>
                    </Col>
                  </Row>
                ) : null}

                {renderReplies(mail.replies)}
              </Fragment>
            ) : null}
            <Row>
              <Col sm="12">{renderMessage(mail)}</Col>
            </Row>
            <Row>
              <Col sm="12">
                <Card>
                  <CardBody>
                    <h5 className="mb-0">
                      Click here to{' '}
                      <a href="/" onClick={(e) => e.preventDefault()}>
                        Reply
                      </a>{' '}
                      or{' '}
                      <a href="/" onClick={(e) => e.preventDefault()}>
                        Forward
                      </a>
                    </h5>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </PerfectScrollbar>
        </Fragment>
      ) : null}
    </div>
  );
};

export default MailDetails;
