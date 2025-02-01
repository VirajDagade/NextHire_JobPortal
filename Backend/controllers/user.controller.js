import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, password, email, phoneNumber, role } = req.body;

    if (!fullname || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({
        message: "Something is Missing",
        success: false,
      });
    }

    const file = req.file;
    const fileUri = getDataUri(file);

    // Retry logic for Cloudinary upload
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

    // findOne method is used with MongoDB to fetch a single document from a collection that matches a given query.

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this mail",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      password: hashedPassword,
      email,
      phoneNumber,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "Account created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something Went Wrong!",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }

    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesn't exists with current role ",
        success: false,
      });
    }
    // Token Data Creation
    const tokenData = {
      userId: user._id,
    };

    // JWT (JSON Web Token) is a compact, secure way to represent user data as a JSON object. It is widely used for authentication and securely exchanging information between a client and a server.

    //  The jwt.sign() method creates a JWT.
    //  It returns a token string that can later be verified to authenticate the user.

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Constructs a new user object with only selected user details for the response, excluding sensitive information like passwords.

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome Back ${user.fullname}`,
        user,
        success: true,
      });
    //  Cookie: Stores the JWT in a secure cookie named token.
    //  maxAge: Cookie is valid for 1 day (in milliseconds).
    //  httpsOnly: Ensures the cookie is only sent over HTTPS connections.
    //  sameSite: 'strict': Prevents the cookie from being sent with cross-site requests to mitigate CSRF attacks.
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, skills, email, phoneNumber, bio } = req.body;

    // Cloudinary Resume File will come here
    // Cloudinary Resume File will come here
    const file = req.file;
    const fileUri = getDataUri(file);

    // Retry logic for Cloudinary upload
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

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; //Middleware Authentication

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
        success: false,
      });
    }
    // Update Profile Data

    if (fullname) {
      user.fullname = fullname;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (bio) {
      user.profile.bio = bio;
    }
    if (skills) {
      user.profile.skills = skillsArray;
    }

    // Resume link later
    if (cloudResponse) {
      // Save the Cloudinary URL
      user.profile.resume = cloudResponse.secure_url;
      // Save the original file name
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();
    // .save(): A method provided by libraries like Mongoose to save the instance to the database.

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile Update Successfully ",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
