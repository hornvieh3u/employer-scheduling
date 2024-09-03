// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react';

// ** Icons Imports
import { ArrowLeft, ArrowRight, Info } from 'react-feather';

// ** Components
import RepeatingForm from '../RepeatingFormAnimated';

// ** Reactstrap Imports
import { Label, Input, Form, Button, UncontrolledTooltip } from 'reactstrap';
import { DocumentContext } from '../../../../utility/context/Document';

const Recipients = ({ stepper, type }) => {
  const { recipients, setRecipients, isOnlySigner, setIsOnlySigner } = useContext(DocumentContext);

  //** States */

  const handleOnlySigner = () => {
    setIsOnlySigner(!isOnlySigner);
  };
  useEffect(() => {
    if (isOnlySigner === true) {
      setRecipients([{ ...recipients[0], name: '', email: '' }]);
    }
  }, [isOnlySigner]);
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Add Recipients</h5>
        <small className="text-muted">Add Manually or Choose from Contacts</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-1">
          <div className="form-check form-check-inline mb-1">
            <Input
              type="checkbox"
              id="basic-cb-checked"
              checked={isOnlySigner}
              onChange={handleOnlySigner}
            />
            <Label for="basic-cb-checked" className="form-check-label">
              I am the only signer <Info id="onlySignerTooltip" size={18} className="ms-1" />
            </Label>
            <UncontrolledTooltip placement="right" target="onlySignerTooltip">
              As the only signer, you can place fields and sign your document. Once you're done,
              it'll be saved in your account.
            </UncontrolledTooltip>
          </div>
          <div>
            <RepeatingForm disabled={isOnlySigner} />
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <Button color="primary" className="btn-prev" outline onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default Recipients;
