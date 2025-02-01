import React, { useState } from "react";
import { Badge } from "./ui/badge.jsx";
import { Button } from "./ui/button.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from "@/utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store.js";
import { toast } from "sonner";

function JobDescription() {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  // The useSelector hook allows you to read data from the Redux store in a React functional component.
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);

  // The some method iterates over the applications array and checks if any application's applicant matches the logged-in user's ID (user?._id).
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant == user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      console.log(res.data);

      if (res.data.success) {
        setIsApplied(true); //Update The Local State
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
        /*
        Copy the current job data (singleJob).
        Add the current user (user?._id) to the application list for that job.
        Update the Redux store with this new job data using dispatch.
        Show a success message using toast.
        */
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some(
              (application) => application.applicant == user?._id
            ) || false
          );
          /*
          Update Redux Store: The job data (res.data.job) is dispatched to the global state using dispatch(setSingleJob(res.data.job)).
          Check Application Status:
          It checks if the current user (user?._id) is in the list of applicants for the job (res.data.job.application).
          If the user has applied, it updates the local state setIsApplied(true) to reflect this.
          This determines if the user has already applied for the job and ensures the UI reflects this (e.g., disabling the "Apply" button or showing a message).
          */
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob(); // Call the function
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 shadow-sm border border-gray-100 ">
      <div className="flex items-center justify-between px-5">
        <div>
          <h1 className="text-purple-950 text-2xl font-semibold pt-8">
            {singleJob?.title}
          </h1>
          <div className=" flex items-center gap-2 mt-4 pb-8">
            <Badge variant="ghost"> {singleJob?.position} Positions</Badge>
            <Badge variant="ghost">{singleJob?.jobType}</Badge>
            <Badge variant="ghost">{singleJob?.salary}LPA</Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${isApplied ? "cursor-not-allowed" : ""}`}
        >
          {isApplied ? "Applied" : "Apply"}
        </Button>
      </div>
      <hr />
      <h1 className="pt-4 pl-4 font-bold text-purple-950">Job Description</h1>
      <div className="mt-2 pt-2 pb-8 mb-2">
        <h3 className="font-semibold pt-1 pl-4 my-1 ">
          Role:
          <span className="pl-4 text-gray-500  font-normal">
            {singleJob?.title}
          </span>
        </h3>
        <h3 className="font-semibold pt-1 pl-4 my-1  ">
          Location:
          <span className="pl-4 font-normal  text-gray-500  ">
            {singleJob?.location}
          </span>
        </h3>
        <h3 className="font-semibold pt-1 pl-4 my-1  ">
          Description:
          <span className="pl-4 font-normal  text-gray-500  ">
            {singleJob?.description}
          </span>
        </h3>
        <h3 className="font-semibold pt-1 pl-4 my-1  ">
          Experience:
          <span className="pl-4  text-gray-500 font-normal">
            {singleJob?.experienceLevel}
          </span>
        </h3>
        <h3 className="font-semibold pt-1 pl-4 my-1  ">
          Salary:
          <span className="pl-4 font-normal  text-gray-500  ">
            {singleJob?.salary}LPA
          </span>
        </h3>
        <h3 className="font-semibold pt-1 pl-4 my-1 ">
          Total Applicants:
          <span className="pl-4  text-gray-500  font-normal">
            {singleJob?.applications?.length}
          </span>
        </h3>
        <h3 className="font-semibold pt-1 pl-4 my-1   ">
          Posted Date:
          <span className="pl-4  text-gray-500  font-normal">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h3>
      </div>
    </div>
  );
}

export default JobDescription;
