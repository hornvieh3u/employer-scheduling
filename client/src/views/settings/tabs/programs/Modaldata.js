import React from 'react'
import { Label,FormGroup,FormText, Input, Col } from 'reactstrap'

function Modaldata() {
  return (
    <form className="row g-3">
      <div className="col-md-6">
        <label for="program" className="form-label">Program Name</label>
        <input type="email" className="form-control" id="program" />
      </div>
      <div className="col-md-6">
        <label for="rank" className="form-label">Total Rank</label>
        <input type="text" className="form-control" id="rank" />
      </div>
      <div className="col-md-6">
        <label for="progression" className="form-label">Progression</label>
        <select id="progression" className="form-select">
          <option  >Choose...</option>
          <option>...</option>
        </select>
      </div>
      <div className="col-md-6">
        <label for="belttype" className="form-label">Belt Type</label>
        <select id="belttype" className="form-select">
          <option  >Choose...</option>
          <option>...</option>
        </select>
      </div>
      <div className="col-md-6">
        <label for="Requirement" className="form-label">Requirement</label>
        <select id="Requirement" className="form-select">
          <option  >Choose...</option>
          <option>...</option>
        </select>
      </div>

      <div className="col-md-4">
        Color
      </div>
      <div className="col-md-6">
        <FormGroup row>
          <Label
            for="exampleFile"
          >
            Upload
          </Label>
          <Col >
            <Input
              id="exampleFile"
              name="file"
              type="file"
            />
            {/* <FormText>
              This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.
            </FormText> */}
          </Col>
        </FormGroup>
      </div>
    </form>
  )
}

export default Modaldata