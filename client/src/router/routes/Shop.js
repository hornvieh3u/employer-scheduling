import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ShopRoutes = [
  // Shop
  {
    path: '/ecommerce/shop',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/shop/shop'))
  },
  {
    path: '/ecommerce/wishlist',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/shop/wishlist'))
  },
  {
    path: '/ecommerce/product-detail',
    exact: true,
    className: 'ecommerce-application',
    component: () => <Redirect to="/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26" />
  },
  {
    path: '/ecommerce/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/shop/detail')),
    meta: {
      navLink: '/ecommerce/product-detail'
    }
  },
  {
    path: '/ecommerce/checkout/product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/shop/checkout/product'))
  },
  {
    path: '/ecommerce/checkout/membership',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/shop/checkout/membership'))
  },
  // Manage Shop
  {
    path: '/manage-shop',
    exact: true,
    component: lazy(() => import('../../views/shop/manage'))
  },
  // Public Shop Route
  {
    path: '/shop/:domain',
    component: lazy(() => import('../../views/shop/public')),
    className: 'ecommerce-application',
    // layout: 'BlankLayout',
    meta: {
      menuHidden: true
    }
  }
];

export default ShopRoutes;
