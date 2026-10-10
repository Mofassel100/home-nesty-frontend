const prefix = "/provider";

export const providerRoutes = [
  {
    title: "Provider Management",
    items: [
      {
        title: "Property Create",
        url: `${prefix}/property`,
      },
      {
        title: "Property Details",
        url: `${prefix}/property/property-details`,
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