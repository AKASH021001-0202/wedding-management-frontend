import React from "react";
import * as Icons from "react-icons/tb";

export const menu = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: <Icons.TbHome className="menu_icon" />, // Changed icon
  },
  {
    name: "My Events",
    icon: <Icons.TbCalendarEvent className="menu_icon" />, // Changed icon
    url: "/myevents",
  },
  {
    name: "Add Event",
    url: "/add-event",
    icon: <Icons.TbPlus className="menu_icon" />, // Changed icon
  },
  {
    name: "All Event",
    url: "/all-events",
    icon: <Icons.TbList className="menu_icon" />, // Changed icon
  },

  {
    name: "Reviews",
    url: "/reviews",
    icon: <Icons.TbStar className="menu_icon" />,
    isAdmin: true,
  },
  {
    name: "Vendor",
    url: "/vendors",
    icon: <Icons.TbBuildingStore className="menu_icon" />, // Changed icon
    isAdmin: false,
  },
  {
    name: "All Vendors",
    url: "/allvendors",
    icon: <Icons.TbBuildingStore className="menu_icon" />, // Changed icon
  },
  {
    name: "Become a Vendor",
    url: "/manage-vendors",
    icon: <Icons.TbUserPlus className="menu_icon" />, // Changed icon
    isAdmin: false,
  },
  {
    name: "My Booking",
    url: "/mybookingevents",
    icon: <Icons.TbBook className="menu_icon" />, // Changed icon
    isAdmin: true,
  },
  {
    name: "Add Budget Tracker",
    url: "/weddingbudget",
    icon: <Icons.TbCoin className="menu_icon" />, // Changed icon
    isAdmin: true,
  },
 /*  {
    name: "My Booking",
    url: "/allbooking",
    icon: <Icons.TbCalendarCheck className="menu_icon" />, // Changed icon
    isAdmin: true,
  }, */
  {
    name: "Platform Administration",
    url: "/admin",
    icon: <Icons.TbShield className="menu_icon" />, // Changed icon
    isAdmin: false,
    subMenu: [
      {
        name: "Roles and Permissions",
        url: "/admin/roles",
        icon: <Icons.TbUserCheck className="menu_icon" />, // Changed icon
      },
      {
        name: "Users",
        url: "/admin/users",
        icon: <Icons.TbUser className="menu_icon" />, // Changed icon
      },
    ],
  },
];
