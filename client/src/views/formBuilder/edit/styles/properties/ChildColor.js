import React from 'react'
import { Input, Label } from 'reactstrap';

export default function ChildColor({getSelectedHtmlElement}) {
    const handlestyle = (e, name) => {
        const element = getSelectedHtmlElement();
        let childModels = element.attributes.components.models;
        for (var i = 0; i < childModels.length; i++) {
            let subChildModels = childModels[i].attributes.components.models;
            for (var j = 0; j < subChildModels.length; j++) {
              if(name == 'bold-color') {
                if(subChildModels[j].attributes.tagName == 'b') {
                  subChildModels[j].addStyle({'color': value});
                }
              } else {
                if(subChildModels[j].attributes.tagName == 'i') {
                  subChildModels[j].addStyle({'color': value});
                }
              }
            }
        }
      }
  return (
    <>
    <Label>Text Color</Label>
    <Input
          className='p-0'
          style={{
            width: 230,
            height: '40px'
          }}
          
          onChange={(e) => { handlestyle(e, 'bold-color') }}
          size="small"
          type="color"
        />
        <Label>Icon Color</Label>
    <Input
          className='p-0'
          style={{
            width: 230,
            height: '40px'
          }}
          
          onChange={(e) => { handlestyle(e, 'icon-color') }}
          size="small"
          type="color"
        />
    </>
  )
}
