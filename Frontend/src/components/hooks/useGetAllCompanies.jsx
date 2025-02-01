import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { setCompanies } from "@/redux/companySlice";

function useGetAllCompanies() {
  const dispatch = useDispatch(); // Move this outside useEffect

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
          //   Here use companies instead of company due to Backend purpose
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCompanies(); // Call the function
  }, []); // Empty array ensures it runs only once
}

// Call it in the Home Components Because we need to show the Jobs there as well

export default useGetAllCompanies;
