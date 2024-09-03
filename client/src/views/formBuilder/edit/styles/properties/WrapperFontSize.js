import React from 'react'
import { Input, Label } from 'reactstrap'

export default function WrapperFontSize({getWrapper}) {
    const handleOnChange = (e) => {	
		getWrapper().setStyle({'font-size': `${e.target.value}px`})
	}

  return (
    <>
    <Label>Font Size</Label>
    <Input type='text' onChange={handleOnChange}/><space>px</space>
    </>
  )
}
