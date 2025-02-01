import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-purple-950 font-medium">
          Join Now–Your Dream Job Awaits!
        </span>
        <h1 className="text-5xl font-bold">
          Your Next <span className="text-purple-950">Career Move</span> Starts
          Here
          <br />
          Explore Thousands of Opportunities with Just a Click."
        </h1>
        <p>
          From entry-level to executive roles, find the job that fits you best.
          Your career advancement starts with us.
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto ">
          <input
            type="text"
            placeholder="Find opportunities near you"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
          />
          <Button
            variant="outline"
            className="rounded-r-full border-none"
            onClick={searchJobHandler} // Move onClick to the button
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
