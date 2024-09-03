// ** Icons Import
import { FaTasks } from 'react-icons/fa';
import { CheckCircle, Clock } from 'react-feather';

export default [
  {
    id: 'tasksAndGoals',
    title: 'Tasks & Goals',
    icon: <FaTasks size={20} />,
    action: 'manage',
    resource: 'tasksAndGoals',
    children: [
      {
        id: 'new-goals',
        title: 'Goals New',
        icon: <CheckCircle size={20} />,
        navLink: '/new-goals',
        action: 'manage',
        resource: 'tasks/new-goals',
      },
      {
        id: 'tasks',
        title: 'Tasks',
        icon: <Clock size={20} />,
        navLink: '/tasks',
        action: 'manage',
        resource: 'tasks/tasks',
      },
      {
        id: 'goals',
        title: 'Goals',
        icon: <CheckCircle size={20} />,
        navLink: '/goals',
        action: 'manage',
        resource: 'tasks/goals',
      }
    ]
  }
];