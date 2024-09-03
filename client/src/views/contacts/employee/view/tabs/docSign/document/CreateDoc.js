// ** React Imports
import { Fragment, useEffect } from 'react';

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs';

// ** Components
import WizardModernVertical from './WizardModernVertical';
import { DocumentProvider } from '../../../utility/context/Document';

const CreateDoc = () => {
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Documents"
        breadCrumbParent="Documents"
        breadCrumbActive="Create Doc"
      />

      <WizardModernVertical />
    </Fragment>
  );
};

export default CreateDoc;
