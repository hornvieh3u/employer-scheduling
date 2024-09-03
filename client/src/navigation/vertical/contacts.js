// ** Icons Import
import { Circle } from 'react-feather';
import { RiContactsBookLine, RiContactsLine } from 'react-icons/ri';

export default [
  {
    id: 'contacts',
    title: 'Contacts',
    action: 'manage',
    resource: 'contacts',
    icon: <RiContactsBookLine size={20} />,
    children: [
      {
        id: 'client',
        title: 'Clients',
        icon: <RiContactsLine size={20} />,
        navLink: '/contacts/clients/list',
        action: 'manage',
        resource: 'contacts/client',
      },
      {
        id: 'employee',
        title: 'Employee',
        icon: <RiContactsLine size={20} />,
        navLink: '/contacts/employee/list',
        action: 'manage',
        resource: 'contacts/employee',
        // children: [
        //     {
        //         id: 'myEmployee',
        //         title: 'My Employee',
        //         icon: <Circle size={12} />,
        //         navLink: '/contacts/employee/list'
        //     },
        //     {
        //         id: 'myForms',
        //         title: 'My Forms',
        //         icon: <Circle size={12} />,
        //         navLink: '/apps/myforms'
        //     },
        //     {
        //         id: 'schedule',
        //         title: 'Schedule',
        //         icon: <Circle size={12} />,
        //         navLink: '/apps/schedule'
        //     },
        //     {
        //         id: 'workhistory',
        //         title: 'Work History',
        //         icon: <Circle size={12} />,
        //         navLink: '/apps/workhistory'
        //     },
        //     {
        //         id: 'settings',
        //         title: 'Setting',
        //         icon: <Circle size={12} />,
        //         navLink: '/apps/employee/settings'
        //     }

        // ]
      },
      {
        id: 'employeeInfo',
        title: 'Employee Info',
        icon: <RiContactsLine size={20} />,
        navLink: '/contacts/employee/info',
        action: 'manage',
        resource: 'contacts/employeeInfo',
      },
      {
        id: 'leads',
        title: 'Leads',
        icon: <RiContactsLine size={20} />,
        navLink: '/contacts/leads/list',
        action: 'manage',
        resource: 'contacts/leads',
      },
      {
        id: 'relationships',
        title: 'Relationships',
        icon: <RiContactsLine size={20} />,
        navLink: '/contacts/relationship/list',
        action: 'manage',
        resource: 'contacts/relationships',
      },
      {
        id: 'vendor',
        title: 'Vendor',
        icon: <RiContactsLine size={20} />,
        navLink: '/contacts/vendor/list',
        action: 'manage',
        resource: 'contacts/vendor',
      }
    ]
  }
];
