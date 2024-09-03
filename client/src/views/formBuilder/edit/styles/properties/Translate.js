import React from 'react'
import { Input, Label } from 'reactstrap'

export default function Translate({getSelectedHtmlElement}) {
    const handleTranslateChange = (e) => {
        let attributes = getSelectedHtmlElement().getAttributes();
        attributes.translate = e.target.value;
        getSelectedHtmlElement().setAttributes(attributes);
      }
  return (
   <>
   <Label>Translate</Label>
   <Input type='select' onChange={handleTranslateChange}>
    <option value="en">English</option>
    <option value="fr">French</option>
    <option value="es">Spanish</option>
    <option value="de">German</option>
    <option value="ru">Russian</option>
    <option value="jp">Japanese</option>
    <option value="cn">Chinese</option>
    <option value="ko">Korean</option>
    <option value="ar">Arabic</option>
    <option value="nl">Dutch</option>
    <option value="it">Italian</option>
    <option value="sv">Swedish</option>
   </Input>
   </>
  )
}
