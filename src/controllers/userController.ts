import { Request } from "express";
import { TryCatch } from "../middlewares/errorMiddleware.js";
import { NewUserRequestBody } from "../types/type.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/utilityClass.js";

export const newUser = TryCatch(
  async (req: Request<{}, {}, NewUserRequestBody>, res, next) => {
    const { name, email, photo, _id, gender, dob } = req.body;

    let user = await User.findById(_id);

    if (user) {
      return res.status(200).json({
        success: true,
        message: `Welcome to TextNCall ${user.name}`,
      });
    }

    if (!name || !email || !photo || !_id || !gender || !dob) {
      return next(new ErrorHandler("Please fill all the fields", 400));
    }

    user = await User.create({
      name,
      email,
      photo,
      _id,
      gender,
      dob: new Date(dob),
    });

    return res.status(201).json({
      success: true,
      message: `Welcome to TextNCall ${user.name}`,
    });
  }
);

export const getUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid ID", 400));

  return res.status(200).json({
    success: true,
    user,
  });
});

export const deleteUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid ID", 400));

  await user.deleteOne();

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
