import { lazy } from 'react';

const ContactRoutes = [
  // Contacts
  {
    path: '/contacts/clients/list',
    component: lazy(() => import('../../views/contacts/client/list'))
  },
  {
    path: '/contacts/client/view/:id',
    component: lazy(() => import('../../views/contacts/client/view')),
    meta: {
      navLink: '/contacts/client/view'
    }
  },
  {
    path: '/contacts/employee/list',
    component: lazy(() => import('../../views/contacts/employee'))
  },
  {
    path: '/contacts/employee/view/:id',
    component: lazy(() => import('../../views/contacts/employee/view')),
    meta: {
      navLink: '/contacts/employee/view'
    }
  },
  {
    path: '/contacts/employee/info',
    component: lazy(() => import('../../views/contacts/employee/view/EmployeeInfo')),
    meta: {
      navLink: '/contacts/employee/info'
    }
  },
  {
    path: '/contacts/leads/list',
    component: lazy(() => import('../../views/contacts/leads/list'))
  },
  {
    path: '/contacts/leads/view/:id',
    component: lazy(() => import('../../views/contacts/leads/view')),
    meta: {
      navLink: '/contacts/leads/view'
    }
  },
  {
    path: '/contacts/relationship/list',
    component: lazy(() => import('../../views/contacts/relationship/list'))
  },
  {
    path: '/contacts/relationship/view/:id',
    component: lazy(() => import('../../views/contacts/relationship/view')),
    meta: {
      navLink: '/contacts/relationship/view'
    }
  },
  {
    path: '/contacts/vendor/list',
    component: lazy(() => import('../../views/contacts/vendor/list'))
  },
  {
    path: '/contacts/vendor/view/:id',
    component: lazy(() => import('../../views/contacts/vendor/view')),
    meta: {
      navLink: '/contacts/vendor/view'
    }
  }
];

export default ContactRoutes;
