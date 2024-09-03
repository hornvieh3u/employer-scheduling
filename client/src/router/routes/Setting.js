import { lazy } from 'react'

const SettingRoute = [
  {
    path: '/setting',
    component: lazy(() => import('../../views/settings')),
  },

]

export default SettingRoute
