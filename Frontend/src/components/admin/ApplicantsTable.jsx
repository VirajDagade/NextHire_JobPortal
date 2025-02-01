import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const shortlistingStatus = ["Accepted", "Rejected"];

function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      // axios.defaults.withCredentials = true; is used to set the default behavior for all Axios requests regarding the handling of cookies.
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          withCredentials: true,
        }
      );
      // The request body contains { status } (the new status to update).
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>List of recently applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item.applicant?.fullname}</TableCell>
                <TableCell>{item.applicant?.email}</TableCell>
                <TableCell>{item.applicant?.phoneNumber}</TableCell>
                <TableCell className="text-blue-600 cursor-pointer">
                  {(
                    <a href={item.applicant?.profile?.resume} target="_blank">
                      {item.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) || NA}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-30">
                      {shortlistingStatus?.map((status, index) => (
                        <div
                          className="text-sm flex w-fit items-center my-2 cursor-pointer text-purple-950 hover:font-semibold "
                          onClick={() => statusHandler(status, item?._id)}
                          key={index}
                        >
                          {/* The item object contains details of an applicant's application.
                          _id is likely the unique identifier (MongoDB ObjectId) assigned to each application. */}
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
