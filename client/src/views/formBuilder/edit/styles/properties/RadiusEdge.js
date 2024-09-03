import React from 'react'
import { Input, Label } from 'reactstrap';

export default function RadiusEdge({getSelectedHtmlElement}) {
    const changeCornerRadius = (radius, type) => {
        const element = getSelectedHtmlElement();
        switch (type) {
            case 'all':
                element.addStyle({ 'border-top-left-radius': radius + 'px' })
                element.addStyle({ 'border-top-right-radius': radius + 'px' })
                element.addStyle({ 'border-bottom-left-radius': radius + 'px' })
                element.addStyle({ 'border-bottom-right-radius': radius + 'px' })
                break;
            case 'bottom':
                element.addStyle({ 'border-top-left-radius': 0 })
                element.addStyle({ 'border-top-right-radius': 0 })
                element.addStyle({ 'border-bottom-left-radius': radius + 'px' })
                element.addStyle({ 'border-bottom-right-radius': radius + 'px' })
                break;
            case 'top':
                element.addStyle({ 'border-top-left-radius': radius + 'px' })
                element.addStyle({ 'border-top-right-radius': radius + 'px' })
                element.addStyle({ 'border-bottom-left-radius': 0 })
                element.addStyle({ 'border-bottom-right-radius': 0 })
                break;
        }
    }
    const handleCornerEdgeChange = (e) => {
        
        changeCornerRadius(cornerRadius, e.target.value);
    }
  return (
    <>
  <Label>Radius Edge</Label>
      <Input
        type="select"
        onChange={handleCornerEdgeChange}
        //getPopupContainer={() => document.getElementById('buttonAdvance')}
      >
       <option value="all">All</option>
          <option value="top">Top Only</option>
          <option value="bottom">Bottom Only</option>
      </Input>
  </>
  )
}
