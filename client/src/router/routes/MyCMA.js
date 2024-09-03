// ** React Imports
import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const MyCMARoutes = [
  {
    path: '/mycma/myaccount',
    component: lazy(() => import('../../views/blank_page'))
  },
  {
    path: '/mycma/members',
    component: lazy(() => import('../../views/mycma/members'))
  },
  {
    path: '/mycma/courses',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/mycma/courses'))
  },
  //for testing of courses

  {
    path: '/manage-usercourses',
    exact: true,
    component: lazy(() => import('../../views/mycma/usercourses/manage'))
  },
  {
    path: '/mycma/usercourses',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/mycma/usercourses'))
  },
  // end for testing fo courses

  {
    path: '/mycma/product-detail',
    exact: true,
    className: 'ecommerce-application',
    component: () => <Redirect to="/mycma/product-detail/apple-i-phone-11-64-gb-black-26" />
  },
  {
    path: '/mycma/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/mycma/courses/detail')),
    meta: {
      navLink: '/mycma/product-detail'
    }
  },
  // {
  //   path: '/apps/ecommerce/wishlist',
  //   className: 'ecommerce-application',
  //   component: lazy(() => import('../../views/apps/ecommerce/wishlist'))
  // },

  // {
  //   path: '/apps/ecommerce/checkout',
  //   className: 'ecommerce-application',
  //   component: lazy(() => import('../../views/apps/ecommerce/checkout'))
  // },

  // Manage Course
  {
    path: '/manage-course',
    exact: true,
    component: lazy(() => import('../../views/mycma/courses/manage'))
  },
  {
    path: '/mycma/onlineuniv/:univ',
    component: lazy(() => import('../../views/blank_page'))
  },
  {
    path: '/mycma/event',
    component: lazy(() => import('../../views/blank_page'))
  },
  {
    path: '/mycma/faq',
    component: lazy(() => import('../../views/mycma/faq'))
    // src/views/mycma/faq/index.js
  }
];

export default MyCMARoutes;
