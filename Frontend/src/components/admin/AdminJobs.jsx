import React, { useEffect, useState } from "react";
import Navbar from "../Shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "@/redux/jobSlice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../hooks/useGetAllAdminJobs";

function AdminJobs() {
  useGetAllAdminJobs();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatches an action (setSearchCompanyByText): It sends the current input value to Redux, updating the state with the search text.
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-10">
          <Input
            className="w-fit"
            placeholder="Filter by Name or Roles"
            onChange={(e) => setInput(e.target.value)}
          />
          {/* 
          User types in the input field → onChange event fires.
          Updates the input state → setInput(e.target.value) stores the entered text in the input state.
          Triggers useEffect (because input is in its dependency array).
          Dispatches setSearchCompanyByText(input) → Updates Redux with the search text.
          Filters/searches companies in real-time based on user input. */}
          <Button onClick={() => navigate("/admin/jobs/create")}>
            New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
}

export default AdminJobs;
