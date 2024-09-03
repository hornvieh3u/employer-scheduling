import { lazy } from 'react'

const ChartMapsRoutes = [
  {
    path: '/charts/apex',
    component: lazy(() => import('../../views/charts/apex'))
  },
  {
    path: '/charts/chartjs',
    component: lazy(() => import('../../views/charts/chart-js'))
  },
  {
    path: '/charts/recharts',
    component: lazy(() => import('../../views/charts/recharts'))
  }
]

export default ChartMapsRoutes
