import React from 'react'
import { Input, Label } from 'reactstrap'

export default function LinkUrl({getSelectedHtmlElement}) {
    const handleLinkChange = (value, name) => {
        const element = getSelectedHtmlElement();
        let attributes = element.getAttributes();
        attributes[name] = value;
        element.setAttributes(attributes);
      }
    /* 
    defaultValue={getSelectedHtmlElement().getAttributes()["link_url"]}
                onChange={(e) => { handleLinkChange(e, "link_url") }}
                className="inputstyle"
                getPopupContainer={() => document.getElementById('image')}
    */
  return (
    <>
    <Label>Link URL</Label>
    <Input type="select" onChange={(e) => { handleLinkChange(e, "link_url") }}>
        <option value="open_popup">Open PopUp</option>
        <option value="submit_form">Submit Form</option>
        <option value="next_url">Next URL</option>
        <option value="close_popup">Close PopUp</option>
        <option value="yes_link">Yes Link</option>
        <option value="no_link">No Link</option>
    </Input>
    <Label>Link URL Target</Label>
    <Input type="select" onChange={(e) => { handleLinkChange(e, "link_target") }}>
        <option value="open_popup">Normal</option>
        <option value="submit_form">New Tab/Window</option>
        
    </Input>

    </>
  )
}
