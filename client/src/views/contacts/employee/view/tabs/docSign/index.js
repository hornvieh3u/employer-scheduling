// ** React Imports
import { Fragment, useEffect } from 'react';

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs';

// ** Components
import WizardModernVertical from './document/WizardModernVertical';
// import { DocumentProvider } from '../../../utility/context/Document'

const CreateDoc = () => {
  return (
    <Fragment>
      <WizardModernVertical />
    </Fragment>
  );
};

export default CreateDoc;
