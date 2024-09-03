// ** React Imports
import { useState, useContext, useEffect } from 'react';

// ** Custom Components
import Repeater from '@components/repeater';

// ** Components
import ContactsModal from '../ContactsModal';

// ** Third Party Components
import { X, Plus, Trash2 } from 'react-feather';
import { SlideDown } from 'react-slidedown';
import Select from 'react-select';
import { RiContactsBookLine } from 'react-icons/ri';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Reactstrap Imports
import { Row, Col, Form, Label, Input, Button, InputGroup, InputGroupText } from 'reactstrap';
import { DocumentContext } from '../../../utility/context/Document';

const RepeatingForm = ({ disabled }) => {
  // ** State
  const [count, setCount] = useState(1);
  const [contactsModal, setContactsModal] = useState(false);
  const [active, setActive] = useState('1');
  const [colors, setColors] = useState([]);
  const [recipientColor, setRecipientColor] = useState();

  //**Context */
  const { recipients, setRecipients } = useContext(DocumentContext);

  const createColor = () => {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }

    if (color === '#FFFFFF') {
      createColor();
    }
    if (colors.includes(color)) {
      createColor();
    } else {
      setColors([...colors, color]);
      setRecipientColor(color);
    }

    return color;
  };

  // ** Contacts Modal Tabs Toggle
  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const onFormChanged = (e) => {
    const id = e.target.dataset.id;
    setRecipients((recipients) =>
      recipients.map((rec) => {
        let temp = rec;

        if (temp.id === recipients[0].id) {
          temp.active = true;
        } else {
          temp.active = false;
        }

        if (String(temp.id) === id) {
          switch (e.target.name) {
            case 'name':
              temp.name = e.target.value;
              break;
            case 'email':
              temp.email = e.target.value;
              break;

            default:
              break;
          }
        }
        return temp;
      })
    );
  };

  const increaseCount = () => {
    setCount(count + 1);
    createColor();
  };
  const AddRecipient = () => {
    increaseCount();
  };

  const deleteForm = (e) => {
    e.preventDefault();
    if (!disabled) {
      let temp = recipients;

      if (String(recipients[0].id) === e.target.id) {
        if (temp.length > 1) {
          temp[1].active = true;
        }
      }
      temp = temp.filter((x) => x.id.toString() != e.target.id);
      setRecipients(temp);
      setCount(count + 1);
    }
  };

  const roleOptions = [
    { value: 'sign', label: 'Sign' },
    { value: 'read', label: 'Read' }
  ];

  const handleContactModal = () => {
    if (disabled === false) {
      setContactsModal(!contactsModal);
    }
  };
  const onRoleOptionChange = (e, id) => {
    setRecipients((recipients) =>
      recipients.map((rec) => {
        let temp = rec;

        if (temp.id === recipients[0]) {
          temp.active = true;
        } else {
          temp.active = false;
        }

        if (temp.id === id) {
          temp.roleOption = e.value;
        }
        return temp;
      })
    );
  };
  useEffect(() => {
    if (recipients.length === 0 || recipients[0].id === undefined) {
      createColor();
    }
  }, []);

  useEffect(() => {
    if (recipientColor != undefined) {
      setRecipients([
        ...recipients,
        {
          id: count,
          name: '',
          email: '',
          color: recipientColor,
          active: true,
          roleOption: 'sign'
        }
      ]);
    }
  }, [recipientColor]);

  useEffect(() => {
    if (recipients && recipients.length > 0) {
      setCount(recipients.length);
    }
  }, []);

  return (
    <>
      <Repeater count={recipients.length}>
        {(i) => {
          const Tag = i === 0 ? 'div' : SlideDown;

          return (
            <Tag key={i}>
              <Form>
                <div
                  style={{
                    margin: '20px 0 20px 0',
                    display: 'flex',
                    width: '100%',
                    border: '1px solid #ced4da'
                  }}
                >
                  <div
                    style={{
                      width: '0.5%',
                      backgroundColor: `${
                        recipients[i]?.color ? recipients[i].color : recipientColor
                      }`
                    }}
                  ></div>
                  <div
                    style={{
                      width: '99%'
                    }}
                  >
                    <Row
                      style={{
                        margin: '15px 15px 15px 0'
                      }}
                    >
                      <Col md={6}>
                        <Col sm="12" className="mb-1">
                          <Label className="form-label" for="nameVertical">
                            Name
                          </Label>
                          <InputGroup className="mb-2">
                            <Input
                              id="nameVertical"
                              data-id={recipients[i].id}
                              placeholder="search..."
                              onChange={onFormChanged}
                              name="name"
                              value={recipients[i]?.name}
                              disabled={disabled}
                            />
                            <InputGroupText>
                              <RiContactsBookLine
                                size={18}
                                className="cursor-pointer"
                                onClick={handleContactModal}
                              />
                            </InputGroupText>
                          </InputGroup>
                        </Col>
                        <Col sm="12">
                          <Label className="form-label" for="EmailVertical">
                            Email
                          </Label>
                          <Input
                            type="email"
                            name="email"
                            data-id={recipients[i].id}
                            id="EmailVertical"
                            placeholder="Email"
                            onChange={onFormChanged}
                            value={recipients[i]?.email}
                            disabled={disabled}
                          />
                        </Col>
                      </Col>
                      <Col md={2}>
                        <div className="mt-2">
                          <Select
                            value={roleOptions.find((x) => x.value === recipients[i].roleOption)}
                            defaultValue={roleOptions.find(
                              (x) => x.value === recipients[i].roleOption
                            )}
                            isOptionSelected={true}
                            isDisabled={disabled}
                            theme={selectThemeColors}
                            isClearable={false}
                            className="react-select"
                            classNamePrefix="select"
                            options={roleOptions}
                            onChange={(e) => onRoleOptionChange(e, recipients[i].id)}
                            name="roleOption"
                            style={{
                              overflow: 'visible'
                            }}
                          />
                        </div>
                      </Col>
                      <Col md={2}></Col>
                      <Col md={2}>
                        <Button
                          onClick={deleteForm}
                          id={recipients[i].id}
                          className="text-nowrap text-secondary float-end mt-2"
                          color="link"
                        >
                          <Trash2
                            size={20}
                            style={{ pointerEvents: 'none' }}
                            //  style={{pointerEvents:"none",marginTop:"8px"}} onClick={deleteForm} className="float-end"
                          />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Form>
            </Tag>
          );
        }}
      </Repeater>
      <Button
        className="btn-icon ms-1 mb-2 mt-1"
        color="primary"
        onClick={AddRecipient}
        disabled={disabled}
      >
        <Plus size={14} />
        <span className="align-middle ms-25">Add New</span>
      </Button>
      <ContactsModal
        contactsModal={contactsModal}
        setContactsModal={setContactsModal}
        toggle={toggle}
        active={active}
      />
    </>
  );
};

export default RepeatingForm;
