import React from 'react'
import { Card } from 'reactstrap'
import { FileText, Image } from 'react-feather'

const Selectone = ({stepper}) => {
  const handleSubmit = (e) => {  
    stepper.next()
}
  return (
    <div>
      <div>
        {array.map((item) => {
          return (
            <Card
              className={`d-flex align-items-center justify-content-center flex-column p-1`}>
              <div className="w-100 d-flex justify-content-center">
                <FileText />
              </div>
              <span className="create_title">
                {item}
              </span>
            </Card>)
        })}
      </div>
    </div>
  )
}

export default Selectone
const array = ["Digital", "Documents", "My forms"]