import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.jsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.jsx";
import { Button } from "../ui/button";
import { LogIn, LogInIcon, LogOut, User, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

// const user = false;

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white shadow-sm ">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Next<span className="text-purple-900">Hire</span>🎓
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5 ">
            {user && user.role == "recruiter" ? (
              <>
                <li className="hover:scale-105 hover:underline transition-all hover:text-purple-950 ">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:scale-105 hover:underline transition-all hover:text-purple-950 ">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:scale-105 hover:underline transition-all hover:text-purple-950 ">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:scale-105 hover:underline transition-all hover:text-purple-950 ">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:scale-105 hover:underline transition-all hover:text-purple-950 ">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {
            // Ternary Operator
            // In React Router, the <Link> component is used to navigate between pages (routes) without reloading the page.

            !user ? (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline">
                    Login
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-black">Signup</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback>VD</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback>VD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4>{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col   text-gray-600">
                    {user && user.role == "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button
                          className="hover:scale-105 transition-all hover:text-purple-950 "
                          variant="link"
                        >
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 pl-2 pt-2 cursor-pointer">
                      <LogOut className="h-5 w-5" />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }
        </div>
      </div>
      <br />
    </div>
  );
}

export default Navbar;
