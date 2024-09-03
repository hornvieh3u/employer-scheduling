import { lazy } from 'react'

const Myforms = [
    {
        path: '/apps/myforms',
        appLayout: true,
        className: 'email-application',
        component: lazy(() => import('../../views/myforms/Myforms'))
    },
]

export default Myforms
