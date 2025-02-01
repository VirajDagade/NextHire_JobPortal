import React from "react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import store from "@/redux/store";

function Job({ job }) {
  const { allJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();
  // const jobId = "VFBFNHNG";

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiffrenece = currentTime - createdAt;
    return Math.floor(timeDiffrenece / (24 * 60 * 60 * 1000));
  };

  return (
    <div className="p-5 shadow-lg rounded-md bg-white border border-gray-100 hover:scale-105 transition-all hover:shadow-md ">
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-xs">
          {daysAgoFunction(job?.createdAt) == 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} Days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6 rounded-md" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className=" text-lg font-medium">
            {" "}
            {job?.company?.name || "Google Company"}
          </h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2 text-purple-950">{job?.title}</h1>
        <p className="text-gray-600 text-sm ">{job?.description}</p>
      </div>
      <div className=" flex items-center gap-2 mt-4">
        <Badge variant="ghost">{job?.position} Positions</Badge>
        <Badge variant="ghost">{job?.jobType}</Badge>
        <Badge variant="ghost">{job?.salary}LPA</Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button>Save for Later</Button>
      </div>
    </div>
  );
}

export default Job;
