import React, { useState } from 'react';
import moment from 'moment';
import {
  Fade,
  Card,
  CardBody,
  Button,
  Input,
  UncontrolledPopover,
  FormGroup,
  Label
} from 'reactstrap';
import { MAKE_TEMPLATE_AS_ACTIVATE } from '../store/email';
import sendEmailSvg from '../../../../assets/images/svg/send_email.svg';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

export const AutomationIcon = (props) => {
  const userId = localStorage.getItem('user_id');
  const { item, index } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const contentBlock = htmlToDraft(item.template);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const editorState = EditorState.createWithContent(contentState);
  const [content, setContent] = useState(editorState);
  const handleActivateChange = (item) => {
    let payload = {
      tempId: [item?._id],
      isActive: item?.inActiveUsers.includes(userId)
    };
    MAKE_TEMPLATE_AS_ACTIVATE('/email_nurturing', payload, item?.folderId);
  };

  return (
    <div>
      <div className="w-100 p-1 mt-1 text-center" onClick={handleClick('left')}>
        <img src={sendEmailSvg} alt="email" height="45" width="45" style={{ marginTop: '5px' }} />
      </div>
      <div className="w-100 text-center" style={{ backgroundColor: 'transparent' }}>
        <label className="font-weight-bold" style={{ fontSize: '14px', margin: 0 }}>
          New Email
        </label>
        <label>
          {index === 0 ? (
            <>Send immediately</>
          ) : item?.days ? (
            <>
              Send {item?.days} days {item?.days_type || 'after'} <br /> the previus message
            </>
          ) : (
            <>Send at {moment(item.sent_date).format('MMM DD, YYYY')}</>
          )}
        </label>
      </div>
      <UncontrolledPopover
        trigger="focus"
        isOpen={open}
        toggle={() => setOpen(!open)}
        target={anchorEl}
        placement={placement}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Card className="mb-0">
              <CardBody>
                <h5>New Email</h5>
                <span className="flex flex-row justify-content-center">
                  {item?.isActive ? 'Deactivate template' : 'Activate template'}
                </span>
                <FormGroup switch>
                  <Input
                    type="switch"
                    checked={!item?.inActiveUsers.includes(userId)}
                    onClick={() => handleActivateChange(item)}
                  />
                  <Label>{!item?.inActiveUsers.includes(userId) === true ? 'on' : 'off'}</Label>
                </FormGroup>
                <div className="mt-1">SUBJECT</div>
                <div>{item?.subject}</div>
                <div className="mt-1">CONTENT</div>
                <Editor
                  placeholder="Message"
                  toolbarClassName="rounded-0"
                  wrapperClassName="toolbar-bottom"
                  editorClassName="rounded-0 border-0"
                  toolbar={{
                    options: ['inline', 'textAlign'],
                    inline: {
                      inDropdown: false,
                      options: ['bold', 'italic', 'underline', 'strikethrough']
                    }
                  }}
                  onEditorStateChange={(data) => {
                    setContent(data);
                  }}
                  editorState={content}
                />
                <div className="text-end mt-1">
                  <Button
                    size="sm"
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Fade>
        )}
      </UncontrolledPopover>
    </div>
  );
};
