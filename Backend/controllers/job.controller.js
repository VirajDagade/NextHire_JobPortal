import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";

export const postJob = async (req, res) => {
  try {
    // console.log("User ID from Middleware:", req.id);
    // console.log("Request Body:", req.body);

    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !experience ||
      !companyId
    ) {
      return res.status(401).json({
        message: "Something is Missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Job Posted Successsfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    // Filter the Jobs by Keywords
    const keyword = req.query.keyword || "";
    // Retrieves the keyword parameter from the request query (req.query.keyword).

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        /*
                Creates a query object to search the Job collection in MongoDB.

                $or allows the query to match any of the conditions in the array.

                Matches documents where the title field contains the keyword using a regular expression.

                $regex: Performs a pattern match for the keyword in the title field.
                
                $options: "i": Makes the search case-insensitive.
                */
      ],
    };

    // In Mongoose, populate() is used to replace a referenced field in a document (like an ID) with the actual data from the related collection.

    // Sorts the query results in descending order of the createdAt field.
    // Documents with the latest (most recent) createdAt timestamp will appear first.

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    // Use populate() when you need related data (e.g., references) to be included in the query result, saving you the trouble of performing additional database lookups manually.
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found",
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

export const getAdminJobs = async (req, res) => {
  // It will return all the jobs posted by current logged in  User
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    //  For example, { created_by: adminId } would retrieve all jobs where the created_by field matches adminId.
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs Not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
