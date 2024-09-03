import { lazy } from 'react';

const FormBuilderRoutes = [
  // FromBuilder
  {
    path: '/formBuilder',
    component: lazy(() => import('../../views/formBuilder')),
    exact: true
  },
  {
    path: '/formBuilder/createForm',
    component: lazy(() => import('../../views/formBuilder/createForm')),
    exact: true
  },
  {
    path: '/formBuilder/createDetail/:id',
    component: lazy(() => import('../../views/formBuilder/createDetail')),
    exact: true,
    appLayout: true,
    meta: {
      navLink: '/formBuilder/createDetail'
    }
  },
  {
    path: '/formbuilder/preview/',
    component: lazy(() => import('../../views/formBuilder/edit/Preview')),
    exact: true,
    appLayout: false,
    layout:'BlankLayout',
    meta: {
      navLink: '/formbuilder/preview'
    }
  }
];

export default FormBuilderRoutes;
