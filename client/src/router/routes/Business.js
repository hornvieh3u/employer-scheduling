import { lazy } from 'react';

const BusinessRoutes = [
  // My Business
  {
    path: '/business/projectmanager',
    component: lazy(() => import('../../views/business/projects'))
  },
  {
    path: '/business/retention',
    component: lazy(() => import('../../views/business/retention')),
    exact: true,
    appLayout: true,
    className: 'email-application'
  },
  {
    path: '/business/birthday',
    component: lazy(() => import('../../views/business/birthday')),
    exact: true,
    appLayout: true,
    className: 'email-application'
  },
  {
    path: '/business/expired',
    component: lazy(() => import('../../views/business/expired')),
    exact: true,
    appLayout: true,
    className: 'email-application'
  },
  {
    path: '/business/statistics',
    component: lazy(() => import('../../views/business/statistics/index')),
    exact: true
  },
  {
    path: '/business/progression',
    component: lazy(() => import('../../views/business/progression')),
    exact: true
  }
];

export default BusinessRoutes;
