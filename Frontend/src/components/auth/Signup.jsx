import { useState } from "react";
import Navbar from "../Shared/Navbar.jsx";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group.jsx";
import { Button } from "../ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setLoading } from "@/redux/authSlice.js";
import store from "@/redux/store.js";
import { Loader, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  /*
    The changeEventHandler function updates the state dynamically when an input field's value changes:

    Trigger: Called when a user types into an input.

    Access: Retrieves the input's name (field identifier) and value (current input value).

    Update: Uses setInput to update the state, preserving existing data and adding/updating the specific input's value.

    Re-render: React re-renders the component with the updated state.
    
  */
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handles updates when a file is selected using an <input type="file">.
  const changeFileHandeler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    // Prevents the browser's default action for the form submission (e.g., reloading the page).
    e.preventDefault();

    const formData = new FormData();
    // FormData is used to bundle key-value pairs, including files, to send them as part of the HTTP request.

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    // formData.append adds each form field (like fullname, email, etc.) from the input object to the FormData.

    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      // Sends the FormData to the server's /register endpoint.
      if (res.data.success) {
        // res.data contains the response body from the server
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      // In React, you can use the finally block with try-catch to run code after a task finishes, no matter if it succeeded or failed. It’s useful for cleanup or stopping a loading spinner.
      dispatch(setLoading(false));
    }
  };
  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Signup </h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter Full Name"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter Email"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              placeholder="Enter Valid Number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between ">
            <RadioGroup
              className="flex items-center gap-3 my-5"
              defaultValue="option-one"
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role == "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role == "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile Picture</Label>
              {/* accept="image/*": Ensures that only image files can be selected. */}
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                onChange={changeFileHandeler}
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-2 ">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing up
            </Button>
          ) : (
            <Button type="submit" className="w-full my-2 ">
              Signup
            </Button>
          )}
          <span className="text-sm">
            Already have an account ?
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
