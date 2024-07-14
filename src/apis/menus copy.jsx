import React from "react";
import * as Icons from "react-icons/tb";
export const menu = [{
  name: "Dashboard",
  url: "/",
  icon: <Icons.TbLayout className="menu_icon" />,
},
{
  name: "event management",
  icon: <Icons.TbCalendarCog className="menu_icon" />,
  url: "/event-managment",
  subMenu: [{
      name: "Categories",
      url: "/categories/manage",
      icon: <Icons.TbCategory className="menu_icon" />,
    },
    {
      name: "Event",
      url: "/events",
      icon: <Icons.TbTimelineEvent className="menu_icon" />,
    },
    {
      name: "Add Event",
      url: "/add-event",
      icon: <Icons.TbCalendar className="menu_icon" />,
    },
  ],
},

{
  name: "Organizers",
  url: "/organizers/manage",
  icon: <Icons.TbUser className="menu_icon" />,
},
{
  name: "Reviews",
  url: "/reviews",
  icon: <Icons.TbStar className="menu_icon" />,
},
{
  name: "vendor",
  url: "/vendors",
  icon: <Icons.TbUser className="menu_icon" />,
},
{
  name: "Become a Ventor",
  url: "/manage-vendors",
  icon: <Icons.TbUser className="menu_icon" />,
},
// {
//   name: "Venue",
//   url: "/venue",
//   subMenu: [{
//       name: "Add Venue",
//       url: "/add",
//       icon: <Icons.TbPlus />,
//     },
//     {
//       name: "Manage Venue",
//       url: "/manage",
//       icon: <Icons.TbList />,
//     },
//   ],
//   icon: <Icons.TbCurrentLocation className="menu_icon" />,
// },
{
  name: "Booking",
  url: "/booking",
  icon: <Icons.TbPlug className="menu_icon" />,
},

{
  name: "Budget",
  url: "/payment",
  icon: <Icons.TbCreditCard className="menu_icon" />,
  subMenu: [{
      name: "Add Budget Tracker",
      url: "/budget",
      icon: <Icons.TbCurrencyDollar className="menu_icon" />,
    },{
      name: "Booking",
      url: "/booking",
      icon: <Icons.TbPlug className="menu_icon" />,
    },
    {
      name: "My Booking",
      url: "/allbooking",
      icon: <Icons.TbDeviceMobileDollar className="menu_icon" />,
    },
  ],
}
/* {
  name: "Setting",
  url: "/setting",
  icon: <Icons.TbSettings className="menu_icon" />,
  subMenu: [{
      name: "General",
      url: "/general",
      icon: <Icons.TbSettings className="menu_icon" />,
    },
    {
      name: "Email",
      url: "/email",
      icon: <Icons.TbMail className="menu_icon" />,
    },
    {
      name: "Languages",
      url: "/languages",
      icon: <Icons.TbLanguage className="menu_icon" />,
    },
    {
      name: "Permalink",
      url: "/permalink",
      icon: <Icons.TbLink className="menu_icon" />,
    },
    {
      name: "Social Login",
      url: "/social-login",
      icon: <Icons.TbLogin className="menu_icon" />,
    },
    {
      name: "Cronjob",
      url: "/cronjob",
      icon: <Icons.TbClock className="menu_icon" />,
    },
    {
      name: "API Settings",
      url: "/api",
      icon: <Icons.TbSettings className="menu_icon" />,
    },
  ],
},
{
  name: "Media",
  url: "/media",
  icon: <Icons.TbPhoto className="menu_icon" />,
}, */
,{
  name: "Platform Administration",
  url: "/admin",
  icon: <Icons.TbShieldLock className="menu_icon" />,
  subMenu: [{
      name: "Roles and Permissions",
      url: "/admin/roles",
      icon: <Icons.TbUserShield className="menu_icon" />,
    },
    {
      name: "Users",
      url: "/admin/users",
      icon: <Icons.TbUsers className="menu_icon" />,
    },
  ],
},
];
