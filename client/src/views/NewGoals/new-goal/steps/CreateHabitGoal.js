import React, { Fragment, useState } from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { selectThemeColors } from '@utils';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import Select, { components } from 'react-select';
import { ArrowLeft, ArrowRight, CheckCircle } from 'react-feather';

const CreateHabitGoal = ({ stepper }) => {
  const [category, setCategory] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [startPicker, setStartPicker] = useState(new Date());
  const [endPicker, setEndPicker] = useState(new Date());
  const [daysSelected, setDaysSelected] = useState([]);
  const [selectedType, setSelectedType] = useState([
    { value: 'Do not Repeat', label: 'Do not Repeat' }
  ]);
  const [selectedCategoryType, setSelectedCategoryType] = useState([
    { value: 'Work & Career', label: 'Work & Career' }
  ]);
  const [selectedSubCategoryType, setSelectedSubCategoryType] = useState([
    { value: 'Example', label: 'Example' }
  ]);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const repeatOn = [
    { value: 'Do not Repeat', label: 'Do not Repeat' },
    { value: 'Day', label: 'Day' },
    { value: 'Week', label: 'Week' },
    { value: 'Month', label: 'Month' },
    { value: 'Year', label: 'Year' }
  ];

  const CategoryTypes = [
    { value: '+Add New Category', label: '+Add New Category' },
    { value: 'Work & Career', label: 'Work & Career' },
    { value: 'Health & Wellness', label: 'Health & Wellness' },
    { value: 'Love & Relationships', label: 'Love & Relationships' },
    { value: 'Money & Finances', label: 'Money & Finances' },
    { value: 'Family & Friends', label: 'Family & Friends' },
    { value: 'Spiritiuality & Faith', label: 'Spiritiuality & Faith' },
    { value: 'Recreation & Lifestile', label: 'Recreation & Lifestile' },
    { value: 'Personal & Growth', label: 'Personal & Growth' },
    { value: 'Other Goals', label: 'Other Goals' }
  ];
  const SubCategoryTypes = [
    { value: '+Add New Sub Category', label: '+Add New Sub Category' },
    { value: 'Example', label: 'Example' },
    { value: 'Example1', label: 'Example1' },
    { value: 'Example2', label: 'Example2' },
    { value: 'Example3', label: 'Example3' }
  ];
  return (
    <Fragment>
      <div>
        <div className="d-flex justify-content-between align-items-end mt-2">
          <h4 className="mb-0">Category</h4>
          {/* <div className="d-flex ">
                        <Button color="primary">Add Category</Button>
                        <Button className="ms-1" color="primary">Add Sub Category</Button>
                    </div> */}
        </div>
        <div style={{ borderTop: '1px solid #b4b7bd', marginTop: '5px' }}>
          <Row className="mt-1">
            <Col sm={6} md={6} lg={6}>
              <Label>Select Category</Label>
              {/* <Input type="select" onChange={(e) => setCategory(e.target.value)}>
                                <option value="Work & Career">Work & Career</option>
                                <option value="Health & Wellness">Health & Wellness</option>
                                <option value="Love & Relationships">Love & Relationships</option>
                                <option value="Money & Finances">Money & Finances</option>
                                <option value="Family & Friends">Family & Friends</option>
                                <option value="Spiritiuality & Faith">Spiritiuality & Faith</option>
                                <option value="Recreation & Lifestile">Recreation & Lifestile</option>
                                <option value="Personal & Growth">Personal & Growth</option>
                                <option value="Other Goals">Other Goals</option>
                                <option style={{ color: "blue" }} value="+Add New Category">+Add New Category</option>
                            </Input> */}
              <Select
                id="category"
                value={selectedCategoryType}
                options={CategoryTypes}
                theme={selectThemeColors}
                // className="react-select"
                classNamePrefix="select"
                isClearable={false}
                onChange={(data) => setSelectedCategoryType([data])}
              // components={{
              //     Option: OptionInviteComponent
              // }}
              />
            </Col>
            <Col sm={6} md={6} lg={6}>
              <Label>Select Sub Category</Label>
              {/* <Input type="select">
                                <option>Example</option>
                                <option>Example</option>
                                <option>Example</option>
                                <option>Example</option>
                                <option style={{ color: "blue" }} value="+Add New sub Category">+Add New sub Category</option>
                            </Input> */}
              <Select
                id="subCategory"
                value={selectedSubCategoryType}
                options={SubCategoryTypes}
                theme={selectThemeColors}
                // className="react-select"
                classNamePrefix="select"
                isClearable={false}
                onChange={(data) => setSelectedSubCategoryType([data])}
              // components={{
              //     Option: OptionInviteComponent
              // }}
              />
            </Col>
          </Row>
        </div>
        <div className="d-flex justify-content-between align-items-end mt-2">
          <h4 className="mb-0">Edit Example</h4>
        </div>
        <div style={{ borderTop: '1px solid #b4b7bd', marginTop: '5px' }}>
          <Row className="mt-1">
            <Col sm={6} md={6} lg={6}>
              <div className="mb-2">
                <Label className="form-label" for="startDate">
                  Start Date & Time
                </Label>
                <Flatpickr
                  required
                  id="startDate"
                  name="startDate"
                  className="form-control"
                  onChange={(date) => setStartPicker(date[0])}
                  value={startPicker}
                  options={{
                    enableTime: allDay === false,
                    dateFormat: 'm-d-Y h:i K',
                    time_24hr: false
                  }}
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-2">
                <Label className="form-label" for="startDate">
                  End Date & Time
                </Label>
                <Flatpickr
                  required
                  id="startDate"
                  name="startDate"
                  className="form-control"
                  onChange={(date) => setEndPicker(date[0])}
                  value={endPicker}
                  options={{
                    enableTime: allDay === false,
                    dateFormat: 'm-d-Y h:i K',
                    time_24hr: false
                  }}
                />
              </div>
            </Col>
            <h5 className="my-1">Repeat</h5>
            <Col sm={4} md={4} lg={4} className="px-3">
              <div className="mb-1">
                <Label className="form-label" for="number">
                  Repeat
                </Label>
                <Input id="number" type="number" placeholder={0} />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label className="form-label" for="description">
                  Every
                </Label>
                <Select
                  id="invite"
                  value={selectedType}
                  options={repeatOn}
                  theme={selectThemeColors}
                  // className="react-select"
                  classNamePrefix="select"
                  isClearable={false}
                  onChange={(data) => setSelectedType([data])}
                // components={{
                //     Option: OptionInviteComponent
                // }}
                />
              </div>
            </Col>
            <Col sm={12} md={12} lg={12}>
              <div
                style={{ border: '1px solid #82868b', borderRadius: '8px' }}
                className="mb-1 p-1"
              >
                <Label>
                  {selectedType[0].value === 'Do not Repeat' ? (
                    'Never Repeat This Event.'
                  ) : selectedType[0].value === 'Day' ? (
                    `Repeats every Day from ${moment(startPicker).format(
                      'DD MMM YYYY'
                    )} ending on ${moment(endPicker).format('DD MMM YYYY')}`
                  ) : selectedType[0].value === 'Week' ? (
                    <>
                      {days.map((item, i) => {
                        return (
                          <Button
                            key={i}
                            outline={daysSelected.includes(item) ? false : true}
                            size="sm"
                            color={daysSelected.includes(item) ? 'primary' : 'secondary'}
                            style={{
                              borderRadius: '40px',
                              marginLeft: '10px',
                              marginBottom: '5px',
                              padding: '5px'
                            }}
                            onClick={() => handleSelectedDays(item, i)}
                          >
                            <CheckCircle /> {item}
                          </Button>
                        );
                      })}
                    </>
                  ) : selectedType[0].value === 'Month' ? (
                    `Repeats every Month on the ${moment(startPicker).format(
                      'DD MMM YYYY'
                    )} ending on ${moment(endPicker).format('DD MMM YYYY')}`
                  ) : (
                    `Repeats every Year on the ${moment(startPicker).format(
                      'DD MMM YYYY'
                    )} ending on ${moment(endPicker).format('DD MMM YYYY')}`
                  )}
                </Label>
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <Label>Record Method</Label>
              <Input type="select">
                <option>Example</option>
                <option>Example</option>
                <option>Example</option>
                <option>Example</option>
              </Input>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <Label>Reward</Label>
              <Input type="text" />
            </Col>
          </Row>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-1">
        <Button onClick={() => stepper.previous()} color="primary" className="btn-prev">
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
          <span className="align-middle d-sm-inline-block d-none">Next</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};
export default CreateHabitGoal;
