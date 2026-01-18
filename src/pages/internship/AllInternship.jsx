import React, { useEffect, useState } from "react";

import FilterOptions from "../../components/CustomComponents/FilterOptions";

import CustomTable from "../../components/CustomComponents/CustomTable";
// import { DataTable } from "@/components/ui/data-table";
import { createColumns } from "@/components/tables/create-columns";
import { applicationBaseColumns } from "@/components/tables/application-columns.js";
import CustomDataTable from "../../components/CustomComponents/CustomDataTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteInternshipByIdActions,
  fetchInternshipActions,
} from "../../features/internship/internshipaction";
import { internshipBaseColumns } from "../../components/tables/internship-columns";

const AllInternship = () => {
  const [filters, setFilters] = useState({
    search: "",
    // status: "all",
    fromDate: "",
    toDate: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { internships } = useSelector((state) => state.internshipInfo);
  useEffect(() => {
    dispatch(fetchInternshipActions());
  }, [dispatch]);

  const handleOnDelete = async (id) => {
    dispatch(deleteInternshipByIdActions(id));
  };

  const handleOnEdit = (slug) => {
    //navigate to edit page
    navigate(`/update_internship/${slug}`);
  };

  const handleOnView = (slug) => {
    //navigate to view page
    navigate(`/internship/${slug}`);
  };

  const columns = createColumns({
    columns: internshipBaseColumns,
    onEdit: (row) => handleOnEdit(row.slug),
    onDelete: (row) => handleOnDelete(row._id),
    onView: (row) => handleOnView(row.slug),
  });

  const handleOnFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const filteredInternships = internships.filter((item) => {
    const matchesSearch = filters.search
      ? item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.company.toLowerCase().includes(filters.search.toLowerCase())
      : true;

    const matchFromDate = filters.fromDate
      ? new Date(item.applicationDeadline) >= new Date(filters.fromDate)
      : true;
    const matchToDate = filters.toDate
      ? new Date(item.applicationDeadline) <= new Date(filters.toDate)
      : true;

    return matchesSearch && matchFromDate && matchToDate;
  });

  return (
    <div className="space-y-4 p-4">
      <FilterOptions
        filters={filters}
        handleOnFilterChange={handleOnFilterChange}
        showStatus={false}
      />
      <CustomDataTable columns={columns} data={filteredInternships || []} />
    </div>
  );
};

export default AllInternship;
