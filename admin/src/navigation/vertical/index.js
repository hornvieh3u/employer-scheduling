import { Home, User, Users, MessageSquare, Settings, Map } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/dashboard",
  },
  

  {
    id: "admins",
    title: "Admins",
    icon: <User size={20} />,
    navLink: "/admin-list",
  },
  {
    id: "users",
    title: "Users",
    icon: <Users size={20} />,
    navLink: "/user-list",
  },
  {
    id: "feedback",
    title: "Feedback",
    icon: <MessageSquare size={20} />,
    navLink: "/feedback",
  },
  {
    id: "settings",
    title: "Settings",
    icon: <Settings size={20} />,
    navLink: "/second-page",
  },
  {
    id: "MYCMA",
    title: "MYCMA",
    icon: <Settings size={20} />,
    children: [
      {
        id: 'events',
        title: 'Events',
        icon: <User size={20} />,
        children: [
          {
            id: "tournament",
            title: "Tournaments",
            icon: <User size={20} />,
            navLink: "/events/tournament",
          },
          {
            id: "testing",
            title: "Testing",
            icon: <User size={20} />,
            navLink: "/events/testing",
          },
          {
            id: "instructor-college",
            title: "Instructor ",
            icon: <User size={20} />,
            navLink: "/events/instructor-college",
          },
          {
            id: "seminars",
            title: "Seminars",
            icon: <User size={20} />,
            navLink: "/events/seminars",
          },
          {
            id: "others",
            title: "Other Events",
            icon: <User size={20} />,
            navLink: "/events/others",
          },
        ]
      },
      {
        id: "manage-users",
        title: "Manage Users",
        icon: <User size={20} />,
        children: [
          {
            id: "members",
            title: "Members",
            icon: <User size={20} />,
            navLink: "/users/members",
          },
          {
            id: "operators",
            title: "Operators",
            icon: <User size={20} />,
            navLink: "/users/operators",
          },
          {
            id: "admins",
            title: "Admins",
            icon: <User size={20} />,
            navLink: "/users/admins",
          },
        ],
      },
      {
        id: "manage-others",
        title: "Manage Other",
        icon: <User size={20} />,
        children: [
          {
            id: 'locations',
            title: 'Locations',
            icon: <Map size={20} />,
            navLink: "/other/locations"
          },
          {
            id: 'faq',
            title: 'FAQ',
            icon: <Map size={20} />,
            navLink: "/other/faq"
          },
          {
            id: 'online-courses',
            title: 'Online Courses',
            icon: <Map size={20} />,
            navLink: "/other/online-courses"
          },
        ]
      },
    ]
  }
];
