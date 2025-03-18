import CourseModel from "../models/course.model";
import { Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";

export const createCourse = CatchAsyncError(
  async (data: any, res: Response) => {
    const course = await CourseModel.create(data);
    res.status(201).json({
      success: true,
      course,
    });
    await course?.save();
  }
);

export const getAllCourseService = async (res: Response) => {
  const courses = await CourseModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    courses,
  });
};
