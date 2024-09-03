// ** Icons Import
import { Facebook, Mail, MessageCircle, MessageSquare, Radio } from 'react-feather';
import { FaBullhorn } from 'react-icons/fa';

export default [
  {
    id: 'marketing',
    title: 'Marketing',
    icon: <FaBullhorn size={20} />,
    action: 'manage',
    resource: 'marketing',
    children: [
      {
        id: 'automation',
        title: 'Automation',
        icon: <Mail size={20} />,
        navLink: '/apps/automation',
        action: 'manage',
        resource: 'marketing/automation',
      },
      {
        id: 'email',
        title: 'Email',
        icon: <Mail size={20} />,
        navLink: '/apps/email',
        action: 'manage',
        resource: 'marketing/email',
      },
      {
        id: 'text',
        title: 'Text',
        icon: <MessageCircle size={20} />,
        navLink: '/apps/text',
        action: 'manage',
        resource: 'marketing/text',
      },
      {
        id: 'chat',
        title: 'Chat',
        icon: <MessageSquare size={20} />,
        navLink: '/apps/chat',
        action: 'manage',
        resource: 'marketing/chat',
      },
      {
        id: 'ticket',
        title: 'Ticket',
        icon: <MessageSquare size={20} />,
        navLink: '/apps/ticket/open',
        action: 'manage',
        resource: 'marketing/ticket',
      },
      {
        id: 'socialConnect',
        title: 'Social Connect',
        icon: <Facebook size={20} />,
        navLink: '/apps/socialconnect',
        action: 'manage',
        resource: 'marketing/socialConnect',
      },
      {
        id: 'reputation',
        title: 'Reputation',
        icon: <Radio size={20} />,
        navLink: '/apps/reputation',
        action: 'manage',
        resource: 'marketing/reputation',
      }
    ]
  }
];
