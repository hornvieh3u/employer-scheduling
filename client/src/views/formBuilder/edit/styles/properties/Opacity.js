import React from 'react'
import { Input, Label } from 'reactstrap'

export default function Opacity({getSelectedHtmlElement}) {
    const handleOpacityChange = (value) => {
        const element = getSelectedHtmlElement();
        let opacity = 1 / 0;
        switch (value) {
            case 'none':
                opacity = 1.0;
                break;
            case 'light_fade':
                opacity = 0.75;
                break;
            case 'half_fade':
                opacity = 0.5;
                break;
            case 'heavy_fade':
                opacity = 0.25;
                break;
        }
        element.addStyle({ 'opacity': opacity });
    }
  return (
    <>
    <Label>Opacity</Label>
    <Input
        type="select"
        //getPopupContainer={() => document.getElementById('buttoninput')}
        onChange={handleOpacityChange}
      >
        <option value="none">None</option>
        <option value="light_fade">Light Fade</option>
        <option value="half_fade">Half Fade</option>
        <option value="heavy_fade">Heavy Fade</option>
      </Input>
    </>
  )
}
