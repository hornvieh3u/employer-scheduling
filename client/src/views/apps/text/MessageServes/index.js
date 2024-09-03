import React, { memo, useState, useEffect } from 'react';
import { Button, Form, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import TextTemplate from './Template/index';
import { FaMeh } from 'react-icons/fa';
import { MdAttachment } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { addText, addTextReducer, getMessageContacts, getText, getTextContacts } from '../store';
import { toast } from 'react-toastify';
import { Image, Mic, Send } from 'react-feather/dist';

function MessageInput() {
  const dispatch = useDispatch();
  const { ActiveContact } = useSelector(({ text }) => text);
  const { userData } = useSelector(({ auth }) => auth);

  const [inputvalue, setinputvalue] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  // GET CONTACTS LIST

  useEffect(() => {
    dispatch(getTextContacts());
  }, []);

  const handaleSendingsms = async (e) => {
    let user = JSON.parse(localStorage.getItem('userData'));

    e.preventDefault();
    if (inputvalue.length == 0) {
      toast.error('Please Enter Message');
    } else if (Object.keys(ActiveContact).length == 0) {
      toast.error('Please Select Contact');
    } else {
      let data = {
        id: user?.id,
        uid: ActiveContact?.uid,
        userId: user?.id,
        email: ActiveContact?.email,
        textContent: inputvalue,
        phone: ActiveContact?.phone
      };

      dispatch(addText(data));
      setinputvalue('');
    }
    // setinputvalue('')
    // setShowPicker(false)
    //   let { uid } = activeStudent2sendtextChat
    //   if (inputvalue.length) {
    //       let message = {
    //           userId: localStorage.getItem('user_id'),
    //           uid: uid,
    //           textContent: inputvalue,
    //           isSent: true
    //       }
    //       let result = await SEND_TEXT_MESSAGE_V2(message)
    //       if (result.success) {
    //           props.UPDATE_MEMBER_CONTACTS_DETAILS(contacts, {
    //               uid,
    //               textContent: inputvalue,
    //               time: new Date().toLocaleString('en-US', {
    //                   timeZone: 'America/New_York'
    //               })
    //           })
    //       } else {
    //           toast.error(result.message.replace(/\\/g, ''), toastCSS())
    //       }
    //   }
  };

  const onEmojiClick = (emojiObject) => {
    setinputvalue((prevInput) => prevInput + emojiObject?.emoji);
    setShowPicker(true);
  };

  return (
    <>
      <div
        style={{
          position: 'absolute',
        }}
      >
        {showPicker && <Picker onEmojiClick={onEmojiClick} height={500} width={400} />}
      </div>
      <Form className='d-flex align-items-center gap-1 m-1' onSubmit={e => handaleSendingsms(e)}>
        <InputGroup size="lg"
          className='align-items-center'
        >
          <TextTemplate />
          <Button
            color="link"
            onClick={() => setShowPicker((val) => !val)}
            size="sm"
            className="btn-icon"
          >
            <FaMeh size={20} />
          </Button>
          <Input
            value={inputvalue}
            onChange={(e) => {
              setinputvalue(e.target.value);
            }}
            placeholder='Type your message or use speech to text'
          />
        </InputGroup>
        <Mic className='cursor-pointer' size={20} />
        <Image className='cursor-pointer text-secondary' size={20} />
        <input type='file' id='attach-doc' hidden />
        <Button className='send d-flex gap-1' color='primary rounded-1' onClick={handaleSendingsms}>
          <Send size={16} />
          <span className='d-none d-lg-block'>Send</span>
        </Button>
      </Form>
    </>
  );
}
export default memo(MessageInput);
