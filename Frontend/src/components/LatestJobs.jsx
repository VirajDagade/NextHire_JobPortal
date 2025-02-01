import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import store from "@/redux/store";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-3xl font-bold">
        Latest and Top <span className="text-purple-950">Job</span> Openings 📊
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length > 0 ? (
          allJobs.slice(0, 6).map((job) => (
            // Passes the job object as a prop to the LatestJobCards component.
            <LatestJobCards key={job._id} job={job} />
          ))
        ) : (
          <span>No Jobs Found</span>
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
