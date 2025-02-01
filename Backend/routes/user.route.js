import express from "express";

import {
  login,
  updateProfile,
  register,
  logout,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
} from "../controllers/job.controller.js";
import { singleUpload } from "../middlewares/multer.js";

// express.Router() is used to create separate, modular route handlers in Express.js
const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router
  .route("/profile/update")
  .post(isAuthenticated, singleUpload, updateProfile);

export default router;
