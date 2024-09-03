// ** Icons Import
import { Circle, User, Shield, Settings, Info, Award, Users, Activity, List, MessageCircle, Code } from 'react-feather'

export default [
    {
        id: 'settings',
        title: 'Settings',
        icon: <Settings size={20} />,
        navLink: '/setting',
        action: 'manage',
        resource: 'setting',
        // children: [
        //     {
        //         id: 'general',
        //         title: 'General',
        //         icon: <Info size={20} />,
        //         navLink: '/setting/general'
        //     },
        //     {
        //         id: 'candidate-program',
        //         title: 'Candidate & Program',
        //         icon: <Award size={20} />,
        //         children: [
        //             {
        //                 id: 'candidate',
        //                 title: 'Candidate',
        //                 icon: <Users size={20} />,
        //                 navLink: '/setting/candidate'
        //             },
        //             {
        //                 id: 'program',
        //                 title: 'Program',
        //                 icon: <Activity size={20} />,
        //                 navLink: '/setting/program'
        //             }
        //         ]
        //     },
        //     {
        //         id: 'roles-permissions',
        //         title: 'Roles & Permissions',
        //         icon: <Shield size={20} />,
        //         children: [
        //             {
        //                 id: 'roles',
        //                 title: 'Roles',
        //                 icon: <Circle size={12} />,
        //                 navLink: '/apps/roles'
        //             },
        //             {
        //                 id: 'permissions',
        //                 title: 'Permissions',
        //                 icon: <Circle size={12} />,
        //                 navLink: '/apps/permissions'
        //             }
        //         ]
        //     },
        //     {
        //         id: 'smartlist',
        //         title: 'Smartlist',
        //         icon: <List size={20} />,
        //         navLink: '/setting/smartlist'
        //     },
        //     {
        //         id: 'chatbot-livechat',
        //         title: 'Chatbot & Livechat',
        //         icon: <MessageCircle size={20} />,
        //         children: [
        //             {
        //                 id: 'chatbot',
        //                 title: 'Chatbot',
        //                 icon: <Code size={12} />,
        //                 navLink: '/setting/chatbot'
        //             },
        //             {
        //                 id: 'livechat',
        //                 title: 'Livechat',
        //                 icon: <Code size={12} />,
        //                 navLink: '/setting/livechat'
        //             }
        //         ]
        //     },

        // ]
    }
]
