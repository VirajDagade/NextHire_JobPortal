import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is Required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    {
      if (company) {
        return res.status(400).json({
          message: "You can't register with same company name",
          success: false,
        });
      }
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company Registered Successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    // We will find only those company which  have been registered by current logged in User
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    // It is used to extract the id from the URL for identifying a specific company, likely to fetch, update, or delete its details in the application logic.

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    // console.log(name, description, website, location);

    // Cloudinary Files will come here
    const file = req.file;
    const fileUri = getDataUri(file);

    const uploadToCloudinary = async (fileUri) => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      let attempts = 3;

      while (attempts > 0) {
        try {
          const response = await cloudinary.uploader.upload(fileUri.content);
          return response;
        } catch (error) {
          console.log(
            `Upload failed. Retrying... Attempts left: ${attempts - 1}`
          );
          attempts -= 1;
          await delay(2000); // Wait 2 seconds before retrying
          if (attempts === 0) throw error;
        }
      }
    };

    const cloudResponse = await uploadToCloudinary(fileUri);

    const logo = cloudResponse.secure_url;

    const updateData = { name, description, location, website, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    /*
    The Company.findByIdAndUpdate function:

    Searches the database for the company with the matching id.
    Updates it with the data from the updateData object.
    The { new: true } option ensures the function returns the updated document instead of the original.

    */

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company Information updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
