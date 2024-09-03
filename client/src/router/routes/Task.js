import { lazy } from 'react';

const TaskRoutes = [
  // Tasks
  {
    path: '/tasks',
    className: 'todo-application',
    appLayout: true,
    exact: true,
    component: lazy(() => import('../../views/taskngoals'))
  },
  {
    path: '/manage-task',
    exact: true,
    component: lazy(() => import('../../views/tasks/task-reporting/add'))
  },

  // Goals
  {
    path: '/new-goals',
    exact: true,
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/NewGoals/index'))
  },
  {
    path: '/goals',
    exact: true,
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/goals'))
  },
  {
    path: '/apps/todo/:filter',
    appLayout: true,
    exact: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/filemanager')),
    meta: {
      navLink: '/apps/todo'
    }
  },
  {
    path: '/apps/todo/tag/:tag',
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/filemanager')),
    meta: {
      navLink: '/apps/todo'
    }
  }
];

export default TaskRoutes;
