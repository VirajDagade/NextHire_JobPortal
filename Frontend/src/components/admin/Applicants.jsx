import React, { useEffect } from "react";
import Navbar from "../Shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );
        // console.log("API Response:", res.data);
        // console.log(
        //   "Extracted Applicants:",
        //   res.data.job?.applications || res.data.job?.applicants
        // );

        // dispatch(setAllApplicants(res.data.job?.applications || []));
        dispatch(setAllApplicants(res.data.job));
        // If the response is successful (res.data.success is true), it dispatches setAllApplicants(res.data.job), which likely updates the Redux store with the fetched applicants.
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-purple-950 text-xl font-bold my-5">
          Applicants : {applicants?.applications?.length}
        </h1>

        <ApplicantsTable />
      </div>
    </div>
  );
}

export default Applicants;
