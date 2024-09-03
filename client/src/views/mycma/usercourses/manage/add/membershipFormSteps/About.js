// ** React Imports
import { Fragment, useState } from 'react';

// ** Third Party Components
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import { Editor } from 'react-draft-wysiwyg';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from 'reactstrap';

// ** Utils
import { selectThemeColors } from '@utils';
import { courseAddAction } from '../../../store/actions';
import { useDispatch } from 'react-redux';

// ** Styles
import '@styles/react/libs/editor/editor.scss';

 

const colourOptions = [
  { value: 'Type A', label: 'Type A' },
  { value: 'Type B', label: 'Type B' },
  { value: 'Type C', label: 'Type C' },
  { value: 'Type D', label: 'Type D' },

];

const About = ({ stepper, type }) => {


  // ** State
  const [courseData, setCourseData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const dispatch = useDispatch();
  const handleFormInput = (e) => {
    if(e.target.name!='image')
    {
      setCourseData({ ...courseData, [e.target.name]: e.target.value })
    }
  
    if (e.target.name === 'image') {
      setCourseData({ ...courseData, file: e.target.files[0] });
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('courseName', courseData?.courseName)
    formData.append('courseType', courseData?.courseType)
    formData.append('startDate', startDate)
    formData.append('endDate', endDate)
    formData.append('courseDuration', courseData?.courseDuration)
    formData.append('coursePrice', courseData?.coursePrice)
    formData.append('carriculam', courseData?.carriculam)
    formData.append('description', courseData?.description)
    formData.append('curriculamType',courseData?.curriculamType)
    formData.append('file',courseData.file)
    dispatch(courseAddAction(formData))

  }

  return (
    <Fragment >
      {/* <Form onSubmit={(e) => e.preventDefault()}> */}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="nameMulti">
              Course Title
            </Label>
            <Input onChange={handleFormInput} type="text" name="courseName" id="nameMulti" placeholder="Course Title" required value={courseData?.courseName} />
          </Col>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="mtype">
              Category
            </Label>
            <Select
              name="courseType"
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              defaultValue={colourOptions[0]}
              options={colourOptions}
              isClearable={false}
              onChange={(e) => setCourseData({ ...courseData, "courseType": e.value })}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="nameMulti">
              Start Date
            </Label>

            <Flatpickr
              name="startDate"
              className="form-control"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              id="default-picker"
            />
          </Col>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="nameMulti">
              Expiration Date
            </Label>
            <Flatpickr
              name="endDate"
              className="form-control"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              id="default-picker"
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="duration">
              Duration
            </Label>
            <Input onChange={handleFormInput} type="number" name="courseDuration" id="duration" placeholder="Duration" required/>
          </Col>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="duration">
              Price
            </Label>
            <Input onChange={handleFormInput} type="number" name="coursePrice" id="duration" placeholder="Price" required/>
          </Col>
        </Row>
        <Row>
        <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="mtype">
              Carriculum type
            </Label>
            <Select
              name="courseType"
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              defaultValue={colourOptions[0]}
              options={colourOptions}
              isClearable={false}
              onChange={(e) => setCourseData({ ...courseData, "curriculamType": e.value })}
            />
          </Col>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="duration">
              Curriculum
            </Label>
            <Input onChange={handleFormInput} type="number" name="curriculam" id="duration" placeholder="Curriculum" required/>
          </Col>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="image">
              Course Cover
            </Label>
            <Input type="file" id="image" onChange={handleFormInput} name="image" required/>
          </Col>
      
        </Row>
        
        <Col md="12" sm="12" className="mb-1">
          <Label className="form-label" for="description">
            Description
          </Label>
          <Editor onContentStateChange={(contentState) => setCourseData({ ...courseData, "description": contentState?.blocks[0]?.text })} name="description" />
        </Col>
        <div className="d-flex justify-content-between">
          {/* <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button> */}
          <Button color="primary" className="btn-next" >
            <span className="align-middle d-sm-inline-block d-none">Cancel</span>
            {/* <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight> */}
          </Button>

          <Button color="primary" className="btn-next" >
            <span className="align-middle d-sm-inline-block d-none">Submit</span>

          </Button>
          {/* <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
            <span className="align-middle d-sm-inline-block d-none">Submit</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button> */}
        </div>
      </Form>
    </Fragment>
  );
};

export default About;
