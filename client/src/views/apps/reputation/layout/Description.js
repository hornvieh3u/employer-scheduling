import React from 'react'
import { ChevronLeft } from 'react-feather'
import { Card, CardBody, CardText, CardTitle } from 'reactstrap'



function Description(props) {
  const { descriptiondetails, setShowdetails } = props
  return (
    <>

      <div className="card rounded-0 p-2 mb-2 " onClick={() => setShowdetails(false)}>
        <div class="d-flex justify-content-between">
          <ChevronLeft size={20} />
          <div>{descriptiondetails.title}
          </div>


        </div>

      </div>

      <div className="m-2">


        <Card className="my-2">

          <CardBody className="rounded-none">
            <CardTitle tag="h5">
              {descriptiondetails.title}
            </CardTitle>
            <CardText>
              {descriptiondetails.des1}
            </CardText>
            <CardText>
              <small className="text-muted">
                {descriptiondetails.des2}
              </small>
            </CardText>
          </CardBody>
        </Card>
        <Card className="my-2">

          <CardBody className="rounded-none">
            <CardTitle tag="h5">
              DATA
            </CardTitle>
            <CardText>
             DATA WILL GO HERE
            </CardText>
     
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default Description