// ** React Imports
import { Fragment, useState } from 'react';

// ** Third Party Components
import { ArrowLeft, ArrowRight } from 'react-feather';
import Flatpickr from 'react-flatpickr';
import { Editor } from 'react-draft-wysiwyg';
import Select, { components } from 'react-select';
import { EditorState } from 'draft-js';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Assignee Avatars
import img1 from '@src/assets/images/portrait/small/avatar-s-3.jpg';
import img2 from '@src/assets/images/portrait/small/avatar-s-1.jpg';
import img3 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
import img4 from '@src/assets/images/portrait/small/avatar-s-6.jpg';
import img5 from '@src/assets/images/portrait/small/avatar-s-2.jpg';
import img6 from '@src/assets/images/portrait/small/avatar-s-11.jpg';

// ** Styles Imports
import '@styles/react/libs/editor/editor.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/libs/react-select/_react-select.scss';

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button } from 'reactstrap';

const GoalInfo = ({ stepper, type }) => {
  // ** States
  const [assignee, setAssignee] = useState({
    value: 'pheobe',
    label: 'Pheobe Buffay',
    img: img1
  });
  const [tags, setTags] = useState([]);
  const [desc, setDesc] = useState(EditorState.createEmpty());
  const [dueDate, setDueDate] = useState(new Date());

  // ** Assignee Select Options
  const assigneeOptions = [
    { value: 'pheobe', label: 'Pheobe Buffay', img: img1 },
    { value: 'chandler', label: 'Chandler Bing', img: img2 },
    { value: 'ross', label: 'Ross Geller', img: img3 },
    { value: 'monica', label: 'Monica Geller', img: img4 },
    { value: 'joey', label: 'Joey Tribbiani', img: img5 },
    { value: 'Rachel', label: 'Rachel Green', img: img6 }
  ];

  // ** Tag Select Options
  const tagOptions = [
    { value: 'team', label: 'Team' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'update', label: 'Update' }
  ];

  // ** Custom Assignee Component
  const AssigneeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <img
            className="d-block rounded-circle me-50"
            src={data.img}
            height="26"
            width="26"
            alt={data.label}
          />
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Goal Info</h5>
        <small>Enter Your Goal Info.</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="task-title">
              Title <span className="text-danger">*</span>
            </Label>
            <Input id="task-title" placeholder="Title" className="new-todo-item-title" />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="task-assignee">
              Assignee
            </Label>
            <Select
              id="task-assignee"
              className="react-select"
              classNamePrefix="select"
              isClearable={false}
              options={assigneeOptions}
              theme={selectThemeColors}
              value={assignee}
              onChange={(data) => setAssignee(data)}
              components={{ Option: AssigneeComponent }}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="due-date">
              Start Date
            </Label>
            <Flatpickr
              id="due-date"
              name="due-date"
              className="form-control"
              onChange={(date) => setDueDate(date[0])}
              value={dueDate}
              options={{ dateFormat: 'Y-m-d' }}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="due-date">
              End Date
            </Label>
            <Flatpickr
              id="due-date"
              name="due-date"
              className="form-control"
              onChange={(date) => setDueDate(date[0])}
              value={dueDate}
              options={{ dateFormat: 'Y-m-d' }}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="task-tags">
              Tags
            </Label>
            <Select
              isMulti
              id="task-tags"
              className="react-select"
              classNamePrefix="select"
              isClearable={false}
              options={tagOptions}
              theme={selectThemeColors}
              value={tags}
              onChange={(data) => {
                setTags(data !== null ? [...data] : []);
              }}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="task-title">
              Title <span className="text-danger">*</span>
            </Label>
            <Input id="task-title" placeholder="Title" className="new-todo-item-title" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for="task-desc" className="form-label">
              Description
            </Label>
            <Editor
              editorState={desc}
              wrapperClassName="toolbar-bottom"
              toolbar={{
                options: ['inline', 'textAlign'],
                inline: {
                  inDropdown: false,
                  options: ['bold', 'italic', 'underline']
                }
              }}
              onEditorStateChange={(data) => setDesc(data)}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
            <span className="align-middle d-sm-inline-block d-none">Done</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default GoalInfo;
