import { populate } from "dotenv";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(401).json({
        message: "Job id is required",
        success: false,
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(401).json({
        message: "You Have already applied for this Job",
        success: false,
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(401).json({
        message: "Job Doesn't Exists",
        success: false,
      });
    }

    const newApplication = Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push((await newApplication)._id);

    await job.save();
    // Saves a new document or updates an existing one in the database.

    return res.status(201).json({
      message: "Job Applied Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get All the Jobs applied by the logged in user Eg. for Student

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        // It will return entire Job Model but inside it there is a field company which refer to Company model so we have apply Populate again for the company model too
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res.status(401).json({
        message: "Application not Found",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// How Many applicants have applied for Job Eg, For Admin/Recruiter

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(401).json({
        message: "Job Doesn't Exists",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const appliactionId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(401).json({
        message: "Status is Required",
        success: false,
      });
    }

    const application = await Application.findOne({ _id: appliactionId });

    if (!application) {
      return res.status(401).json({
        message: "Application not found",
        success: false,
      });
    }
    // Do Chatgpt for neat explanation
    application.status = status.toLowerCase();
    // This line assigns the status value (from the request body) to the status field of the application document. The status.toLowerCase() ensures that the status is stored in lowercase.

    await application.save();

    return res.status(200).json({
      message: "Status Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
