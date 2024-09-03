import React from 'react'
import { Input, Label } from 'reactstrap'

export default function WrapperLabelWidth({getWrapper}) {
    const handleLabelWidth = (e) => {
		getWrapper().get.setStyle({width: `${e.target.value}px`})
	}
  return (
    <>
    <Label>Labels Width</Label>
    <Input type='text' onChange={handleLabelWidth}/><span>px</span>
    </>
  )
}
