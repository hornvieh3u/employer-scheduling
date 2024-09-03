import React from 'react'
import { Input, Label } from 'reactstrap';

export default function Effects({getSelectedHtmlElement}) {
    const handleStyle = (e) => {
        const element = getSelectedHtmlElement();
        if (e.target.value === 'no-effect') {
          element.addStyle({
            position: 'relative'
          });
        } else if (e.target.value === 'pulseGlow') {
          element.addStyle({
            animation: 'pulseGlow 2s infinite',
            'animation-timing-function': 'ease-in-out'
          });
        } else if (e.target.value === 'rocking') {
          element.addStyle({
            animation: 'rocking 2s infinite',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.58, 1)',
            transition: '.2s'
          });
        } else if (e.target.value === 'bounce') {
          element.addStyle({
            animation: 'bounce 1.5s infinite',
            'animation-timing-function': 'ease-in',
            transition: '.2s'
          });
        } else if (e.target.value === 'wobble') {
          element.addStyle({
            transition: '.3s'
          });
        } else {
          element.addStyle({
            transition: '.2s',
            ' box-shadow': '0px 0px 0px 0px rgb(0 0 0 / 0%)'
          });
        }
      };
  return (
    <>
    <Label>Effect</Label>
     <Input
        type="select"
        onChange={handleStyle}
        // getPopupContainer={() => document.getElementById('buttoninput')}
      >
     <option value="no-effect">No Effect</option>
          <option value="pulseGlow">Pluse Glow </option>
          <option value="rocking">Rocking (loop)</option>
          <option value="bounce">Bounce (loop)</option>
          <option value="wobble">Wobble (loop)</option>
      </Input>
    </>
  )
}
