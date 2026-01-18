import React from "react";

const FilterOptions = ({
  filters,
  handleOnFilterChange,
  showSearch = true,
  showDate = true,
  showStatus = true,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {showSearch && (
        <input
          type="text"
          className="border px-3 py-2 rounded"
          placeholder="Search by ID or Name"
          value={filters.search}
          onChange={(e) => handleOnFilterChange("search", e.target.value)}
        />
      )}
      {showDate && (
        <>
          <input
            type="date"
            className="border px-3 py-2 rounded"
            value={filters.fromDate}
            onChange={(e) => handleOnFilterChange("fromDate", e.target.value)}
          />
          <input
            type="date"
            className="border px-3 py-2 rounded"
            value={filters.toDate}
            onChange={(e) => handleOnFilterChange("toDate", e.target.value)}
          />
        </>
      )}
      {showStatus && (
        <select
          className="border px-3 py-2 rounded"
          value={filters.status}
          onChange={(e) =>
            handleOnFilterChange("status", e.target.value.toLowerCase())
          }
        >
          <option value="">All Status</option>
          <option value="accepted">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      )}
    </div>
  );
};

export default FilterOptions;
