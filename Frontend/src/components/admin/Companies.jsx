import React, { useEffect, useState } from "react";
import Navbar from "../Shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

function Companies() {
  useGetAllCompanies();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatches an action (setSearchCompanyByText): It sends the current input value to Redux, updating the state with the search text.
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-10">
          <Input
            className="w-fit"
            placeholder="Filter by Name"
            onChange={(e) => setInput(e.target.value)}
          />
          {/* 
          User types in the input field → onChange event fires.
          Updates the input state → setInput(e.target.value) stores the entered text in the input state.
          Triggers useEffect (because input is in its dependency array).
          Dispatches setSearchCompanyByText(input) → Updates Redux with the search text.
          Filters/searches companies in real-time based on user input. */}
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
}

export default Companies;
