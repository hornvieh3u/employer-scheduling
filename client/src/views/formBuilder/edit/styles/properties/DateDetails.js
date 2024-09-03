import React from 'react';
import { Input, Label } from 'reactstrap';


export default function DateDetails({ type, getSelectedHtmlElement }) {
  const handleChangeDate = (e) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    type === 'start'
      ? (attributes.startDate = e.target.value)
      : (attributes.endDate = e.target.value);
    getSelectedHtmlElement().setAttributes(attributes);
  };
  const handleChangeTime = (e) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    type === 'start'
      ? (attributes.startTime = e.target.value)
      : (attributes.endTime = e.target.value);
    getSelectedHtmlElement().setAttributes(attributes);
  };
  const handleTimeZoneChange = (e) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.timeZone = e.target.value;
    getSelectedHtmlElement().setAttributes(attributes);
  }
  const handleShowStatusChange = (name, status) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes["show-" + name] = status;
    getSelectedHtmlElement().setAttributes(attributes);
    const element = getSelectedHtmlElement();
    for(let i = 0; i < 7; i ++) {
      let child = element.getChildAt(i);
      let childAttribute = child.getAttributes();
      let type = childAttribute["type"]
      if(type == name.toUpperCase()) {
        childAttribute.hidden = !status;
        child.setAttributes(childAttribute);
      }
    }
  }
  return (
    <>
      <Label>{type === 'start' ? 'Start Date' : 'End Date'}</Label>
      <Input type="date" onChange={handleChangeDate} />
      <Label>{type === 'start' ? 'Start Time' : 'End Time'}</Label>
      <Input type="select" onChange={handleChangeTime}>
        <option value={0}>12 AM</option>
        {Array.apply(1, Array(12)).map(function (x, i) {
          return (
            <option value={i} key={i}>
              {i} AM
            </option>
          );
        })}
        <option value={0}>12 PM</option>
        {Array.apply(1, Array(12)).map(function (x, i) {
          return (
            <option value={i + 12} key={i}>
              {i} PM
            </option>
          );
        })}
      </Input>
      <Label>Time Zone</Label>
      <Input type="select" onChange={handleTimeZoneChange}>
        <option value="est">EST</option>
        <option value="pst">PST</option>
        <option value="cst">CST</option>
        <option value="mst">MST</option>
      </Input>
      <div>
      <Input
            type="checkbox"
            style={{
              marginBottom:`${item.padding}px`
            }}
            onChange={(e) => handleShowStatusChange('years',e.target.checked)}
          /> <Label>Show Years</Label>
      </div>
      <div>
      <Input
            type="checkbox"
            style={{
              marginBottom:`${item.padding}px`
            }}
            onChange={(e) => handleShowStatusChange('months',e.target.checked)}
          /> <Label>Show Months</Label>
      </div>
      <div>
      <Input
            type="checkbox"
            style={{
              marginBottom:`${item.padding}px`
            }}
            onChange={(e) => handleShowStatusChange('weeks',e.target.checked)}
          /> <Label>Show Weeks</Label>
      </div>
      <div>
      <Input
            type="checkbox"
            style={{
              marginBottom:`${item.padding}px`
            }}
            onChange={(e) => handleShowStatusChange('days',e.target.checked)}
          /> <Label>Show Days</Label>
      </div>
      <div>
      <Input
            type="checkbox"
            style={{
              marginBottom:`${item.padding}px`
            }}
            onChange={(e) => handleShowStatusChange('hours',e.target.checked)}
          /> <Label>Show Hours</Label>
      </div>
      <div>
      <Input
            type="checkbox"
            style={{
              marginBottom:`${item.padding}px`
            }}
            onChange={(e) => handleShowStatusChange('minutes',e.target.checked)}
          /> <Label>Show Minutes</Label>
      </div>
      <div>
      <Input
            type="checkbox"
            style={{
              marginBottom:`${item.padding}px`
            }}
            onChange={(e) => handleShowStatusChange('seconds',e.target.checked)}
          /> <Label>Show Seconds</Label>
      </div>
    </>
  );
}
