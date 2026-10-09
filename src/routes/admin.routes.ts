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
      {
        title: "User Details",
        url: `${prefix}/user`,
      },
      {
        title: "Payment Details",
        url: `${prefix}/payment`,
      },
      {
        title: "Property Details",
        url: `${prefix}/property`,
      },
      {
        title: "Booking Details",
        url: `${prefix}/booking`,
      },
      {
        title: "Home Questions Details",
        url: `${prefix}/question`,
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