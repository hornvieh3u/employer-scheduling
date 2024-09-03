// ** React Imports

import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const AppRoutes = [
  {
    path: '/apps/automation',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/automation'))
  },
  {
    path: '/apps/automation/:status',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/automation')),
    meta: {
      navLink: '/apps/automation'
    }
  },
  {
    path: '/apps/email',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: () => <Redirect to="/apps/email/template" />
  },

  {
    path: '/apps/email/:folder',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/email/label/:label',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/email/:filter',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/ticket',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/ticket'))
  },
  {
    path: '/apps/ticket/:status',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/ticket')),
    meta: {
      navLink: '/apps/ticket'
    }
  },
  {
    path: '/apps/chat',
    appLayout: true,
    className: 'chat-application',
    component: lazy(() => import('../../views/apps/chat'))
  },
  {
    path: '/apps/todo',
    exact: true,
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo'))
  },
  {
    path: '/apps/todo/:filter',
    appLayout: true,
    exact: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo')),
    meta: {
      navLink: '/apps/todo'
    }
  },
  {
    path: '/apps/todo/tag/:tag',
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo')),
    meta: {
      navLink: '/apps/todo'
    }
  },
  {
    path: '/calendar',
    component: lazy(() => import('../../views/calendar'))
  },
  {
    path: '/apps/invoice/list',
    component: lazy(() => import('../../views/apps/invoice/list'))
  },
  {
    path: '/apps/invoice/preview/:id',
    component: lazy(() => import('../../views/apps/invoice/preview')),
    meta: {
      navLink: '/apps/invoice/preview'
    }
  },
  {
    path: '/apps/invoice/preview',
    exact: true,
    component: () => <Redirect to="/apps/invoice/preview/4987" />
  },
  {
    path: '/apps/invoice/edit/:id',
    component: lazy(() => import('../../views/apps/invoice/edit')),
    meta: {
      navLink: '/apps/invoice/edit'
    }
  },
  {
    path: '/apps/invoice/edit',
    exact: true,
    component: () => <Redirect to="/apps/invoice/edit/4987" />
  },
  {
    path: '/apps/invoice/add',
    component: lazy(() => import('../../views/apps/invoice/add'))
  },
  {
    path: '/apps/invoice/print',
    layout: 'BlankLayout',
    component: lazy(() => import('../../views/apps/invoice/print'))
  },
  {
    path: '/apps/ecommerce/shop',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/shop'))
  },
  {
    path: '/apps/ecommerce/wishlist',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/wishlist'))
  },
  {
    path: '/apps/ecommerce/product-detail',
    exact: true,
    className: 'ecommerce-application',
    component: () => (
      <Redirect to="/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26" />
    )
  },
  {
    path: '/apps/ecommerce/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/detail')),
    meta: {
      navLink: '/apps/ecommerce/product-detail'
    }
  },
  {
    path: '/apps/ecommerce/checkout',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/checkout'))
  },
  {
    path: '/apps/user/list',
    component: lazy(() => import('../../views/apps/user/list'))
  },
  {
    path: '/apps/user/view',
    exact: true,
    component: () => <Redirect to="/apps/user/view/1" />
  },
  {
    path: '/apps/user/view/:id',
    component: lazy(() => import('../../views/apps/user/view')),
    meta: {
      navLink: '/apps/user/view'
    }
  },
  {
    path: '/apps/roles',
    component: lazy(() => import('../../views/apps/roles-permissions/roles'))
  },
  {
    path: '/apps/permissions',
    component: lazy(() => import('../../views/apps/roles-permissions/permissions'))
  },
  {
    path: '/apps/schedule',
    component: lazy(() => import('../../views/contacts/schedule/scheduleboard'))
  },
  {
    path: '/apps/text',
    component: lazy(() => import('../../views/apps/text/Text'))
  },
  {
    path: '/apps/socialconnect',
    exact: true,
    component: lazy(() => import('../../views/marketing/SocialConnect/index'))
  },
  {
    path: '/apps/socialconnect/workspace',
    exact: true,
    component: lazy(() => import('../../views/marketing/SocialConnect/Workspace/WorkspaceMain'))
  },
  {
    path: '/apps/reputation',
    exact: true,
    component: lazy(() => import('../../views/apps/reputation/index.js'))
  },
  {
    path: '/apps/roles',
    component: lazy(() => import('../../views/apps/roles-permissions/roles'))
  },
  {
    path: '/apps/permissions',
    component: lazy(() => import('../../views/apps/roles-permissions/permissions'))
  },
  {
    path: '/apps/schedule',
    component: lazy(() => import('../../views/contacts/schedule/scheduleboard'))
  },
  {
    path: '/apps/workhistory',
    component: lazy(() => import('../../views/contacts/workHistory'))
  },
  {
    path: '/apps/employee/settings',
    component: lazy(() => import('../../views/blank_page'))
  },
  {
    path: '/apps/text',
    component: lazy(() => import('../../views/apps/text/Text'))
  },
  {
    path: '/apps/socialconnect',
    component: lazy(() => import('../../views/blank_page'))
  }
];

export default AppRoutes;
