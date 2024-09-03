// ** React Imports
import { useState, Fragment } from 'react';

// ** Custom Components
import Repeater from '@components/repeater';

// ** Third Party Components
import { X, Plus } from 'react-feather';
import { SlideDown } from 'react-slidedown';
import Select from 'react-select';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap';

// ** Utils
import { selectThemeColors } from '@utils';

const colourOptions = [
  { value: 'ocean', label: 'Ocean' },
  { value: 'blue', label: 'Blue' },
  { value: 'purple', label: 'Purple' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' }
];

const lessionType = [
  { value: 'free', label: 'Free' },
  { value: 'ocked', label: 'Locked' }
];

const UploadVideosForm = () => {
  // ** State
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState('');

  const toggle = (id) => {
    open === id ? setOpen() : setOpen(id);
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  const deleteForm = (e) => {
    e.preventDefault();
    const slideDownWrapper = e.target.closest('.react-slidedown'),
      form = e.target.closest('form');
    if (slideDownWrapper) {
      slideDownWrapper.remove();
    } else {
      form.remove();
    }
  };

  return (
    <Fragment>
      <Accordion className="accordion-border" open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1">Step 1: Create Chapters</AccordionHeader>
          <AccordionBody accordionId="1">
            <Row className="justify-content-between align-items-center">
              <Col md={10} className="mb-md-0 mb-1">
                <Label className="form-label">Chapter Name</Label>
              </Col>
              <Col md={2}>
                <Label className="form-label">Delete</Label>
              </Col>
              <Col sm={12}>
                <hr />
              </Col>
            </Row>
            <Repeater count={count}>
              {(i) => {
                const Tag = i === 0 ? 'div' : SlideDown;
                return (
                  <Tag key={i}>
                    <Form>
                      <Row className="justify-content-between align-items-center">
                        <Col md={10} className="mb-md-0 mb-1">
                          <Input
                            type="text"
                            id={`animation-item-name-${i}`}
                            placeholder="Type New Chapter Name"
                          />
                        </Col>

                        <Col md={2}>
                          <Button
                            color="danger"
                            className="text-nowrap px-1"
                            onClick={deleteForm}
                            outline
                          >
                            <X size={14} />
                          </Button>
                        </Col>
                        <Col sm={12}>
                          <hr />
                        </Col>
                      </Row>
                    </Form>
                  </Tag>
                );
              }}
            </Repeater>
            <Button className="btn-icon" color="primary" onClick={increaseCount}>
              <Plus size={14} />
              <span className="align-middle ms-25">Add New</span>
            </Button>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">Step 2: Upload Videos</AccordionHeader>
          <AccordionBody accordionId="2" className="me-1">
            <Row className="justify-content-between align-items-center">
              <Col md={3} className="mb-md-0 mb-1">
                <Label className="form-label">Select Chapter</Label>
              </Col>
              <Col md={3} className="mb-md-0 mb-1">
                <Label className="form-label">Lesson Title</Label>
              </Col>
              <Col md={2} className="mb-md-0 mb-1">
                <Label className="form-label">Type</Label>
              </Col>
              <Col md={3} className="mb-md-0 mb-1">
                <Label className="form-label">Upload Lecture</Label>
              </Col>
              <Col md={1}>
                <Label className="form-label">Delete</Label>
              </Col>
              <Col sm={12}>
                <hr />
              </Col>
            </Row>
            <Repeater count={count}>
              {(i) => {
                const Tag = i === 0 ? 'div' : SlideDown;
                return (
                  <Tag key={i}>
                    <Form>
                      <Row className="justify-content-between align-items-center">
                        <Col md={3} className="mb-md-0 mb-1">
                          <Select
                            theme={selectThemeColors}
                            id={`animation-item-chapter-${i}`}
                            className="react-select"
                            classNamePrefix="select"
                            defaultValue={colourOptions[0]}
                            options={colourOptions}
                            isClearable={false}
                          />
                        </Col>
                        <Col md={3} className="mb-md-0 mb-1">
                          <Input
                            type="text"
                            id={`animation-cost-${i}`}
                            placeholder="Type the lession title"
                          />
                        </Col>
                        <Col md={2} className="mb-md-0 mb-1">
                          <Select
                            theme={selectThemeColors}
                            id={`animation-item-type-${i}`}
                            className="react-select"
                            classNamePrefix="select"
                            defaultValue={lessionType[0]}
                            options={lessionType}
                            isClearable={false}
                          />
                        </Col>
                        <Col md={3} className="mb-md-0 mb-1">
                          <Input type="file" id={`animation-item-name-${i}`} />
                        </Col>
                        <Col md={1}>
                          <Button
                            color="danger"
                            className="text-nowrap px-1"
                            onClick={deleteForm}
                            outline
                          >
                            <X size={14} />
                          </Button>
                        </Col>
                        <Col sm={12}>
                          <hr />
                        </Col>
                      </Row>
                    </Form>
                  </Tag>
                );
              }}
            </Repeater>
            <Button className="btn-icon" color="primary" onClick={increaseCount}>
              <Plus size={14} />
              <span className="align-middle ms-25">Add New</span>
            </Button>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </Fragment>
  );
};

export default UploadVideosForm;
