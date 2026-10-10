const prefix = "/customer";

export const customerRoutes = [
  {
    title: "Bookings",
    items: [
      {
        title: "Booking Details",
        url: `${prefix}/booking`,
      },
      {
        title: "Payment History",
        url: `${prefix}`,
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
        isActive: true,
      },
    ],
  },
];