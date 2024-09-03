import React from 'react'
import { Input, Label } from 'reactstrap'

export default function WrapperTextAlignment({getWrapper}) {
    const handleLabelAlignment = (e) => {
		setLabelAlignment(e.target.value)
		getWrapper.setStyle({'text-align': e.target.value})
	}
  return (
  <>
  <Label>Label Alignment</Label>
  <Input
        type="select"
        //getPopupContainer={() => document.getElementById('buttoninput')}
          onChange={handleLabelAlignment}
      >
       <option key={item} value="top">Top</option>
       <option key={item} value="left">Left</option>
       <option key={item} value="right">Right</option>
      </Input>
  </>
  )
}
