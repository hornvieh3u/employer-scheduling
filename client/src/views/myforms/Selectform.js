import React from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap'
import { selectThemeColors } from "@utils"
import Select from "react-select"

const roleOptions = [
  { value: "", label: "Select type" },
  { value: "hello", label: "hello" },
  { value: "hello", label: "hello" },
]

const Selectform = () => {
  const handleSubmit = () => {

  }
  return (
    <div>
      <Form onSubmit={handleSubmit("")}>
        <FormGroup>
          <Label>Select funnle</Label>
          <Select
            theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            options={roleOptions}
            onChange={(data) => {}}
          />
        </FormGroup>
        <FormGroup>
          <Label> Select form</Label>
          <Select
          />
        </FormGroup>
      </Form>
    </div>
  )
}

export default Selectform