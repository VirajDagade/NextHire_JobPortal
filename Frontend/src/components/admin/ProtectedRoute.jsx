// import React from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// function ProtectedRoute({ children }) {
//   const { user } = useSelector((store) => store.auth);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user == null || user != "recruiter") {
//       navigate("/");
//     }
//   }, []);
//   return <>{children}</>;
// }

// export default ProtectedRoute;
