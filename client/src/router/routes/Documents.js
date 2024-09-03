import { lazy } from 'react'

const DocumentRoutes = [
    // Documents
    {
        path: '/documents',
        component: lazy(() => import('../../views/documents')),
        appLayout: true,
        className: 'email-application'
    },
    {
        path: '/document/create',
        component: lazy(() => import('../../views/documents/create/CreateDoc'))
    },
    {
        path: '/documents/:folder',
        exact: true,
        appLayout: true,
        className: 'email-application',
        component: lazy(() => import('../../views/documents')),
        meta: {
            navLink: '/documents'
        }
    },
    {
        path: '/documents/label/:label',
        exact: true,
        appLayout: true,
        className: 'email-application',
        component: lazy(() => import('../../views/documents')),
        meta: {
            navLink: '/documents'
        }
    },
    {
        path: '/documents/:filter',
        component: lazy(() => import('../../views/documents')),
        meta: {
            navLink: '/documents'
        }
    },
    {
       
        path: '/document/preview/:hashcode',
        component: lazy(() => import('../../views/documents/recipientPreview/Preview')),
        appLayout:false,
        layout:'BlankLayout',
        meta: {
            publicRoute:true
        }
    },
    {
       
        path: '/document/email-link/:hashcode',
        component: lazy(() => import('../../views/documents/recipientPreview/EmailLink')),
        appLayout:false,
        layout:'BlankLayout',
        meta: {
            publicRoute:true
        }
    },
    
]

export default DocumentRoutes
