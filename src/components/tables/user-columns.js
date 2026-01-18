export const userBaseColumns = [
    {
      accessorKey: "fName",
      header: "First Name",
    },
    {
      accessorKey: "lName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "verified",
      header: "Verified",
      cell: ({ row }) => (row.original.verified ? "Yes" : "No"),
    },
  ];
