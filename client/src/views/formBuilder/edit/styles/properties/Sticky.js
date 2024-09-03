import React from 'react'
import { Input, Label } from 'reactstrap'

export default function Sticky({getSelectedHtmlElement}) {
  return (
    <>
    <Label>Sticky</Label>
    {/* add switcher */}
    <Input
                    className='inputstyle'
                    
                    defaultValue="5px"
                />
    </>
  )
}
