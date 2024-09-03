import React from 'react'
import { Input, Label } from 'reactstrap'

export default function PropertyName({getSelectedHtmlElement}) {
    const handleaddatribute = (e, name) => {
        const element = getSelectedHtmlElement()
        element.addAttributes({ [name]: e.target.value })

    }
  return (
    <>
    <Label>Name</Label>
    <Input onChange={handleaddatribute}/>
    
    </>
  )
}
