import React from 'react'
import { Input, Label } from 'reactstrap'

export default function ListType({getSelectedHtmlElement}) {
    const handleaddoptionforULorOL = (e) => {
        const element = getSelectedHtmlElement();
        let attributes = element.getAttributes();
        attributes.listType = e.target.value;
        getSelectedHtmlElement().setAttributes(attributes);
        if(e.target.value != 'order') {
          getSelectedHtmlElement().removeClass('order');
        } else {
          getSelectedHtmlElement().addClass('order');
        }
    
        let childModels = element.attributes.components.models;
        for (var i = 0; i < childModels.length; i++) {
          let subChildModels = childModels[i].attributes.components.models;
          for (var j = 0; j < subChildModels.length; j++) {
            if(subChildModels[j].attributes.tagName == 'i') {
              if(e == 'order') {
                subChildModels[j].setClass('fa fa-' + (i + 1));
              } else {
                subChildModels[j].setClass('fa fa-check');
              }
            }
          }
        }
      }
  return (
    <>
    <Label>List Style</Label>
      <Input
        type="select"
        //getPopupContainer={() => document.getElementById('buttoninput')}
        onChange={handleaddoptionforULorOL}
      >
        <option value="order">Order List</option>
        <option value="icon">Icon List</option>
      </Input>
    </>
  )
}
