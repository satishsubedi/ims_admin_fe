import { Link } from "react-router-dom";
export const applicationBaseColumns = [
  {
    accessorKey: "_id",
    header: "Application ID",
    // cell: ({ row }) => (
    //   <Link
    //     to={`/applications/${row.original._id}`}
    //     className="text-primary hover:underline font-medium"
    //   >
    //     {row.getValue("_id")}
    //   </Link>
    // ),
  },
  {
    header: "Applicant Name",
    accessorFn: (row) => `${row.profileId?.fName} ${row.profileId?.lName}`,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    header: "Internship For",
    accessorFn: (row) => row.internshipId?.title || "N/A",
  },
  {
    header: "Application Date",
    accessorFn: (row) => (row.submittedAt || row.createdAt)?.slice(0, 10) || "N/A",
  },
];
