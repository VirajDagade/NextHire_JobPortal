import React from "react";
import { Badge } from "./ui/badge.jsx";
import { Ghost } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LatestJobCards({ job }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className=" hover:scale-105 transition-all hover:shadow-md p-5 rounded-sm bg-white border border-gray-100 cursor-pointer shadow-md"
    >
      <div>
        <h1 className="font-medium text-lg">
          {job?.company?.name || "Google Company"}
        </h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className=" text-purple-950 font-bold text-lg my-2">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 ">{job?.description}</p>
      </div>
      <div className=" flex items-center gap-2 mt-4">
        <Badge variant="ghost">{job?.position} Positions</Badge>
        <Badge variant="ghost">{job?.jobType}</Badge>
        <Badge variant="ghost">{job?.salary}LPA</Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
