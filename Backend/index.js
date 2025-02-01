import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
/*
Default exports are not tied to the name of the variable during import.
You can choose any name that suits your context.
*/
import companyRoute from "./routes/company.route.js";
import userRoute from "./routes/user.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import connectDB from "./utils/db.js";
import path from "path";
dotenv.config({});

const app = express();

const _dirname = path.resolve();

// Middleware
app.use(express.json());
// app.use(express.json()) is used in Express to parse incoming JSON data in request bodies, making it accessible via req.body.

app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true })) is used in Express to parse URL-encoded data from forms, making it accessible via req.body. The extended: true option allows parsing nested objects.

app.use(cookieParser());
// cookie-parser is used in Express to parse cookies sent by the client in HTTP requests. It makes cookie data easily accessible via req.cookies.

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  /* credentials: true
       Enables the server to accept and send cookies or authentication headers in cross-origin requests.
    */
};
app.use(cors(corsOptions));

// API'S : An API (Application Programming Interface) is a set of rules that allows different software applications to communicate and share data with each other. It acts as a bridge between systems.

app.use("/api/v1/user", userRoute);
/* 
  /api/v1/user is the base URL for all user-related routes.
  userRoute contains the specific routes for user actions (like login, register).
  So, any request to /api/v1/user will be handled by the routes inside userRoute. It's like grouping all user-related actions under one URL path.
  
  Eg of API's will get created
  http://localhost:8000/api/v1/user/register
  http://localhost:8000/api/v1/user/login
  http://localhost:8000/api/v1/user/profile/update
*/
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Deployment Part
app.use(express.static(path.join(_dirname, "Frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at ${PORT}`);
});
