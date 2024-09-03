import React from 'react'
import { Input, Label } from 'reactstrap'

export default function WrapperSpacing({getWrapper}) {
    const handleSpacing = (e) => {
		setSpacing(e.target.value)
		getWrapper().setStyle({'margin-top': `${e.target.value}px`})
	}
  return (
    <>
    <Label>Spacing</Label>
    <Input type='text' onChange={handleSpacing}/> <span>px</span>
    </>
  )
}
