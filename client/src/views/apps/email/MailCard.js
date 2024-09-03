import { useState, useEffect } from 'react';

// ** Custom Components & Plugins
import classnames from 'classnames';
import { Star, Paperclip } from 'react-feather';

// ** Custom Component Import
import Avatar from '@components/avatar';

// ** Utils
import { htmlToString } from '@utils';

// ** Reactstrap Imports
import { Input, Label } from 'reactstrap';
import { useSelector } from 'react-redux';

const MailCard = (props) => {
  // ** Props
  const {
    mail,
    dispatch,
    selectMail,
    labelColors,
    updateMails,
    selectedMails,
    handleMailClick,
    handleMailReadUpdate,
    formatDateToMonthShort
  } = props;

  // ** Function to render labels
  const renderLabels = (arr) => {
    if (arr && arr.length) {
      return arr.map((label) => (
        <span key={label} className={`bullet bullet-${labelColors[label]} bullet-sm mx-50`}></span>
      ));
    }
  };

  // ** Function to handle read & mail click
  const onMailClick = () => {
    handleMailClick(mail);
    handleMailReadUpdate([mail._id], true);
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

  return (
    <li
      onClick={() => onMailClick(mail._id)}
      className={classnames('d-flex user-mail', {
        'mail-read': mail.isRead
      })}
    >
      <div className="mail-left">
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

        {/* <Avatar
                    img={
                        mail.from.avatar ||
                        'https://64.media.tumblr.com/0f1d9be0930e0fd6e1421e0af63b4baa/4b38c49aa49bf456-a5/s1280x1920/54be3df4f578d67626ed9b3849f53d129667b940.jpg'
                    }
                /> */}
        <div className="user-action">
          {/* <Input
            label=''
            type='checkbox'
            checked={selectedMails.includes(mail._id)}
            id={`${mail.from.name}-${mail._id}`}
            onChange={e => e.stopPropagation()}
            onClick={e => {
              dispatch(selectMail(mail._id))
              e.stopPropagation()
            }}
          /> */}
          <div className="form-check">
            <Input
              type="checkbox"
              id={`${mail.from.name}-${mail._id}`}
              onChange={(e) => e.stopPropagation()}
              checked={selectedMails.includes(mail._id)}
              onClick={(e) => {
                dispatch(selectMail(mail._id));
                e.stopPropagation();
              }}
            />
            <Label
              onClick={(e) => e.stopPropagation()}
              for={`${mail.from.name}-${mail._id}`}
            ></Label>
          </div>
          <div
            className="email-favorite"
            onClick={(e) => {
              e.stopPropagation();
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
              size={14}
              className={classnames({
                favorite: mail.isStarred
              })}
            />
          </div>
        </div>
      </div>
      <div className="mail-body">
        <div className="mail-details">
          <div className="mail-items">
            <h5 className="mb-25">{mail.from.name || mail.subject}</h5>
            <span className="text-truncate">{mail.subject}</span>
          </div>
          <div className="mail-meta-item">
            {mail.attachments && mail.attachments.length ? <Paperclip size={14} /> : null}
            {renderLabels(mail.labels)}
            <span className="mail-date">{formatDateToMonthShort(mail.time)}</span>
          </div>
        </div>
        <div className="mail-message">
          <p className="text-truncate mb-0">{htmlToString(mail.message)}</p>
        </div>
      </div>
    </li>
  );
};

export default MailCard;
