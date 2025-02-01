import React, { useEffect, useState } from "react";
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
import { Eye, MoreHorizontal } from "lucide-react";
import { Edit2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminJobsTable() {
  const navigate = useNavigate();
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  //   const { companies, searchCompanyByText } = useSelector(
  //     (store) => store.company
  //   );

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  // filterCompany is initialized with companies (so the full list is shown by default).

  useEffect(() => {
    // .filter() is an array method in JavaScript that creates a new array containing only the elements that pass a test (i.e., return true).
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          // If searchCompanyByText is empty, it returns all companies.
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
        // The filtered list is stored in filterCompany, updating the displayed companies dynamically.
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);
  // This ensures the company list updates when new data arrives or when the user types something.

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <tr>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => {
                        navigate(`/admin/companies/${job._id}`);
                      }}
                      className="flex items-center gap-5 cursor-pointer"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="text-sm">Edit</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center w-fit gap-3 cursor-pointer mt-3"
                    >
                      <Eye className="w-4 " />
                      <span className="text-sm">Applicants</span>
                    </div>
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

export default AdminJobsTable;
