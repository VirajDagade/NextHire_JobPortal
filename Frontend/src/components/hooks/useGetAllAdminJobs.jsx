import { setAllAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { JOB_API_END_POINT } from "@/utils/constant";

function useGetAllAdminJobs() {
  const dispatch = useDispatch(); // Move this outside useEffect

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllAdminJobs(); // Call the function
  }, []); // Empty array ensures it runs only once
}

// Call it in the Home Components Because we need to show the Jobs there as well

export default useGetAllAdminJobs;
