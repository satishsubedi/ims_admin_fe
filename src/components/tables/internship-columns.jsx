import { Link } from "react-router-dom";
export const internshipBaseColumns = [
  {
    accessorKey: "_id",
    header: "Internship ID",
  },
  // {
  //   header: "Posted By",
  //   accessorFn: (row) => `${row.profileId.fName} ${row.profileId.lName}`,
  // },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const isActive = status === "active";
      return (
        <div
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 border ${
            isActive
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : "bg-rose-50 text-rose-700 border-rose-100"
          }`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              isActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
            }`}
          />
          {status}
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.createdAt?.slice(0, 10),
    header: "Internship Date",
  },
];
