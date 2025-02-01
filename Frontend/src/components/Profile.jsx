import React, { useState } from "react";
import Navbar from "./Shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAppliedJobs from "./hooks/useGetAppliedJobs";

// const skills = ["HTML", "CSS", "React", "Javascript", "NodeJs"];

function Profile() {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const isResume = true;
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl shadow-sm mx-auto bg-white border border-gray-200  rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl text-purple-950">
                {user.fullname}
              </h1>
              <p>{user?.profile.bio}</p>
            </div>
          </div>

          <Button
            onClick={() => {
              setOpen(true);
            }}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="text-purple-950 font-semibold">Skills</h1>
          <div className=" mt-2 flex items-center gap-3">
            {user?.profile.skills.length != 0 ? (
              user?.profile.skills.map((item, index) => {
                return <Badge variant="outline">{item}</Badge>;
              })
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md forn-bold text-purple-950 ">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user.profile.resume}
              className="text-blue-600 w-full hover:underline cursor-pointer text-sm"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl  mx-auto bg-white rounded-xl">
        <h1 className="font-semibold text-purple-950 text-lg">Applied Jobs</h1>
        {/* Application Table */}

        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
