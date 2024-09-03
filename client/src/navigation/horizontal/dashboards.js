// ** Icons Import
import { Home, Activity, ShoppingCart } from 'react-feather'

export default [
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <Home />,
        navLink: '/dashboard/analytics'
        // children: [
        //   {
        //     id: 'analyticsDash',
        //     title: 'Analytics',
        //     icon: <Activity />,
        //     navLink: '/dashboard/analytics'
        //   },
        //   {
        //     id: 'eCommerceDash',
        //     title: 'eCommerce',
        //     icon: <ShoppingCart />,
        //     navLink: '/dashboard/ecommerce'
        //   }
        // ]
    }
]
