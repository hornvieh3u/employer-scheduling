import { lazy } from 'react';

const WebToolRoutes = [
  // Tasks
  {
    path: '/social-proof',
    className: 'todo-application',
    appLayout: true,
    exact: true,
    component: lazy(() => import('../../views/blank_page'))
  },
  {
    path: '/social-scheduler',
    exact: true,
    component: lazy(() => import('../../views/blank_page'))
  },
  {
    path: '/reputation',
    exact: true,
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/blank_page'))
  },
];

export default WebToolRoutes;
