import React from 'react'
import { Input, Label } from 'reactstrap'

export default function WrapperWidth({getWrapper}) {
    const handleWidth = (e) => {
		
		getWrapper().setStyle({width: `${e.target.value}px`})
	}
  return (
    <>
    <Label>Element Width</Label>
    <Input type='text' onChange={handleWidth}/> <span>px</span>
    </>
  )
}
