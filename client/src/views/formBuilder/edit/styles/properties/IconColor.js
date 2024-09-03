import React from 'react'
import { Input, Label } from 'reactstrap'

export default function IconColor({getSelectedHtmlElement}) {
  return (
    <>
    <Label>Icon Color</Label>
    <Input
                    className='p-0'
                    style={{
                        width: 240,
                        height: '40px'
                    }}
                    size="small"
                    type="color"
                // onChange={(e) => { handlestyle(e, "background-color") }}

                />
    </>
  )
}
