// ** React Imports
import { Fragment } from 'react';

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs';

// ** Components
import WizardModernVertical from './WizardModernVertical';

const EditEvent = () => {
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Event"
        breadCrumbParent="Calendar"
        breadCrumbActive="Edit Event"
      />
      <WizardModernVertical />
    </Fragment>
  );
};

export default EditEvent;
