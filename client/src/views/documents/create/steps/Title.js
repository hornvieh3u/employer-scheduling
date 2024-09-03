import React, { Fragment, useContext } from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather';
import { Button, Col, Form, Input, Label, Row } from 'reactstrap'
import { DocumentContext } from '../../../../utility/context/Document'

export default function Title({ stepper, type }) {

    const {setDocumentTitle} = useContext(DocumentContext);

    const handleAddTitle = (e)=>{
        setDocumentTitle(e.target.value)
    }
  return (
    <Fragment>
        <div className="content-header">
        <h5 className="mb-0">Add Title</h5>
        <small className="text-muted">Write down a title to specify your document</small>
      </div>
      <Form onSubmit={()=>{e.preventDefault()}} >
      <div className='h-100'>
      <Row >
          <Col md="12" className="mb-1">
            <Label className="form-label" for="basicInput">
              Document Title
            </Label>
            <Input
              type="host"
              id="basicInput"
              placeholder="Enter Document Title"
              name="title"
              onChange={handleAddTitle}
            />
          </Col>
         
        </Row>
      </div>
        
      </Form>
      <div className="d-flex justify-content-between mt-5 pt-5" >
          <Button color="primary" className="btn-prev" outline onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
    </Fragment>
  )
}
