// ** React Imports
import { Fragment, useState } from 'react'

// ** Third Party Components
import classnames from 'classnames'

// ** Components
import RecipientsTable from './RecipientsTable'

import {
    Tag,
    Trash,
    Edit2,
    Folder,
    ChevronLeft,
    ChevronRight
} from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Badge,
    Card,
    CardBody,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown
} from 'reactstrap'

const MailDetails = (props) => {
    // ** Props
    const {
        mail,
        openMail,
        dispatch,
        labelColors,
        setOpenMail,
        paginateMail,
        handleMailToTrash,
        handleFolderUpdate,
        handleLabelsUpdate,
        handleMailReadUpdate
    } = props

    // ** States
    const [showReplies, setShowReplies] = useState(false)

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
                    Completed
                </Badge>
            ))
        }
    }

    // ** Renders Attachments
    const renderAttachments = (arr) => {
        return arr.map((item, index) => {
            return (
                <a
                    key={item.fileName}
                    href="/"
                    onClick={(e) => e.preventDefault()}
                    className={classnames({
                        'mb-50': index + 1 !== arr.length
                    })}
                >
                    <img
                        src={item.thumbnail}
                        alt={item.fileName}
                        width="16"
                        className="me-50"
                    />
                    <span className="text-muted fw-bolder align-text-top">
                        {item.fileName}
                    </span>
                    <span className="text-muted font-small-2 ms-25">{`(${item.size})`}</span>
                </a>
            )
        })
    }

    // ** Renders Messages
    const renderMessage = (obj) => {
        return (
            <Card>
                <CardBody className="mail-message-wrapper pt-2">
                    <div
                        className="mail-message"
                        dangerouslySetInnerHTML={{ __html: obj.message }}
                    ></div>
                </CardBody>
                {obj.attachments && obj.attachments.length ? (
                    <CardFooter>
                        <div className="mail-attachments">
                            <div className="d-flex flex-column">
                                {renderAttachments(obj.attachments)}
                            </div>
                        </div>
                    </CardFooter>
                ) : null}
            </Card>
        )
    }

    const handleGoBack = () => {
        setOpenMail(false)
    }

    const handleFolderClick = (e, folder, id) => {
        handleFolderUpdate(e, folder, [id])
        handleGoBack()
    }

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
                            <span
                                className="go-back me-1"
                                onClick={handleGoBack}
                            >
                                <ChevronLeft size={20} />
                            </span>
                            <h4 className="email-subject mb-0">
                                {mail.subject}
                            </h4>
                        </div>
                        <div className="email-header-right ms-2 ps-1">
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
                                                onClick={(e) =>
                                                    handleFolderClick(
                                                        e,
                                                        'draft',
                                                        mail.id
                                                    )
                                                }
                                                className="d-flex align-items-center"
                                            >
                                                <Folder
                                                    className="me-50"
                                                    size={18}
                                                />
                                                <span>Invoices</span>
                                            </DropdownItem>
                                            <DropdownItem
                                                tag="a"
                                                href="/"
                                                onClick={(e) =>
                                                    handleFolderClick(
                                                        e,
                                                        'spam',
                                                        mail.id
                                                    )
                                                }
                                                className="d-flex align-items-center"
                                            >
                                                <Folder
                                                    className="me-50"
                                                    size={18}
                                                />
                                                <span>Contracts</span>
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
                                                onClick={(e) =>
                                                    handleLabelsUpdate(
                                                        e,
                                                        'personal'
                                                    )
                                                }
                                                className="d-flex align-items-center"
                                            >
                                                <span className="bullet bullet-success bullet-sm me-50" />
                                                <span>Completed</span>
                                            </DropdownItem>
                                            <DropdownItem
                                                tag="a"
                                                href="/"
                                                onClick={(e) =>
                                                    handleLabelsUpdate(
                                                        e,
                                                        'company'
                                                    )
                                                }
                                                className="d-flex align-items-center"
                                            >
                                                <span className="bullet bullet-primary bullet-sm me-50" />
                                                <span>Viewed</span>
                                            </DropdownItem>
                                            <DropdownItem
                                                tag="a"
                                                href="/"
                                                onClick={(e) =>
                                                    handleLabelsUpdate(
                                                        e,
                                                        'important'
                                                    )
                                                }
                                                className="d-flex align-items-center"
                                            >
                                                <span className="bullet bullet-warning bullet-sm me-50" />
                                                <span>Waiting</span>
                                            </DropdownItem>
                                            <DropdownItem
                                                tag="a"
                                                href="/"
                                                onClick={(e) =>
                                                    handleLabelsUpdate(
                                                        e,
                                                        'private'
                                                    )
                                                }
                                                className="d-flex align-items-center"
                                            >
                                                <span className="bullet bullet-danger bullet-sm me-50" />
                                                <span>Expired</span>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </li>
                                <li className="list-inline-item me-1">
                                    <span className="action-icon">
                                        <Edit2 size={18} />
                                    </span>
                                </li>
                                <li className="list-inline-item me-1">
                                    <span className="action-icon">
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
                                                          emailId: mail.id
                                                      })
                                                  )
                                                : null
                                        }}
                                    >
                                        <ChevronLeft
                                            size={18}
                                            className={classnames({
                                                'text-muted':
                                                    !mail.hasPreviousMail
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
                                                          emailId: mail.id
                                                      })
                                                  )
                                                : null
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
                    <PerfectScrollbar
                        className="email-scroll-area"
                        options={{ wheelPropagation: false }}
                    >
                        <Row>
                            <Col sm="12">
                                <div className="email-label">
                                    {renderLabels(mail.labels)}
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="12">{renderMessage(mail)}</Col>
                        </Row>
                        <Row>
                            <Col sm="12">
                                <Card>
                                    <CardBody>
                                        <h5 className="mb-1">Recipients</h5>
                                        <RecipientsTable />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </PerfectScrollbar>
                </Fragment>
            ) : null}
        </div>
    )
}

export default MailDetails
