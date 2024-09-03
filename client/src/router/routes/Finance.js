import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const FinanceRoutes = [
  // Finance
  {
    path: '/finance/income',
    component: lazy(() => import('../../views/finance/income'))
  },
  {
    path: '/finance/expense',
    component: lazy(() => import('../../views/finance/expense'))
  },
  {
    path: '/finance/pnl',
    component: lazy(() => import('../../views/finance/pnl'))
  },
  {
    path: '/invoice/list',
    component: lazy(() => import('../../views/finance/invoice/list')),
    navLink: '/invoice/list',
    appLayout: true,
    className: 'email-application'
  },
  {
    path: '/invoice/preview/:id',
    component: lazy(() => import('../../views/finance/invoice/preview')),
    meta: {
      navLink: '/invoice/preview'
    }
  },
  {
    path: '/invoice/preview',
    exact: true,
    component: () => <Redirect to="/invoice/preview/4987" />
  },
  {
    path: '/invoice/edit/:id',
    component: lazy(() => import('../../views/finance/invoice/edit')),
    meta: {
      navLink: '/invoice/edit'
    }
  },
  {
    path: '/invoice/edit',
    exact: true,
    component: () => <Redirect to="/invoice/edit/4987" />
  },
  {
    path: '/invoice/add',
    component: lazy(() => import('../../views/finance/invoice/add'))
  },
  {
    path: '/invoice/print',
    layout: 'BlankLayout',
    component: lazy(() => import('../../views/finance/invoice/print'))
  }
];

export default FinanceRoutes;
