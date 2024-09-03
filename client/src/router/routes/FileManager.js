import { lazy } from 'react'

const FileManager = [
  {
      path: '/filemanager',
      exact: true,
      appLayout: true,
      className: 'todo-application',
      component: lazy(() => import('../../views/apps/filemanager'))
  },
  {
      path: '/filemanager/:filter',
      appLayout: true,
      exact: true,
      className: 'todo-application',
      component: lazy(() => import('../../views/apps/filemanager')),
      meta: {
          navLink: '/filemanager'
      }
  },
  {
      path: '/filemanager/:tag',
      appLayout: true,
      className: 'todo-application',
      component: lazy(() => import('../../views/apps/filemanager')),
      meta: {
          navLink: '/filemanager'
      }
  },
]

export default FileManager