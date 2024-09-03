import React, { useEffect, useState } from 'react'
import { ChevronLeft } from 'react-feather'
import { Card, CardBody, CardText, CardTitle } from 'reactstrap'
import { format } from 'date-fns';
import {
  clientContactsAction,
  employeesContactsAction,
  leadsContactsAction,
  relationshipsContactsAction,
  vendorContactsAction
} from '../../../../contacts/store/actions';
import { useDispatch, useSelector } from 'react-redux';

// ** User List Component
import Table from './table/Table';

function Description(props) {
  const { descriptiondetails, setShowdetails } = props

  const [contactData, setContactData] = useState([]);
  const dispatch = useDispatch();
  const totalStore = useSelector((state) => state.totalContacts);

  const clientData = (totalStore.clientContacts.list ? totalStore.clientContacts.list : [])
  const leadData = (totalStore.leadContacts.list ? totalStore.leadContacts.list : [])
  const vendorData = (totalStore.vendorContacs.list ? totalStore.vendorContacs.list : [])
  const relationshipData = (totalStore.relationshipContacts.list ? totalStore.relationshipContacts.list : [])
  const employeeData = (totalStore.employeeContacts.list ? totalStore.employeeContacts.list : [])
  const ContactAllData0 = []
  const ContactAllData1 = ContactAllData0.concat(clientData)
  const ContactAllData2 = ContactAllData1.concat(leadData)
  const ContactAllData3 = ContactAllData2.concat(vendorData)
  const ContactAllData4 = ContactAllData3.concat(relationshipData)
  const ContactAllData = ContactAllData4.concat(employeeData)


  useEffect(() => {
    dispatch(clientContactsAction({}));
    dispatch(leadsContactsAction());
    dispatch(vendorContactsAction());
    dispatch(relationshipsContactsAction());
    dispatch(employeesContactsAction());
  }, [dispatch]);

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
              ContactType
            </CardTitle>
            <CardText>
              
                {
                  descriptiondetails.contactType.map((contactData, index) => (
                    <span className="text-primary mx-2">{contactData.value}</span>
                  ))
                }
              
            </CardText>
            <CardText>
              <Table ContactAllData={ContactAllData}/>
            </CardText>
          </CardBody>
        </Card>
        <Card className="my-2">

          <CardBody className="rounded-none">
            <CardTitle tag="h5">
              {format(new Date(descriptiondetails.createdAt), 'MM/dd/yy')}
            </CardTitle>
            <CardText>
              {descriptiondetails.creteria}
            </CardText>
     
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default Description