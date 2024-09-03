import React from 'react'
import { Input, Label } from 'reactstrap'
import FontFamily from '../../configuration/fontfamily';

export default function WrapperFormFont({getWrapper}) {
    const handleSelectFont = (e) => {
		getWrapper().setStyle({'font-family': `${e.target.value}`})
	}
  return (
    <>
    <Label>Fonts</Label>
    <Input
        type="select"
        // showSearch
        //getPopupContainer={() => document.getElementById('button')}
        // filterOption={(input, option) =>
        //   option.children.toLowerCase().includes(input.toLowerCase())
        // }
        onChange={handleSelectFont}
      >
        {FontFamily.families.map((item, i) => {
          return (
            <option value={item} key={i}>
              {item}
            </option>
          );
        })}
      </Input>
    </>
  )
}
