import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleCompany } from "@/redux/companySlice";

function useGetCompanyById(companyId) {
  const dispatch = useDispatch(); // Move this outside useEffect

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleCompany(); // Call the function
  }, [companyId, dispatch]); // Empty array ensures it runs only once
}

// Call it in the Home Components Because we need to show the Jobs there as well

export default useGetCompanyById;
