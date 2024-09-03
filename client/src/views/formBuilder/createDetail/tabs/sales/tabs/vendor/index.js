import { Card, CardTitle, CardText, CardBody } from 'reactstrap';

function Vendor() {
  return (
    <Card className="m-2">
      <CardBody className="rounded-none">
        <CardTitle tag="h5">Vendor</CardTitle>
        <CardText></CardText>
      </CardBody>
    </Card>
  );
}

export default Vendor;
