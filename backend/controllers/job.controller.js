import mongoose from "mongoose";
import jobModel from "../models/job.model.js";

// add job
export const addJobController = async (req, res) => {
    try {
        const { title, description, salary, companyName, location, jobType, qualification } = req.body;

        const newJob = new jobModel({
            title,
            description,
            salary,
            companyName,
            location,
            jobType,
            qualification
        });

        const savedData = await newJob.save();

        return res
            .status(201)
            .json({
                success: true,
                message: "Job Created Successfully",
                data: savedData
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

// get all the job
export const getJobDataController = async (req, res) => {
    try {

        const { title } = req.query;

        const filterData = {};

        if (title) {
            filterData.title = { $regex: title, $options: "i" }
        };

        const allData = await jobModel.find(filterData);

        if (!allData || allData.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No Job Data Available"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Job Data fetch Successfully",
                data: allData
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

// get job by id
export const getJobByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id format"
                });
        };

        const jobExist = await jobModel.findById(id);

        if (!jobExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Job not Exist in Db"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Job Data found Successfully",
                data: jobExist
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

// delete the job data
export const deleteJobcontroller = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id format"
                });
        };

        const jobExist = await jobModel.findById(id);

        if (!jobExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Job not Exist in Db"
                });
        };

        const deleteJobData = await jobModel.findByIdAndDelete(jobExist._id);

        if (!deleteJobData) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured While Deleting the Job Data"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Job Data Delete Successfully"
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};