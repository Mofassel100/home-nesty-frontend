const prefix = "/admin";

export const adminRoutes = [
  {
    title: "Management",
    items: [
      {
        title: "Home Tope",
        url: `${prefix}/homeTope`,
      },
      {
        title: "Home Tope Details",
        url: `${prefix}/homeTopeDetails`,
      },
    ],
  },
  {
    title: "App Settings",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
      },
    ],
  },
];